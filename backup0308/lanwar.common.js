var playerlist = new Array(0);
var unitlist = new Array(0);
var magiclist = new Array(0);
var skilllist = new Array(0);
var itemlist = new Array(0);
var liststatus = {player: "empty", unit: "empty", magic: "empty", skill: "empty", item: "empty"};
var pool = {
    my: {
        unit: {
            status: "waiting refresh",
            list: []
        },
        magic: {
            status: "waiting refresh",
            list: []
        },
        skill: {
            status: "waiting refresh",
            list: []
        },
        item: {
            status: "waiting refresh",
            list: []
        }
    },
    op: {
        unit: {
            status: "waiting refresh",
            list: []
        },
        magic: {
            status: "waiting refresh",
            list: []
        },
        skill: {
            status: "waiting refresh",
            list: []
        },
        item: {
            status: "waiting refresh",
            list: []
        }
    }
};
var settings = {
    my: {
        active: true,
        inactive: false,
        advanced: true,
        beginner: true,
        candidate: false,
        detail: true
    },
    op: {
        active: true,
        inactive: false,
        advanced: true,
        beginner: true,
        candidate: false,
        detail: true
    },
    adv: {
        
    }
};
var customplayer = {
    my: {
        idplayer: -1,
        player_name: "自定义选手",
        level: 4,
        exp: 0,
        maxexp: 80,
        class_id: 10,
        class_name: "术师",
        bell: {shrine: true,empire: true,demon: true,barbarian: true},
        round: 4,
        active: 1,
        league_id: 1,
        league_name: "Advanced League",
        status: "ready"
    },
    op: {
        idplayer: -2,
        player_name: "自定义选手",
        level: 4,
        exp: 0,
        maxexp: 80,
        class_id: 10,
        class_name: "术师",
        bell: {shrine: true,empire: true,demon: true,barbarian: true},
        round: 4,
        active: 1,
        league_id: 1,
        league_name: "Advanced League",
        status: "ready"
    }
};
var formation = {
    my: {
        player: {
            idplayer: 0,
            player_name: "未选定"
        },
        unit: [{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0}],
        magic: [],
        skill: [],
        item: []
    },
    op: {
        player: {
            idplayer: 0,
            player_name: "未选定"
        },
        unit: [{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0},{idarmy: 0}],
        magic: [],
        skill: [],
        item: []
    }
};

var classobj = [
    {id: 1, name: "步兵", symbol: "A", group: 1},
    {id: 2, name: "枪兵", symbol: "B", group: 1},
    {id: 3, name: "骑兵", symbol: "C", group: 1},
    {id: 4, name: "飞兵", symbol: "D", group: 1},
    {id: 5, name: "水兵", symbol: "E", group: 1},
    {id: 6, name: "弓兵", symbol: "F", group: 1},
    {id: 7, name: "神圣", symbol: "G", group: 2},
    {id: 8, name: "黑暗", symbol: "H", group: 2},
    {id: 9, name: "巫师", symbol: "I", group: 2},
    {id: 10, name: "术师", symbol: "J", group: 2},
    {id: 11, name: "召唤", symbol: "K", group: 2},
    {id: 12, name: "魔导", symbol: "L", group: 2},
    {id: 101, name: "待转职(原步兵)", symbol: "A", group: 1},
    {id: 102, name: "待转职(原枪兵)", symbol: "B", group: 1},
    {id: 103, name: "待转职(原骑兵)", symbol: "C", group: 1},
    {id: 104, name: "待转职(原飞兵)", symbol: "D", group: 1},
    {id: 105, name: "待转职(原水兵)", symbol: "E", group: 1},
    {id: 106, name: "待转职(原弓兵)", symbol: "F", group: 1},
    {id: 107, name: "待转职(原神圣)", symbol: "G", group: 2},
    {id: 108, name: "待转职(原黑暗)", symbol: "H", group: 2},
    {id: 109, name: "待转职(原巫师)", symbol: "I", group: 2},
    {id: 110, name: "待转职(原术师)", symbol: "J", group: 2},
    {id: 111, name: "待转职(原召唤)", symbol: "K", group: 2},
    {id: 112, name: "待转职(原魔导)", symbol: "L", group: 2},
    {id: 1000, name: "无职业", symbol: "", group: 0}    
];

var categoryobj = [
    {id: 1, cname: "步兵", ename: "infantry", parentcate: 0},
    {id: 2, cname: "枪兵", ename: "spear", parentcate: 0},
    {id: 3, cname: "骑兵", ename: "knight", parentcate: 0},
    {id: 4, cname: "飞兵", ename: "flyer", parentcate: 0},
    {id: 5, cname: "水兵", ename: "sailor", parentcate: 0},
    {id: 6, cname: "弓兵", ename: "archer", parentcate: 0},
    {id: 7, cname: "怪物", ename: "evil", parentcate: 0},
    {id: 8, cname: "对空飞", ename: "antiair", parentcate: 4},
    {id: 9, cname: "水上兵", ename: "seamonster", parentcate: 5},
    {id: 100, cname: "指挥官", ename: "leader", parentcate: 0},
    {id: 101, cname: "步兵指挥官", ename: "infantryleader", parentcate: 100},
    {id: 102, cname: "枪兵指挥官", ename: "spearleader", parentcate: 100},
    {id: 103, cname: "骑兵指挥官", ename: "knightleader", parentcate: 100},
    {id: 104, cname: "飞兵指挥官", ename: "flyerleader", parentcate: 100},
    {id: 105, cname: "水兵指挥官", ename: "sailorleader", parentcate: 100},
    {id: 106, cname: "弓兵指挥官", ename: "archerleader", parentcate: 100},
    {id: 107, cname: "魔导指挥官", ename: "magician", parentcate: 100},
    {id: 108, cname: "召唤指挥官", ename: "summoner", parentcate: 100},
    {id: 109, cname: "神圣指挥官", ename: "holyleader", parentcate: 100},
    {id: 110, cname: "巫师指挥官", ename: "wizard", parentcate: 100},
    {id: 111, cname: "黑暗指挥官", ename: "darkleader", parentcate: 100},
    {id: 112, cname: "术师指挥官", ename: "alchemist", parentcate: 100}
];

var propertyobj = [
    {id: 0, cname: "无副属性", cshort: "", ename: "No properties", eshort: ""},
    {id: 1, cname: "神圣", cshort: "圣", ename: "Holy", eshort: "H"},
    {id: 2, cname: "黑暗", cshort: "暗", ename: "Dark", eshort: "D"},
    {id: 3, cname: "召唤", cshort: "召", ename: "Summon", eshort: "S"},
    {id: 4, cname: "高级召唤", cshort: "高召", ename: "Advanced Summon", eshort: "A"},
    {id: 5, cname: "野伏", cshort: "野", ename: "Hidden", eshort: "Y"}
];

var specialabilityobj = [
    {cname: "魔法免疫", cshort: "免", ename: "Magic resist", eshort: "R"},
    {cname: "舍生", cshort: "舍", ename: "Sacrifice", eshort: "S"},
    {cname: "暗灵", cshort: "灵", ename: "Dark demon", eshort: "D"}
];


var magiccategoryobj = [
    {id: 1, cname: "专用型攻击魔法", cshort: "专攻", ename: "Special attack magic", eshort: "SA", cgroup: "攻击魔法", cgshort: "攻", egroup: "Attack magic", egshort: "A"},
    {id: 2, cname: "泛用型攻击魔法", cshort: "泛攻", ename: "Common attack magic", eshort: "CA", cgroup: "攻击魔法", cgshort: "攻", egroup: "Attack magic", egshort: "A"},
    {id: 3, cname: "封禁型攻击魔法", cshort: "封攻", ename: "Block attack magic", eshort: "BA", cgroup: "攻击魔法", cgshort: "攻", egroup: "Attack magic", egshort: "A"},
    {id: 11, cname: "增强型辅助魔法", cshort: "增强", ename: "Enhancement magic", eshort: "EM", cgroup: "辅助魔法", cgshort: "辅", egroup: "Support magic", egshort: "S"},
    {id: 12, cname: "防御型辅助魔法", cshort: "防御", ename: "Defense magic", eshort: "DM", cgroup: "辅助魔法", cgshort: "辅", egroup: "Support magic", egshort: "S"},
    {id: 13, cname: "保障型辅助魔法", cshort: "保障", ename: "Rule magic", eshort: "RM", cgroup: "辅助魔法", cgshort: "辅", egroup: "Support magic", egshort: "S"}
];

var skillcategoryobj = [
    {id: 1, cname: "I", cshort: "I", ename: "I", eshort: "I"},
    {id: 2, cname: "II", cshort: "II", ename: "II", eshort: "II"},
    {id: 3, cname: "I&II", cshort: "I&II", ename: "I&II", eshort: "I&II"},
    {id: 4, cname: "特殊技", cshort: "特", ename: "Special", eshort: "Sp"}
];

function notice (noticemessage,noticetype) {
    //
}

$(document).ready(pageinit);

function pageinit () {
    //alert("ok");
    datainit();
    menuinit();
    maindivinit();
    //localtest();
    loaddata();
    
}


function datainit() {}

function getcommonobj (commonobj,key,val) {
    for (var i in commonobj) {
        if (commonobj[i][key] == val) {
            return commonobj[i];
        }
    }
    return false;
}

function adjustimgposition () {
    $(this).parent().css("left",(45-$(this).outerWidth(true))/2);
    $(this).parent().css("top",(40-$(this).outerHeight(true))/2);
}

function adjustnow() {
    $(".armyimg",".contentitem").trigger("adjust");
    //$(".armyimg",".contentitem").each($(this).parent().css("left",(45-$(this).outerWidth(true))/2));
    //$(".armyimg",".contentitem").each($(this).parent().css("top",(40-$(this).outerHeight(true))/2));
}