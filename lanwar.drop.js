var armydrop = {
    drop: armydropprocess
};

function armydropprocess (event, ui) {
    //console.log(this.id);
    var newelement = ui.helper.find(".armyimgdiv");
    newelement.css("top",(newelement.position().top + 2.5));
    $(this).empty().append(newelement);
}