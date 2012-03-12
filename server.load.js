var dbconfig = require('config').dbconfig;
var mysql = require('mysql');
//var resultjson = new Object;
var playerlist = new Array(0);
var unitlist = new Array(0);
var magiclist = new Array(0);
var skilllist = new Array(0);
var itemlist = new Array(0);

var connoption = {
    host: dbconfig.host,
    port: dbconfig.port,
    user: dbconfig.dbuser,
    password: dbconfig.passwd,
    database: dbconfig.database
};

var client = mysql.createClient(connoption);
//console.log("init");


exports.loadplayer = function (response) {
    playerlist = new Array(0);
    var client = mysql.createClient(connoption);
    var querycmd = "select * from player_view";
    //console.log(querycmd);
    client.query(querycmd, function selectCb(err, results, fields){
        if(err) {
            throw err;
        }
        //console.log("query end");
        client.end(processresult(results,fields,"player",response));
        //console.log("process out");
        //client.destroy();
    });
    
    
};

exports.loadunit = function (response) {
    unitlist = new Array(0);
    var client = mysql.createClient(connoption);
    var querycmd = "select * from unit_view2";
    
    client.query(querycmd, function selectCb(err, results, fields){
        if(err) {
            //console.log("err");
            throw err;
        }
        //console.log(querycmd + "ing...");
        client.end(processresult(results,fields,"unit",response));
        //client.destroy();
    });
    
};

exports.loadmagic = function (response) {
    magiclist = new Array(0);
    var client = mysql.createClient(connoption);
    var querycmd = "select * from magic_view";
    
    client.query(querycmd, function selectCb(err, results, fields){
        if(err) {
            //console.log("err");
            throw err;
        }
        //console.log(querycmd + "ing...");
        client.end(processresult(results,fields,"magic",response));
        //client.destroy();
    });
    
};

exports.loadskill = function (response) {
    skilllist = new Array(0);
    var client = mysql.createClient(connoption);
    var querycmd = "select * from skill_view";
    
    client.query(querycmd, function selectCb(err, results, fields){
        if(err) {
            //console.log("err");
            throw err;
        }
        //console.log(querycmd + "ing...");
        client.end(processresult(results,fields,"skill",response));
        //client.destroy();
    });
    
};

exports.loaditem = function (response) {
    
    /*
     itemlist = new Array(0);
     var client = mysql.createClient(connoption);
     var querycmd = "select * from item_view";
    
    client.query(querycmd, function selectCb(err, results, fields){
        if(err) {
            console.log("err");
            throw err;
        }
        //console.log(querycmd + "ing...");
        client.end(processresult(results,fields,"magic",response));
        client.destroy();
    });*/
    
};

var processresult = function (results, fields, loadtype, response) {
    //console.log(loadtype);
    if (loadtype == "player") {
        for (var i in results) {
            var resu = results[i];
            var playerobj = {idplayer: resu.idplayer, player_name: resu.player_name, level: resu.lv, exp: resu.exp, maxexp: resu.maxexp, class_id: resu.class_id, class_name: resu.leadercategory_name,
                bell: {shrine: resu.shrine, empire: resu.empire, demon: resu.demon, barbarian: resu.barbarian},
                round: resu.shrine + resu.empire + resu.demon + resu.barbarian,
                active: resu.active,
                league_id: resu.idleague,
                league_name: resu.league_name};
            for (var j in playerobj.bell) {
                if (playerobj.bell[j] == 1) {
                    playerobj.bell[j] = true;
                }
                else if (playerobj.bell[j] == 0) {
                    playerobj.bell[j] = false;
                }
            }
            if (playerobj.active == 1) {
                playerobj.active = true;
            }
            else if (playerobj.active == 0) {
                playerobj.active = false;
            }
            playerlist.push(playerobj);
        }
        //console.log("list ready");
        response.json(playerlist);
        //console.log("json end");
        response.end();
        //console.log("response end");
        //return;
    }
    if (loadtype == "unit") {
        for (var i in results) {
            var resu = results[i];
            var already = false;
            for (var j = unitlist.length - 1; j >= 0; j--) {
                if (unitlist[j].idarmy == resu.idarmy) {
                    already = true;
                    var unitobj = unitlist[j];
                    switch (resu.bell_id) {
                        case 1: case "1":
                            unitobj.bell.shrine = true;break;
                        case 2: case "2":
                            unitobj.bell.empire = true;break;
                        case 3: case "3":
                            unitobj.bell.demon = true;break;
                        case 4: case "4":
                            unitobj.bell.barbarian = true;break;
                    }
                    /*var newcate = true;
                    for (var k in unitobj.category) {
                        if (unitobj.category[k].id == resu.category_id) {
                            newcate = false;
                            break;
                        }
                    }
                    if (newcate) {
                        unitobj.category.push({id: resu.category_id, name: resu.category_name});
                    }*/
                    var newprop =true;
                    for (var k in unitobj.property) {
                        if (unitobj.property[k].id == resu.property_id) {
                            newprop = false;
                            break;
                        }
                    }
                    if (newprop) {
                        unitobj.property.push({id: resu.property_id, name: resu.property_name});
                    }
                    break;
                }
            }
            if (!already) {
                var unitobj = {
                    idarmy: resu.idarmy,
                    army_name: resu.army_name,
                    pw: resu.pw,
                    subpw: resu.subpw,
                    pw_name: resu.pw_name,
                    army_cost: resu.army_cost,
                    pic: resu.pic,
                    localpic: resu.localpic,
                    category: [{id: resu.category_id, name: resu.category_name}],
                    property: [{id: resu.property_id, name: resu.property_name}],
                    bell: {shrine: false, empire: false, demon: false, barbarian: false},
                    lv: resu.lv
                };
                switch (resu.bell_id) {
                    case 1: case "1":
                        unitobj.bell.shrine = true;break;
                    case 2: case "2":
                        unitobj.bell.empire = true;break;
                    case 3: case "3":
                        unitobj.bell.demon = true;break;
                    case 4: case "4":
                        unitobj.bell.barbarian = true;break;
                }
                unitlist.push(unitobj);
            }
        }
        response.json(unitlist);
        response.end();
        //return;
    }
    if (loadtype == "magic") {
        for (var i in results) {
            var resu = results[i];
            var already = false;
            for (var j = magiclist.length - 1; j >= 0; j--){
                if (magiclist[j].idmagic == resu.idmagic) {
                    already = true;
                    var magicobj = magiclist[j];
                    switch (resu.bell_id) {
                        case 1: case "1":
                            magicobj.availability.shrine = resu.lv;break;
                        case 2: case "2":
                            magicobj.availability.empire = resu.lv;break;
                        case 3: case "3":
                            magicobj.availability.demon = resu.lv;break;
                        case 4: case "4":
                            magicobj.availability.barbarian = resu.lv;break;
                    }
                    var newcate = true;
                    for (var k in magicobj.category) {
                        if (resu.idcategory_magic == magicobj.category[k].id) {
                            newcate = false;
                            break;
                        }
                    }
                    if (newcate) {
                        magicobj.category.push({id: resu.idcategory_magic, name: resu.category_name})
                    }
                    break;
                }
            }
            if (!already) {
                var magicobj = {
                    idmagic: resu.idmagic,
                    magic_name: resu.magic_name,
                    magic_cost: resu.magic_cost,
                    comments: resu.comments,
                    category: [{id: resu.idcategory_magic, name: resu.category_name}],
                    availability: {shrine:false, empire: false, demon: false, barbarian: false},
                    detail: resu.detail
                };
                switch (resu.bell_id) {
                    case 1: case "1":
                        magicobj.availability.shrine = resu.lv;break;
                    case 2: case "2":
                        magicobj.availability.empire = resu.lv;break;
                    case 3: case "3":
                        magicobj.availability.demon = resu.lv;break;
                    case 4: case "4":
                        magicobj.availability.barbarian = resu.lv;break;
                }
                magiclist.push(magicobj);
            }
        }
        response.json(magiclist);
        response.end();
        //return;
    }
    if (loadtype == "skill") {
        for (var i in results) {
            var resu = results[i];
            skilllist.push({
                idskill: resu.idskill,
                skill_name: resu.skill_name,
                category: {id: resu.skill_category, name: resu.skillcategory_name},
                type: {id: resu.skill_type, name: resu.skilltype_name},
                leader: {id: resu.leadercategory_id, name: resu.leadercategory_name},
                group_id: resu.group_id,
                detail: resu.detail
            });
        }
        response.json(skilllist);
        response.end();
        //return;
    }
    /*if (loadtype == "item") {
        for (var i in results) {
            var resu = results[i];
            
        }
        response.json(itemlist);
        response.end();
        return;
    }*/
};
