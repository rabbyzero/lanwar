var lanwarevent = new Object;

$(lanwarevent).bind("playerloaded",function(){
    //alert("playerloaded");
    notice("playerloaded");
    loadplayer();
    refreshplayerselmenu();
    bindplayerselbtn();
});
$(lanwarevent).bind("unitloaded",function(){
    //alert("playerloaded");
    notice("unit loaded");
    $(lanwarevent).trigger("refreshformation");
    
});
$(lanwarevent).bind("magicloaded",function(){
    //alert("playerloaded");
    notice("magic loaded");
    $(lanwarevent).trigger("refreshformation");
});

$(lanwarevent).bind("skillloaded",function(){
    //alert("playerloaded");
    notice("skill loaded");
    $(lanwarevent).trigger("refreshformation");
});

$(lanwarevent).bind("itemloaded",function(){
    //alert("playerloaded");
});


$(lanwarevent).bind("playermyselected",function(){
    //alert("playerloaded");
});
$(lanwarevent).bind("playeropselected",function(){
    //alert("playerloaded");
});

$(lanwarevent).bind("selectplayer",function(event,id,who) {
   selectplayer(id,who);
   refreshbasicinfo(who);
});

$(lanwarevent).bind("refreshformation",function(event,who) {
    /*if (liststatus.player != "listready") {
        return false;
    }*/
    /*if (liststatus.unit != "listready") {
        
    }*/
    
    for (var i in formation) {
        if (typeof(who) != 'undefined' && i != who) {
            continue;
        }
        
        if (formation[i].player.idplayer != 0) {
            if (liststatus.unit == "listready") {
                if (pool[i].unit.status == "waiting refresh") {
                    fillpool(i,"unit");
                    pool[i].unit.status = "ready";
                    notice(i+" unit pool ready");
                    $(lanwarevent).trigger("refreshunitdisplay",i);
                }
            }
            if (liststatus.magic == "listready") {
                if (pool[i].magic.status == "waiting refresh") {
                    fillpool(i,"magic");
                    pool[i].magic.status = "ready";
                    notice(i+" magic pool ready");
                    $(lanwarevent).trigger("refreshmagicdisplay",i);
                }
            }
            if (liststatus.skill == "listready") {
                if (pool[i].skill.status == "waiting refresh") {
                    fillpool(i,"skill");
                    pool[i].skill.status = "ready";
                    notice(i+" skill pool ready");
                    $(lanwarevent).trigger("refreshskilldisplay",i);
                }
            }
        }
        
    }
});

$(lanwarevent).bind("refreshunitdisplay", function(event,who) {
    refreshunitdisplay(who);
    $("li","#"+who+"armycon").draggable({helper: "clone"});
    $(".armyimg",".contentitem").on("load",adjustimgposition);
    $(".armyimg",".contentitem").on("adjust",adjustimgposition);
    adjustnow();
    //$(".armyimg",".contentitem").trigger("load");
});

$(lanwarevent).bind("refreshmagicdisplay", function(event,who) {
    refreshmagicdisplay(who);
    $("li","#"+who+"magiccon").draggable({helper: "clone"});
});

$(lanwarevent).bind("refreshskilldisplay", function(event,who) {
    refreshskilldisplay(who);
    $(".type4","#"+who+"skillcon").draggable({helper: "clone"});
});

$(lanwarevent).bind("custogglebell",function(event,who,bell){
    if (customplayer[who].status != "editing") {
        notice("not in edit mode");
    }
    else {
        custogglebell(who,bell);
    }
});

$(lanwarevent).bind("customplayer",function(event,who){
    if (customplayer[who].status == "ready") {
        customplayer[who].status = "editing";
        
        $("#"+who+"custom").empty().append("完成");
        $("#"+who+"customsave").addClass("hidden");
    }
    else if (customplayer[who].status == "editing") {
        customplayer[who].status = "ready";
        //refreshformation();
        $("#"+who+"custom").empty().append("自定义");
        $("#"+who+"customsave").removeClass("hidden");
    }
});

$(lanwarevent).bind("cuschangelv", function (event,who) {
    if (customplayer[who].status != "editing") {
        notice("not in edit mode");
    }
    else {
        togglepopmenu(who,"lv");
    }
});

$(lanwarevent).bind("cusselectlv", function (event, who, level) {
    if (customplayer[who].status != "editing") {
        notice("not in edit mode");
    }
    else {
        selectlv(who,level);
    }
    togglepopmenu(who,"lv");
});

$(lanwarevent).bind("popmenuclose", function (event,who,menutype) {
    if ($("#"+who+"cus"+menutype+"div").hasClass("popmenuon")) {
        togglepopmenu(who,menutype);
    }
});

$(lanwarevent).bind("cuschangeclass", function (event,who) {
    if (customplayer[who].status != "editing") {
        notice("not in edit mode");
    }
    else {
        togglepopmenu(who,"class");
    }
});

$(lanwarevent).bind("cusselectclass", function (event, who, classid) {
    if (customplayer[who].status != "editing") {
        notice("not in edit mode");
    }
    else {
        selectclass(who,classid);
    }
    togglepopmenu(who,"class");
});

$(lanwarevent).bind("selectcustomplayer", function (event,who) {
    if (customplayer[who].status == "ready") {
        if (who == "my") {
            selectplayer(-1,who);
        }
        else if (who == "op") {
            selectplayer(-2,who);
        }
        removeselectplayer(who);
    }
    else {
        notice("not ready yet");
    }
});