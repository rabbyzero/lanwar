function menuinit() {
    refreshbtn();    
    
    $(".menuitem").mouseover(function(){
        $(this).addClass("menuitemon");
    });
    $('.menuitem').mouseout(function(){
        $(this).removeClass("menuitemon");
    });
    $(".menuitem").click(function(){
       togglemenu(this.id);
    });
    $('.menutitlebuttonleft').click(function(){
        $(this).toggleClass("btninactive");
        buttonclick(this.id);
    });
    $('.menutitlebuttonleft').mouseover(function(){
        //if ($(this).hasClass("btninactive")) {
            $(this).addClass("menuitemon");
        //}
    });
    $('.menutitlebuttonleft').mouseout(function(){
        $(this).removeClass("menuitemon");
    });
    $('.menutitlebuttonright').click(function(){
        buttonclick(this.id);
    });
    $('.custombtn').click(function(){
        buttonclick(this.id);
    });
    $('.lvselbtn').click(function(){
        buttonclick(this.id); 
    });
    $('.popmenuclosebtn').click(function(){
        buttonclick(this.id);
    });
    $('.classselbtn').click(function() {
        buttonclick(this.id);
    });
}

function refreshbtn() {
    for (var who in settings) {
        if (settings[who].active) {
            if ($("#"+who+"active").hasClass("btninactive")) {
                $("#"+who+"active").removeClass("btninactive");
            }
        }
        else {
            if (!$("#"+who+"active").hasClass("btninactive")) {
                $("#"+who+"active").addClass("btninactive");
            }
        }
        if (settings[who].inactive) {
            if ($("#"+who+"inactive").hasClass("btninactive")) {
                $("#"+who+"inactive").removeClass("btninactive");
            }
        }
        else {
            if (!$("#"+who+"inactive").hasClass("btninactive")) {
                $("#"+who+"inactive").addClass("btninactive");
            }
        }
        if (settings[who].advanced) {
            if ($("#"+who+"adv").hasClass("btninactive")) {
                $("#"+who+"adv").removeClass("btninactive");
            }
        }
        else {
            if (!$("#"+who+"adv").hasClass("btninactive")) {
                $("#"+who+"adv").addClass("btninactive");
            }
        }
        if (settings[who].beginner) {
            if ($("#"+who+"beg").hasClass("btninactive")) {
                $("#"+who+"beg").removeClass("btninactive");
            }
        }
        else {
            if (!$("#"+who+"beg").hasClass("btninactive")) {
                $("#"+who+"beg").addClass("btninactive");
            }
        }
        if (settings[who].candidate) {
            if ($("#"+who+"can").hasClass("btninactive")) {
                $("#"+who+"can").removeClass("btninactive");
            }
        }
        else {
            if (!$("#"+who+"can").hasClass("btninactive")) {
                $("#"+who+"can").addClass("btninactive");
            }
        }
        if (settings[who].detail) {
            if ($("#"+who+"det").hasClass("btninactive")) {
                $("#"+who+"det").removeClass("btninactive");
            }
        }
        else {
            if (!$("#"+who+"det").hasClass("btninactive")) {
                $("#"+who+"det").addClass("btninactive");
            }
        }
    }
    /*for (var who in customplayer) {
        var cplayer = customerplayer[who];
        
    }*/
}

function buttonclick(btnid) {
    switch (btnid) {
        case "myclose":
            togglemenu("my");
            break;
        case "opclose":
            togglemenu("op");
            break;
        case "myactive":
            settings.my.active = !settings.my.active;
            refreshselmenu("my");//refreshplayerselmenu();//refreshplayer("my","active");
            break;
        case "myinactive":
            settings.my.inactive = !settings.my.inactive;
            refreshselmenu("my");//refreshplayerselmenu();//refreshplayer("my","inactive");
            break;
        case "myadv":
            settings.my.advanced = !settings.my.advanced;
            refreshselmenu("my");//refreshplayerselmenu();//refreshplayer("my","advanced");
            break;
        case "mybeg":
            settings.my.beginner = !settings.my.beginner;
            refreshselmenu("my");//refreshplayerselmenu();//refreshplayer("my","beginner");
            break;
        case "mycan":
            settings.my.candidate = !settings.my.candidate;
            refreshselmenu("my");//refreshplayerselmenu();//refreshplayer("my","candidate");
            break;
        case "mydet":
            settings.my.detail = !settings.my.detail;
            toggledetail();
            break;
            
        case "opactive":
            settings.op.active = !settings.op.active;
            refreshselmenu("op");//refreshplayerselmenu();//refreshplayer("op","active");
            break;
        case "opinactive":
            settings.op.inactive = !settings.op.inactive;
            refreshselmenu("op");//refreshplayerselmenu();//refreshplayer("op","inactive");
            break;
        case "opadv":
            settings.op.advanced = !settings.op.advanced;
            refreshselmenu("op");//refreshplayerselmenu();//refreshplayer("op","advanced");
            break;
        case "opbeg":
            settings.op.beginner = !settings.op.beginner;
            refreshselmenu("op");//refreshplayerselmenu();//refreshplayer("op","beginner");
            break;
        case "opcan":
            settings.op.candidate = !settings.op.candidate;
            refreshselmenu("op");//refreshplayerselmenu();//refreshplayer("op","candidate");
            break;
        case "opdet":
            settings.op.detail = !settings.op.detail;
            toggledetail();
            break;
        
        case "mycusname":
            $(lanwarevent).trigger("selectcustomplayer",btnid.slice(0,2));
            break;
        case "mycusshrine":
        case "mycusempire":
        case "mycusdemon":
        case "mycusbarbarian":
            $(lanwarevent).trigger("custogglebell",[btnid.slice(0,2),btnid.slice(5)]);
            break;
        case "mycuslv":
            $(lanwarevent).trigger("cuschangelv",btnid.slice(0,2));
            break;
        case "mycusclass":
            $(lanwarevent).trigger("cuschangeclass",btnid.slice(0,2));
            break;
        case "mycustom":
            $(lanwarevent).trigger("customplayer",btnid.slice(0,2));
            break;
        case "mycustomsave":
            $(lanwarevent).trigger("selectcustomplayer",btnid.slice(0,2));
            break;
        
        case "opcusname":
            $(lanwarevent).trigger("selectcustomplayer",btnid.slice(0,2));
            break;
        case "opcusshrine":
        case "opcusempire":
        case "opcusdemon":
        case "opcusbarbarian":
            $(lanwarevent).trigger("custogglebell",[btnid.slice(0,2),btnid.slice(5)]);
            break;
        case "opcuslv":
            $(lanwarevent).trigger("cuschangelv",btnid.slice(0,2));
            break;
        case "opcusclass":
            $(lanwarevent).trigger("cuschangeclass",btnid.slice(0,2));
            break;
        case "opcustom":
            $(lanwarevent).trigger("customplayer",btnid.slice(0,2));
            break;
        case "opcustomsave":
            $(lanwarevent).trigger("selectcustomplayer",btnid.slice(0,2));
            break;
        
        case "mylv1":
        case "mylv2":
        case "mylv3":
        case "mylv4":
        case "oplv1":
        case "oplv2":
        case "oplv3":
        case "oplv4":
            $(lanwarevent).trigger("cusselectlv",[btnid.slice(0,2),parseInt(btnid.slice(4))]);
            break;
            
        case "mylvclose":
        case "oplvclose":
            $(lanwarevent).trigger("popmenuclose",[btnid.slice(0,2),"lv"]);
            break;
        
        case "myclass1":
        case "myclass2":
        case "myclass3":
        case "myclass4":
        case "myclass5":
        case "myclass6":
        case "myclass7":
        case "myclass8":
        case "myclass9":
        case "opclass1":
        case "opclass2":
        case "opclass3":
        case "opclass4":
        case "opclass5":
        case "opclass6":
        case "opclass7":
        case "opclass8":
        case "opclass9":
            $(lanwarevent).trigger("cusselectclass",[btnid.slice(0,2),parseInt(btnid.slice(-1))]);
            break;
        case "myclass10":
        case "myclass11":
        case "myclass12":
        case "opclass10":
        case "opclass11":
        case "opclass12":
            $(lanwarevent).trigger("cusselectclass",[btnid.slice(0,2),parseInt(btnid.slice(-2))]);
            break;
        
        case "myclassclose":
        case "opclassclose":
            $(lanwarevent).trigger("popmenuclose",[btnid.slice(0,2),"class"]);
            break;
    }
}

function togglemenu(who) {
    if (who == "my" || who == "menumy") {
        var menu = $("#menumydiv");
    }
    else if (who == "op" || who == "menuop") {
        var menu = $("#menuopdiv");
    }
    else {return;}
    var turnoff = false;
    if(menu.hasClass("menudivon")) {
     turnoff = true;
    }
    $(".menudiv").removeClass("menudivon");
    $(".menudiv").addClass("menudivoff");
    //alert("#" + this.id +"div");
    if(!turnoff){
        var btnobj = $("#" + who);
        menu.css("left",btnobj.position().left);
        menu.css("top",btnobj.position().top + btnobj.outerHeight(true));
        menu.removeClass("menudivoff");
        menu.addClass("menudivon");
    }
}

function refreshplayerselmenu() {
    /*if (settings.my.active) {
        // refreshplayer("my","active");
    }
    else {
        refreshplayer("my","active");
    }
    if (settings.my.inactive) {
        //refreshplayer("my","inactive");
    }
    else {
        refreshplayer("my","inactive");
    }*/
    /*$(".playerselectbtn",".preloaded").removeClass("hidden");
    $(".playerdetail",".preloaded").removeClass("hidden");
    for (var i in settings) {
        for (var j in settings[i]) {
            //refreshplayer(i,j);
            hideplayer(i,j);
        }
    }*/
    refreshselmenu("my");
    refreshselmenu("op");
    toggledetail();
}

function refreshselmenu (who) {
    /*$(".playerselectbtn",".preloaded","#menu"+who+"div").addClass("hidden");
    $(".playerdetail",".preloaded","#menu"+who+"div").addClass("hidden");*/
    for (var i in playerlist) {
        var playerobj = playerlist[i];
        var needoff = false;
        if (playerobj.active) {
            if (!settings[who].active) {
                needoff = true;
            }
        }
        else {
            if (!settings[who].inactive) {
                needoff = true;
            }
        }
        switch (playerobj.league_id) {
            case 1:
                if(!settings[who].advanced) {
                    needoff = true;
                }
                break;
            case 2:
                if(!settings[who].beginner) {
                    needoff = true;
                }
                break;
            case 3:
                if(!settings[who].candidate) {
                    needoff = true;
                }
                break;
        }
        if (needoff) {
            if (!$("#p"+playerobj.idplayer,$(".preloaded","#menu" + who + "div")).hasClass("hidden")) {
                $("#p"+playerobj.idplayer,$(".preloaded","#menu" + who + "div")).addClass("hidden");
            }
            if (!$("#p"+playerobj.idplayer+"d",$(".preloaded","#menu" + who + "div")).hasClass("hidden")) {
                $("#p"+playerobj.idplayer+"d",$(".preloaded","#menu" + who + "div")).addClass("hidden");
            }
        }
        else {
            if ($("#p"+playerobj.idplayer,$(".preloaded","#menu" + who + "div")).hasClass("hidden")) {
                $("#p"+playerobj.idplayer,$(".preloaded","#menu" + who + "div")).removeClass("hidden");
            }
            if ($("#p"+playerobj.idplayer+"d",$(".preloaded","#menu" + who + "div")).hasClass("hidden")) {
                $("#p"+playerobj.idplayer+"d",$(".preloaded","#menu" + who + "div")).removeClass("hidden");
            }
        }
    }
}

function toggledetail () {
    for (var who in settings) {
        if (settings[who].detail) {
            if($("#"+who+"detdiv").hasClass("hidden")){
                $("#"+who+"detdiv").removeClass("hidden");
            }
            $(".playerselectbtn",$(".preloaded","#menu" + who + "div")).removeClass("floatleft");
        }
        else {
            if (!$("#"+who+"detdiv").hasClass("hidden")) {
                $("#"+who+"detdiv").addClass("hidden");
            }
            $(".playerselectbtn",$(".preloaded","#menu" + who + "div")).addClass("floatleft");
        }
    }
}

function bindplayerselbtn() {
    $(".playerselectbtn").mouseover(function(){
        var playerid = this.id;
        $(this).addClass("playerbtnover");
        $("[id="+playerid+"d]").addClass("playerbtnover");
    });
    $(".playerselectbtn").mouseout(function(){
        var playerid = this.id;
        $(this).removeClass("playerbtnover");
        $("[id="+playerid+"d]").removeClass("playerbtnover");
    });
    $(".playerselectbtn",$(".preloaded","#menumydiv")).click(function(){
        var playerid = this.id;
        $(".playerbtnon","#menumydiv").removeClass("playerbtnon");
        $(this).addClass("playerbtnon");
        var pureid = playerid.slice(1);
        $(lanwarevent).trigger("selectplayer",[pureid,"my"]);
        //selectplayer(playerid,"my");
    });
    $(".playerselectbtn",$(".preloaded","#menuopdiv")).click(function(){
        var playerid = this.id;
        $(".playerbtnon","#menuopdiv").removeClass("playerbtnon");
        $(this).addClass("playerbtnon");
        var pureid = playerid.slice(1);
        $(lanwarevent).trigger("selectplayer",[pureid,"op"]);
        //selectplayer(playerid,"op");
    });
}

function togglepopmenu (who, menutype) {
    var menuobj = $("#"+who+"cus"+menutype+"div");
    if (menuobj.hasClass("popmenuon")) {
        menuobj.removeClass("popmenuon");
    }
    else {
        var btnobj = $("#"+who+"cus"+menutype);
        menuobj.css("right",btnobj.position().right);
        menuobj.css("top",btnobj.position().top - menuobj.outerHeight(true));
        menuobj.addClass("popmenuon");
    }
}

function removeselectplayer (who) {
    $(".playerbtnon","#menu"+who+"div").removeClass("playerbtnon");
}

function customplayerselected (who) {
    if (!$("#" + who + "cusname").hasClass("playerbtnon")) {
        $("#" + who + "cusname").addClass("playerbtnon");
    }
}

