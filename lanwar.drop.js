var armydrop = {
    drop: armydropprocess
};

function armydropprocess (event, ui) {
    //console.log(this.id);
    var newelement = ui.helper.find(".armyimgdiv");
    newelement.css("top",(newelement.position().top + 2.5));
    $(this).empty().append(newelement);
}

var magicdrop = {
    drop: magicdropprocess
};

function magicdropprocess (event, ui) {
    var magicid = parseInt(ui.helper.id.slice(3));
    var magicobj = getobjbyid("magic","idmagic",magicid);
    $(this).empty().append(magicobj.magic_name);
    var who = $(this).parent().id.slice(0,2);
    if (formation[who].player.class_id == 10) {
        var newhtml += '<li class="ui-state-default magicitem">+</li>';
        $(this).parent().append(newhtml);
    }
}