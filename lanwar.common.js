var playerlist;
var unitlist;
var magiclist;
var skilllist;
var itemlist;
var liststatus = {player: "empty", unit: "empty", magic: "empty", skill: "empty", item: "empty"};

$(document).ready(function(){
    //alert("test");
    $(".menuitem").mouseover(function(){
        $(this).addClass("menuitemon");
    });
    $('.menuitem').mouseout(function(){
        $(this).removeClass("menuitemon");
    });
    $(".menuitem").click(function(){
       var menu = $("#" + this.id +"div");
       var turnoff = false;
       if(menu.hasClass("menudivon")) {
        turnoff = true
       }
       $(".menudiv").removeClass("menudivon");
       $(".menudiv").addClass("menudivoff");
       //alert("#" + this.id +"div");
       if(!turnoff){
        menu.css("left",$(this).position().left);
        menu.css("top",$(this).position().top + $(this).outerHeight(true));
        $("#" + this.id +"div").removeClass("menudivoff");
        $("#" + this.id +"div").addClass("menudivon");
       }
    });
    
    //localtest();
    
    loaddata();
});

function localtest() {
    var tl = new Array(0);
    var newob = new Object;
    for (var i = 0; i < 10; i++) {
        //var newob = new Object;
        //newob = {value: i};
        //newob.value = i;
        //tl.push(newob);
        tl[i] = newob;
    }
    //alert(tl);
}