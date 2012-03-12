/*$(function() {
    //$("#myarmyul").sortable();
    //$("#myarmyul").disableSelection();
});*/

var armysort = {
    start: armysortstart,
    stop: armysortstop
};

function armysortstart (event, ui) {
    $(this).children(".armyitem").droppable("disable");
}


function armysortstop (event, ui) {
    $(this).children(".armyitem").droppable("enable");
}