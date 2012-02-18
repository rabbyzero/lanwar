exports.getdata = function (getcommand, response) {
    switch (getcommand) {
        case "playerlist":
            require('./server.loadplayer.js').loaderplayer(response);
            break;
    }
};