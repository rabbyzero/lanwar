exports.loaderplayer = function (response) {
    var dbconfig = require('config').dbconfig;
    var mysql = require('mysql');
    //var resultjson = new Object;
    var playerlist = new Array(0);
    
    var connoption = {
        host: dbconfig.host,
        port: dbconfig.port,
        user: dbconfig.dbuser,
        password: dbconfig.passwd,
        database: dbconfig.database,
    };
    
    var client = mysql.createClient(connoption);
    
    var querycmd = "select * from player_view";
    
    client.query(querycmd, function selectCb(err, results, fields){
        if(err) {
            throw err;
        }
        client.end(processresult(results,fields));
    });
    
    var processresult = function (results, fields) {
        for (var i in results) {
            playerlist.push({idplayer: results[i].idplayer, player_name: results[i].player_name, level: results[i].lv, exp: results[i].exp, maxexp: results[i].maxexp, class_id: results[i].class_id, class_name: results[i].leadercategory_name,
                            bell: {shrine: results[i].shrine, empire: results[i].empire, demon: results[i].demon, barbarian: results[i].barbarian},
                            round: results[i].shrine + results[i].empire + results[i].demon + results[i].barbarian,
                            active: results[i].active,
                            league_id: results[i].idleague,
                            league_name: results[i].league_name});
        }
        response.json(playerlist);
    };
};

/*
$link = mysql_connect('50.56.31.35','root','');
//echo 'db connection ok';
mysql_select_db('lanwar',$link);

//utf8
mysql_set_charset('utf8',$link);

//$type = $_GET["type"];
$id = $_GET["id"];

$query="select * from player_view where idplayer=".$id;
$result = mysql_query($query);

class player{
        public $idplayer=-1;
        public $player_name="";
        public $bell;
        public $level=-1;
        public $round=-1;
        public $exp=0;
        public $maxexp=0;
        public $class_id=-1;
        public $class_name="";
}

$playerobj=new player;

while ($line = mysql_fetch_array($result,MYSQL_BOTH))
{
        $playerobj->idplayer =  $line["idplayer"];
        $playerobj->player_name =  $line["player_name"];
        $playerobj->level =  $line["lv"];
        $playerobj->exp =  $line["exp"];
        $playerobj->maxexp =  $line["maxexp"];
        $playerobj->class_id =  $line["class_id"];
        $playerobj->class_name =  $line["leadercategory_name"];

        //$i=0;
        $playerobj->bell->shrine=$line["shrine"];
        $playerobj->bell->empire=$line["empire"];
        $playerobj->bell->demon=$line["demon"];
        $playerobj->bell->barbarian=$line["barbarian"];

        $playerobj->round=$playerobj->bell->shrine + $playerobj->bell->empire + $playerobj->bell->demon + $playerobj->bell->barbarian;

}
echo json_encode($playerobj);


mysql_free_result($result);
mysql_close($link);
 */