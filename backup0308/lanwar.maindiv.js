function maindivinit () {
    $(".leftbaritem").mouseover(function(){
        $(this).addClass("ui-state-hover");
    });
    $(".leftbaritem").mouseout(function(){
        $(this).removeClass("ui-state-hover");
    });
    $(".leftbaritem").click(function(){
        $(".leftbaritem.ui-state-active").removeClass("ui-state-active");
        $(this).addClass("ui-state-active");
        maintogglewho(this.id.slice(0,2));
    });
    $(".contentaccording").mouseover(function(){
        $(this).addClass("ui-state-hover");
    });
    $(".contentaccording").mouseout(function(){
        $(this).removeClass("ui-state-hover");
    });
    $(".contentaccording").click(function(){
        togglecontentitem(this);
    });
}

function maintogglewho (who) {
    $(".formationdiv, .contentdiv").filter(".hidden").removeClass("hidden");
    $(".formationdiv, .contentdiv").addClass("hidden");
    $("#"+who+"formationdiv.hidden").removeClass("hidden");
    $("#"+who+"contentdiv.hidden").removeClass("hidden");
    adjustnow();
}

function togglecontentitem(btn) {
    var condiv = $("#"+btn.id.slice(0,-9)+"con");
    var on = condiv.hasClass("hidden");
    if (on) {
        $(btn).children().removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
        condiv.removeClass("hidden");
        if(btn.id.slice(2,-9) == "army") {
            adjustnow();
        }
    }
    else {
        $(btn).children().removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
        condiv.addClass("hidden");
    }
}