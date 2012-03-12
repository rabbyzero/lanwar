function refreshskilldisplay (who) {
    var container = $("#"+who+"skillcon");
    container.empty();
    if (pool[who].skill.status != "ready") {
        return false;
    }
    var list = pool[who].skill.list;
    var end = list.length;
    var html = "";
    var ccate = 0;
    var needcategoryend = false;
    for (var i = 0; i < end; i++) {
        var skill = getobjbyid("skill","idskill",list[i]);
        var scate = skill.category.id;
        if (ccate != scate) {
            ccate = scate;
            if (needcategoryend) {
                html += '</ul></div>';
            }
            var eshort = skill.category.name;
            html += '<div class="skillcategory" id="' + who + 'sc' + eshort + 'div">';
            html += '<ul class="skillul" id="' + who + 'sc' + eshort + 'ul">';
            needcategoryend = true;
        }
        html += singleskillli(who,skill);
    }
    if (needcategoryend) {
        html += '</ul></div>';
    }
    container.append(html);
    return true;
}

function singleskillli (who, skill) {
    var html = '<li class="skillli';
    //var player = formation[who].player;
    
    if (skill.type.id == 4) {
        html += ' type4 hand';
    }
    html += '" id="' + who + 's' + skill.idskill +'">';
    html += skill.skill_name;
    var cshort = getcommonobj(skillcategoryobj,"id",skill.category.id).cshort;
    html += '<div class="skillcate">'+cshort+'</div>';
    html += '</li>';
    
    return html;
}