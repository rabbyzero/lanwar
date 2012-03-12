function ifproperty (unit, property) {
    switch (property) {
        case "dark":
        case "黑暗":
        case "暗":
            var proid = [2,5];
            break;
        case "hidden":
        case "野伏":
            var porid = 5;
            break;
        case "summon":
        case "召唤":
            var proid = [3,4];
            break;
        case "normalsummon":
        case "普通召唤":
        case "普召":
            var proid = 3;
            break;
        case "advsummon":
        case "高级召唤":
        case "高召":
            var proid = 4;
            break;
        case "holy":
        case "神圣":
        case "圣":
            var proid = 1;
            break;
        case "none":
        case "无":
            var proid = 0;
            break;
    }
    if (proid.length > 1) {
        for (var i in unit.property) {
            for (var j in proid) {
                if (unit.property[i].id == proid[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    else {
        for (var i in unit.property) {
            if (unit.property[i].id == proid) {
                return true;
            }
        }
        return false;
    }
}

function ifcategory (unit,category) {
    switch (category) {
        case "infantry":
        case "步兵":
        case "步":
        case 1:
            var cateid = 1;
            break;
        case "spear":
        case "枪":
        case "枪兵":
        case 2:
            var cateid = 2;
            break;
        case "knight":
        case "骑兵":
        case "骑":
        case 3:
            var cateid = 3;
            break;
        case "flyer":
        case "飞兵":
        case "飞":
            var cateid = [4,8];
            break;
        case "normalflyer":
        case "普通飞兵":
        case "普飞":
        case 4:
            var cateid = 4;
            break;
        case "antiflyer":
        case "对空飞兵":
        case "对空飞":
        case "对飞":
        case 8:
            var cateid = 8;
            break;
        case "sailor":
        case "水兵":
        case "水":
            var cateid = [5,9];
            break;
        case "normalsailor":
        case "普通水兵":
        case "普水":
        case 5:
            var cateid = 5;
            break;
        case "seamonster":
        case "水上兵":
        case "水上":
        case 9:
            var cateid = 9;
            break;
        case "archer":
        case "弓兵":
        case "弓":
        case 6:
            var cateid = 6;
            break;
    }
    if (cateid.length > 1) {
        for (var i in unit.category) {
            for (var j in cateid) {
                if (unit.category[i].id == cateid[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    else {
        for (var i in unit.category) {
            if (unit.category[i].id == cateid) {
                return true;
            }
        }
        return false;
    }
}

function ifleader(unit) {
    if (unit.category[0].id > 100) {
        return true;
    }
    else {
        return false;
    }
}

function getunitbell(unit) {
    if (unit.idarmy > 1000) {
        return "all";
    }
    else {
        for (var i in unit.bell) {
            if (unit.bell[i]) {
                return i;
            }
        }
        return false;
    }
}


function refreshunitdisplay (who) {
    var container = $("#"+who+"armycon");
    container.empty();
    if (pool[who].unit.status != "ready") {
        return false;
    }
    var list = pool[who].unit.list;
    var end = list.length;
    var html = "";
    var ccate = 0;
    var needcategoryend = false;
    for (var i = 0; i < end; i++) {
        var unit = getobjbyid("unit","idarmy",list[i]);
        var ucate = unit.category[0].id;
        if (ucate > 100) {
            ucate = 100;
        }
        if (ccate != ucate) {
            ccate = ucate;
            if (needcategoryend) {
                html += '</ul></div>';
            }
            var ename = getcommonobj(categoryobj,"id",ucate).ename;
            html += '<div class="armycategory" id="' + who + ename + 'div">';
            html += '<ul class="armyul" id="' + who + ename + 'ul">';
            needcategoryend = true;
        }
        html += singleunitli(who,unit);
    }
    if (needcategoryend) {
        html += '</ul></div>';
    }
    container.append(html);
    return true;
}

function singleunitli (who, unit) {
    var html = '<li class="armyli hand';
    var ifadv = ifproperty(unit,"advsummon");
    if (ifadv) {
        html += '"';
    }
    else {
        html += ' ' + getunitbell(unit) + 'bg"';
    }
    html += '" id="'+who+'u'+unit.idarmy+'">';
    html += '<div class="armydiv"">';
    html += '<div class="armyimgdiv" id="'+who+'u'+unit.idarmy+'div"><img class="armyimg" id="'+who+'u'+unit.idarmy+'img" alt="'+unit.army_name+'" src="'+unit.localpic+'"></div>';
    html += '<div class="proinfo">';
    for (var ipro in unit.property) {
        html += getcommonobj(propertyobj,"id",unit.property[ipro].id).cshort;
    }
    html += '</div>';
    html += '<div class="spinfo">';
    if(ifleader(unit)) {
        html += "指";
    }
    else {
        var pclass_id = formation[who].player.class_id;
        if (!ifadv) {
            if (pclass_id == 7 && unit.bell.shrine) {
                html += getcommonobj(specialabilityobj,"ename","Magic resist").cshort;
            }
            else if (pclass_id == 9 && unit.bell.empire) {
                html += getcommonobj(specialabilityobj,"ename","Sacrifice").cshort;
            }
            else if (pclass_id == 8 && unit.bell.demon) {
                html += getcommonobj(specialabilityobj,"ename","Dark demon").cshort;
            }
        }
    }
    html += '</div>';
    html += '<div class="lvinfo">L'+unit.lv+'</div>';
    html += '<div class="pwinfo">P'+unit.pw_name+'</div>';
    html += '</div></li>';
    return html;
}