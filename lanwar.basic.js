function refreshbasicinfo (who) {
    var pid = formation[who].player.idplayer;
    if (pid != 0) {
        refreshplayerdisplay(who);
    }
    
}


function refreshplayerdisplay(who) {
    var container = $("#"+ who + "basicinfo");
    container.empty();
    var playerobj = getobjbyid("player","idplayer",formation[who].player.idplayer)
    var newhtm = "";
    newhtm = '<div class="basicinfoname ';
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
    newhtm += '" id="nameidp' + playerobj.idplayer + '">' + playerobj.player_name + '</div>';
    newhtm += '<div class="basicinfodetail" id="detailidp' + playerobj.idplayer +'"><span class="bell ';
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
    newhtm += '<span class="basicexp">' ;
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
    container.append(newhtm);
}
