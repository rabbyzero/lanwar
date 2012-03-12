function selectplayer(id,who) {
    if (formation[who].player.idplayer == id) {
        notice("same player");
    }
    else {
        formation[who].player = getobjbyid("player","idplayer",id);
        notice("player "+formation[who].player.player_name+"selected");
        for (var i in pool[who]) {
            pool[who][i].status = "waiting refresh";
        }
        $(lanwarevent).trigger("refreshformation",who);
    }
}

function custogglebell (who,bell) {
    var playerobj = customplayer[who];
    playerobj.bell[bell] = !playerobj.bell[bell];
    if (!playerobj.bell[bell]) {
        if (playerobj.round <= 1) {
            notice("last belligerent can not be removed.");
            playerobj.bell[bell] = true;
            return false;
        }
        var classoff = false;
        for (var i in rule.bell[bell].class_id) {
            var classid = rule.bell[bell].class_id[i];
            if (playerobj.class_id == classid) {
                classoff = true;
                break;
            }
        }
        if (classoff) {
            cuschangclass(who,rule.bell.common.class_id[0]);
        }
        playerobj.round--;
        $("#"+who+"cus"+bell).removeClass(bell);
        $("#"+who+"cus"+bell).addClass("bellinactive");
        for (var i in rule.bell[bell]) {
            if ($("#"+who+"class"+rule.bell[bell][i]).hasClass(bell)) {
                $("#"+who+"class"+rule.bell[bell][i]).removeClass(bell);
                $("#"+who+"class"+rule.bell[bell][i]).addClass("bellinactive");
            }
        }
    }
    else {
        playerobj.round++;
        $("#"+who+"cus"+bell).removeClass("bellinactive");
        $("#"+who+"cus"+bell).addClass(bell);
        for (var i in rule.bell[bell]) {
            if ($("#"+who+"class"+rule.bell[bell][i]).hasClass("bellinactive")) {
                $("#"+who+"class"+rule.bell[bell][i]).removeClass("bellinactive");
                $("#"+who+"class"+rule.bell[bell][i]).addClass(bell);
            }
        }
    }
    $("#"+who+"cusname").removeClass("s e d b se sd sb ed eb db sed seb sdb edb sedb");
    var newcolor = "";
    if (playerobj.bell.shrine) {
        newcolor += 's';
    }
    if (playerobj.bell.empire) {
        newcolor += 'e';
    }
    if (playerobj.bell.demon) {
        newcolor += 'd';
    }
    if (playerobj.bell.barbarian) {
        newcolor += 'b';
    }
    $("#"+who+"cusname").addClass(newcolor);
    return true;
}

function cuschangclass (who,classid) {
    selectclass (who,classid);
}

function selectlv (who, lv) {
    var playerobj = customplayer[who];
    if (playerobj.lv == lv) {
        notice("same level");
    }
    else {
        playerobj.lv = lv;
        $("#"+who+"cuslv").empty().append("Lv."+lv);
        notice("change level to " + lv);
    }
}

function selectclass (who, classid) {
    var playerobj = customplayer[who];
    if (playerobj.class_id == classid) {
        notice("same class");
    }
    else {
        playerobj.class_id = classid;
        for (var i in classobj) {
            if (classobj[i].id == classid) {
                playerobj.class_name = classobj[i].name;
                break;
            }
        }
        for (var i in rule.bell) {
            if (i == "common") {
                continue;
            }
            for (var j in rule.bell[i]) {
                if (classid == rule.bell[i][j]) {
                    if (!playerobj.bell[i]) {
                        custogglebell(who,i);
                    }
                    break;
                }
            }
        }
        $("#"+who+"cusclass").empty().append(playerobj.class_name);
        notice("change class to " + playerobj.class_name);
    }
}


function insertplayer(instype,playerobj) {
    var newhtm = "";
    if (instype == "sel") {
        newhtm = '<div class="playerselectbtn ';
        if (playerobj.bell.shrine) {
            newhtm += 's';
        }
        if (playerobj.bell.empire) {
            newhtm += 'e';
        }
        if (playerobj.bell.demon) {
            newhtm += 'd';
        }
        if (playerobj.bell.barbarian) {
            newhtm += 'b';
        }
        newhtm += '" id="p' + playerobj.idplayer + '">' + playerobj.player_name + '</div>';
    }
    else if (instype == "det") {
        newhtm = '<div class="playerdetail" id="p' + playerobj.idplayer +'d"><span class="bell ';
        if (playerobj.bell.shrine) {
            newhtm += 'shrine';
        }
        else {
            newhtm += 'bellinactive';
        }
        newhtm += '">光辉</span><span class="bell ';
        if (playerobj.bell.empire) {
            newhtm += 'empire';
        }
        else {
            newhtm += 'bellinactive';
        }
        newhtm += '">帝国</span><span class="bell ';
        if (playerobj.bell.demon) {
            newhtm += 'demon';
        }
        else {
            newhtm += 'bellinactive';
        }
        newhtm += '">魔族</span><span class="bell ';
        if (playerobj.bell.barbarian) {
            newhtm += 'barbarian';
        }
        else {
            newhtm += 'bellinactive';
        }
        newhtm += '">蛮族</span>';
        newhtm += '<span class="lv">Lv.' + playerobj.level + '</span><span class="leaderclass">' + playerobj.class_name + '</span><span class="expname">EXP</span>';
        newhtm += '<span class="exp">' ;
        var expbar = Math.round(playerobj.exp / playerobj.maxexp * 100);
        if (expbar < 1) {
            newhtm += '<div class="expback ui-widget-content" style="width: 100%"></div>';
        }
        else if (expbar >= 1 && expbar < 100) {
            var emptybar = 100 - expbar;
            newhtm += '<div class="expgraph ui-widget-header" style="width: ' + expbar +'%"></div><div class="expback ui-widget-content" style="width: ' + emptybar + '%"></div>';
        }
        else {
            newhtm += '<div class="expgraph ui-widget-header" style="width: 100%">&nbsp;</div>'
        }
        newhtm += playerobj.exp + '/' + playerobj.maxexp + '</span>'
        newhtm += '</div>';
    }
    return newhtm;
}
