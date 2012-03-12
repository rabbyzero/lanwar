function refreshmagicdisplay (who) {
    var container = $("#"+who+"magiccon");
    container.empty();
    if (pool[who].magic.status != "ready") {
        return false;
    }
    var list = pool[who].magic.list;
    var end = list.length;
    var html = "";
    var ccate = 0;
    var needcategoryend = false;
    for (var i = 0; i < end; i++) {
        var magic = getobjbyid("magic","idmagic",list[i]);
        var mcate = magic.category[magic.category.length - 1].id;
        if (ccate != mcate) {
            ccate = mcate;
            if (needcategoryend) {
                html += '</ul></div>';
            }
            var eshort = getcommonobj(magiccategoryobj,"id",mcate).eshort;
            html += '<div class="magiccategory" id="' + who + eshort + 'div">';
            html += '<ul class="magicul" id="' + who + eshort + 'ul">';
            needcategoryend = true;
        }
        html += singlemagicli(who,magic);
    }
    if (needcategoryend) {
        html += '</ul></div>';
    }
    container.append(html);
    return true;
}

function singlemagicli (who, magic) {
    var html = '<li class="magicli hand ';
    var player = formation[who].player;
    var bell = {shrine: false, empire: false, demon: false, barbarian: false};
    if (magic.availability.shrine && player.bell.shrine) {
        if (magic.availability.shrine <= player.level) {
            html += 's';
            bell.shrine = magic.availability.shrine;
        }
    }
    if (magic.availability.empire && player.bell.empire) {
        if (magic.availability.empire <= player.level) {
            html += 'e';
            bell.empire = magic.availability.empire;
        }
    }
    if (magic.availability.demon && player.bell.demon) {
        if (magic.availability.demon <= player.level) {
            html += 'd';
            bell.demon = magic.availability.demon;
        }
    }
    if (magic.availability.barbarian && player.bell.barbarian) {
        if (magic.availability.barbarian <= player.level) {
            html += 'b';
            bell.barbarian = magic.availability.barbarian;
        }
    }
    html += '" id="' + who + 'm' + magic.idmagic +'">';
    html += magic.magic_name;
    for (var ib in bell) {
        if (bell[ib]) {
            html += '<div class="mag'+ib.slice(0,1)+'lv '+ib+'">L'+bell[ib]+'</div>';
        }
    }
    html += '</li>';
    
    return html;
}