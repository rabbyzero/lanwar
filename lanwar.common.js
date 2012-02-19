var playerlist;
var unitlist;
var magiclist;
var skilllist;
var itemlist;
var liststatus = {player: "empty", unit: "empty", magic: "empty", skill: "empty", item: "empty"};
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
        league_name: "Advanced League"
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
        league_name: "Advanced League"
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

$(document).ready(function(){
    //alert("test");
    $(".menuitem").mouseover(function(){
        $(this).addClass("menuitemon");
    });
    $('.menuitem').mouseout(function(){
        $(this).removeClass("menuitemon");
    });
    $(".menuitem").click(function(){
       var menu = $("#" + this.id +"div");
       var turnoff = false;
       if(menu.hasClass("menudivon")) {
        turnoff = true
       }
       $(".menudiv").removeClass("menudivon");
       $(".menudiv").addClass("menudivoff");
       //alert("#" + this.id +"div");
       if(!turnoff){
        menu.css("left",$(this).position().left);
        menu.css("top",$(this).position().top + $(this).outerHeight(true));
        $("#" + this.id +"div").removeClass("menudivoff");
        $("#" + this.id +"div").addClass("menudivon");
       }
    });
    
    //localtest();
    
    loaddata();
});

function localtest() {
    var tl = new Array(0);
    var newob = new Object;
    for (var i = 0; i < 10; i++) {
        //var newob = new Object;
        //newob = {value: i};
        //newob.value = i;
        //tl.push(newob);
        tl[i] = newob;
    }
    //alert(tl);
}