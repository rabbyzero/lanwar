var loadwaitlist = new Array(0);
var loadinglist = new Array(0);

function loaddata() {
    tryload("playerlist");
    tryload("unitlist");
    tryload("magiclist");
    tryload("skilllist");
    //tryload("itemlist");
}

function tryload(loadcontent) {
    var ajaxurl = "getdata/" + loadcontent;
    //ajaxurl ="file:///E:/node.js/lanwar/test.json";
    switch (loadcontent) {
        case "playerlist":
            //$(lanwarevent).trigger("playerloaded");
            liststatus.player = "loading";
            $(".playerselectdiv",".preloaded").empty().append("Loading data");
            $(".playerdetaildiv",".preloaded").empty().append("Loading data");            
            break;
        case "unitlist":
            liststatus.unit = "loading";break;
        case "magiclist":
            liststatus.magic = "loading";break;
        case "skilllist":
            liststatus.skill = "loading";break;
        case "itemlist":
            liststatus.item = "loading";break;
    }
    $.getJSON(ajaxurl,function(data){
        switch (loadcontent) {
            case "playerlist":
                //playerlist = $.parseJSON(data);
                playerlist = data;
                liststatus.player = "listready";
                $(lanwarevent).trigger("playerloaded");
                break;
            case "unitlist":
                unitlist = data;
                liststatus.unit = "listready";
                $(lanwarevent).trigger("unitloaded");
                break;
            case "magiclist":
                magiclist = data;
                liststatus.magic = "listready";
                $(lanwarevent).trigger("magicloaded");
                break;
            case "skilllist":
                skilllist = data;
                liststatus.skill = "listready";
                $(lanwarevent).trigger("skillloaded");
                break;
            case "itemlist":
                itemlist = data;
                liststatus.item = "listready";
                $(lanwarevent).trigger("itemloaded");
                break;
        }
    });
}

function loadplayer() {
    var playerselhtm = "";
    var playerdelhtm = "";
    for (var i in playerlist) {
        playerselhtm += insertplayer("sel",playerlist[i]);
        playerdelhtm += insertplayer("det",playerlist[i]);
    }
    $(".playerselectdiv",".preloaded").empty().append(playerselhtm);
    $(".playerdetaildiv",".preloaded").empty().append(playerdelhtm);
}

function getobjbyid (objtype, key, value) {
    if (typeof objtype == "string") {
        switch (objtype) {
            case "player":
                objtype = playerlist;
                break;
            case "unit":
                objtype = unitlist;
                break;
            case "magic":
                objtype = magiclist;
                break;
            case "skill":
                objtype = skilllist;
                break;
            case "item":
                objtype = itemlist;
                break;
            default:
                return false;
        }
    }
    //var getresult = new Array(0);
    if (key == "idplayer") {
        if (value == -1) {
            return customplayer.my;
        }
        else if (value == -2) {
            return customplayer.op;
        }
    }
    
    for (var i in objtype) {
        var cobj = objtype[i];
        if (cobj[key] == value) {
            return cobj;
        }
    }
    return false;
}

function fillpool (who, filltype) {
    var poolobj = pool[who][filltype];
    poolobj.status = "filling";
    poolobj.list = [];
    var playerobj = formation[who].player;
    
    if (filltype == "unit") {
        fillunit(playerobj, poolobj.list);
        
    }
    else if (filltype == "magic") {
        fillmagic(playerobj, poolobj.list);
    }
    else if (filltype == "skill") {
        fillskill(playerobj, poolobj.list);
    }
    
    poolobj.status = "ready";
}

function fillunit (player, list) {
    var bell = player.bell;
    var pclass = player.class_id;
    for (var i in unitlist) {
        var unitobj = unitlist[i];
        var ubell = getunitbell(unitobj);
        var bellclass = false;
        if (bell[ubell]) {
            if (ifproperty(unitobj, "summon")) {
                if (pclass >= 7) {
                    bellclass = true;
                }
            }
            else {
                bellclass = true;
            }
        }
        else if (ubell == "all" && pclass == 11) {
            bellclass = true;
        }
        if (!bellclass) {
            continue;
        }
        if (unitobj.lv <= player.level) {
            if(ifleader(unitobj)) {
                if (unitobj.lv != player.level) {
                    continue;
                }
                if (unitobj.category[0].id <= 106) {
                    if (unitobj.category[0].id - 100 != pclass) {
                        continue;
                    }
                }
                else {
                    switch (unitobj.category[0].id) {
                        case 107:
                            if (pclass != 12) {
                                continue;
                            }
                            break;
                        case 108:
                            if (pclass != 11) {
                                continue;
                            }
                            break;
                        case 109:
                            if (pclass != 7) {
                                continue;
                            }
                            break;
                        case 110:
                            if (pclass != 9) {
                                continue;
                            }
                            break;
                        case 111:
                            if (pclass != 8) {
                                continue;
                            }
                            break;
                        case 112:
                            if (pclass != 10) {
                                continue;
                            }
                            break;
                    }
                }
                insertpoolunit(list,unitobj);
            }
            else {
                insertpoolunit(list,unitobj);
            }
        }
    }
}

function insertpoolunit (list,unit) {
    var position = 0;
    var i = 0;
    if (!ifleader(unit)) {
        for (i = list.length - 1; i >=0; i--) {
            var compareunit = getobjbyid("unit","idarmy",list[i]);
            if (ifleader(compareunit)) {
                i++;
                break;
            }
            else {
                if (compareunit.category[0].id < unit.category[0].id ) {
                    i++;
                    break;
                }
                else if ( compareunit.category[0].id == unit.category[0].id  ) {
                    if (compareunit.lv < unit.lv) {
                        i++;
                        break;
                    }
                    else if (compareunit.lv == unit.lv) {
                        if (compareunit.pw < unit.pw) {
                            i++;
                            break;
                        }
                        else if (compareunit.pw == unit.pw) {
                            if (compareunit.subpw < unit.subpw) {
                                i++;
                                break;
                            }
                            else if (compareunit.subpw == unit.subpw) {
                                var cbell = compareunit.bell;
                                var ubell = unit.bell;
                                if (cbell.shrine) {
                                    if (!ubell.shrine) {
                                        i++;
                                        break;
                                    }
                                }
                                else if (cbell.empire) {
                                    if (!ubell.empire) {
                                        i++;
                                        break;
                                    }
                                }
                                else if (cbell.demon) {
                                    if (!ubell.demon) {
                                        i++;
                                        break;
                                    }
                                }
                                else if (cbell.barbarian) {
                                    if (!ubell.barbarian) {
                                        i++;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (i < 0) {
            position = 0;
        }
        else {
            position = i;
        }
    }
    for (var j = list.length; j > position; j-- ) {
        list[j] = list[j-1];
    }
    list[position] = unit.idarmy;
    return position;
}

function fillmagic (player, list) {
    var pbell = player.bell;
    var pclass = player.class_id;
    
    for (var i in magiclist) {
        var magicobj = magiclist[i];
        var mbell = magicobj.availability;
        var blvavail = false;
        for (var ib in mbell) {
            if (mbell[ib] && pbell[ib]) {
                if (mbell[ib] <= player.level) {
                    blvavail = true;
                    break;
                }
            }
        }
        if (blvavail) {
            var spavail = true;
            if (magicobj.idmagic > 100 && pclass != 12) {
                spavail = false;
            }
            if (spavail) {
                insertpoolmagic (list, magicobj);
            }
        }
    }
}

function insertpoolmagic (list, magic) {
    var position = 0;
    var i = 0;
    var magiccate = magic.category[magic.category.length - 1].id;
    for (i = list.length - 1; i >=0; i--) {
        var comparemagic = getobjbyid("magic","idmagic",list[i]);
        var comparecate = comparemagic.category[comparemagic.category.length - 1].id;
        if (magiccate > comparecate) {
            i++;
            break;
        }
        else if (magiccate == comparecate) {
            if (magic.idmagic > comparemagic.idmagic) {
                i++;
                break;
            }
            else if (magic.idmagic == comparemagic.idmagic) {
                return false;
            }
        }
    }
    if (i < 0) {
        position = 0;
    }
    else {
        position = i;
    }
    for (var j = list.length; j > position; j-- ) {
        list[j] = list[j-1];
    }
    list[position] = magic.idmagic;
    return position;
}

function fillskill (player,list) {
    var pclass = player.class_id;
    
    for (var i in skilllist) {
        var skillobj = skilllist[i];
        if (pclass == skillobj.leader.id) {
            insertpoolskill (list, skillobj);
        }
    }
}

function insertpoolskill (list, skill) {
    var position = 0;
    var i = 0;
    var skillcate = skill.category.id;
    var skilltype = skill.type.id;
    for (i = list.length - 1; i >=0; i--) {
        var compareskill = getobjbyid("skill","idskill",list[i]);
        var comparecate = compareskill.category.id;
        var comparetype = compareskill.type.id;
        if (skillcate > comparecate) {
            i++;
            break;
        }
        else if (skillcate == comparecate) {
            if (skilltype > comparetype) {
                i++;
                break;
            }
            else if (skilltype == comparetype) {
                if (skill.idskill > compareskill.idskill) {
                    i++;
                    break;
                }
                else if (skill.idskill == compareskill.idskill) {
                    return false;
                }
            }
        }
    }
    if (i < 0) {
        position = 0;
    }
    else {
        position = i;
    }
    for (var j = list.length; j > position; j-- ) {
        list[j] = list[j-1];
    }
    list[position] = skill.idskill;
    return position;
}