exports.getdata = function (getcommand, response) {
    switch (getcommand) {
        case "playerlist":
            //require('./server.loadplayer.js').loadplayer(response);
            require('./server.load.js').loadplayer(response);
            break;
        case "unitlist":
            require('./server.load.js').loadunit(response);
            break;
        case "magiclist":
//console.log("magiclist");
            require('./server.load.js').loadmagic(response);
            break;
        case "skilllist":
            require('./server.load.js').loadskill(response);
            break;
        case "itemlist":
            require('./server.load.js').loaditem(response);
            break;
    }
};
