var loadwaitlist = new Array(0);
var loadinglist = new Array(0);

function loaddata() {
    tryload("playerlist");
    tryload("unitlist");
    tryload("magiclist");
    //tryload("skilllist");
    //tryload("itemlist");
}

function tryload(loadcontent) {
    //var ajaxurl = "/getdata/" + loadcontent;
    //ajaxurl ="file:///E:/node.js/lanwar/test.json";
    switch (loadcontent) {
        case "playerlist":
            //$(lanwarevent).trigger("playerloaded");
            liststatus.player = "loading";break;
        case "unitlist":
            liststatus.unit = "loading";break;
        case "magiclist":
            liststatus.magic = "loading";break;
        case "skilllist":
            liststatus.skill = "loading";break;
        case "itemlist":
            liststatus.item = "loading";break;
    }
    $.getJSON(ajaxurl,function(data){
        switch (loadcontent) {
            case "playerlist":
                playerlist = data;
                liststatus.player = "listready";
                $(lanwarevent).trigger("playerloaded");
                break;
            case "unitlist":
                unitlist = data;
                liststatus.unit = "listready";
                $(lanwarevent).trigger("unitloaded");
                break;
            case "magiclist":
                magiclist = data;
                liststatus.magic = "listready";
                $(lanwarevent).trigger("magicloaded");
                break;
            case "skilllist":
                skillist = data;
                liststatus.skill = "listready";
                break;
            case "itemlist":
                itemlist = data;
                liststatus.item = "listready";
                break;
        }
    });
}
