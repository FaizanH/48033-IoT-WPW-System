/**
 * Description:
 * This script is the Node.js server for WSNdemo.  It creates a server and ...
 */

/**
 * Module dependencies.
 */


 //https://github.com/skylarstein/pi-weather-station

var express = require('express')
    , http = require('http')
    , app = express()
	, async = require('async');
    , server = require('http').createServer(app)
    , io = require('socket.io')(server) // new
    , events = require('events')
    , EventEmitter = require('events').EventEmitter
    , path = require('path')
    //, favicon = require('serve-favicon')
    , logger = require('morgan')
    , errorhandler = require('errorhandler')
    //, cookieParser = require('cookie-parser')
    , ip = require('ip')
    , bodyParser = require('body-parser')
    , util = require('util')
	, SensorTag = require('sensortag'); 	// sensortag library

var sys = require('sys');
const sqlite3 = require('sqlite3').verbose();  //database SQLite


//==========================================================
var db;	//database object
var sensorTagDb = './db/sensorTagData.db'
//==========================================================

//var exec = require('child_process').exec;
//var child;

// all environments
app.set('port', process.env.PORT || 3000);
// Using the .html extension instead of
// having to name the views as *.ejs
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname, '/public/css')));
app.use('/js',express.static(path.join(__dirname, '/public/js')));
app.use('/vendor',express.static(path.join(__dirname, '/vendor')));

// uncomment after placing your favicon in /public
//app.use(favicon('favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html', { title: 'Index' });
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/views/home.html', { title: 'Home' });
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/login.html', { title: 'Login' });
});

app.get('/error', function(req, res) {
    res.sendFile(__dirname + '/views/404.html', { title: 'Error' });
});


// test for OS
var myOS = process.platform;
console.log('This platform is ' + myOS);
// end of test for OS

//======================= Init Database =======================
var sqliteDB = require("./db/sqliteDB.js");

//Open DB
db = new sqlite3.Database(sensorTagDb, (err) => {
		if (err) {
			return console.error(err.message);
		}
		sqliteDB.createTables(db);
});

//sqliteDB.getSchema(db);

/*db.serialize(function() {
	sqliteDB.insertRows(db,20,25);
	sqliteDB.readAllRows(db);
});*/


//console.log("closeDb");
//db.close();
//==========================================================

// some delay here to start the server listen after serial port open
//var serverIP = 'localhost';
var serverIP = ip.address() ;
setTimeout(function(){
    server.listen(app.get('port'), serverIP, function(){
        console.log('Express server listening on:', serverIP, ':', app.get('port'));
    });
}, 2000);

var user_count = 0;
var timerID = "";

// socket.io handlers, we are here if socket is on
// new version
//check out: https://socket.io/demos/chat/
io.on('connection', function(socket){
    user_count++;
    socket.emit('users', { number: user_count });
    socket.broadcast.emit('users', { number: user_count });
    console.log("user_count: ", user_count);
    console.log("socket is connected");

    socket.on('disconnect', function () {
        user_count--;
        socket.broadcast.emit('users', { number: user_count });
        console.log(user_count);
    });

    // Send time every 2 seconds
    setInterval(function() {
        var now = new Date();
        socket.emit('timer_tick', { string: getTimeStampLog()});
    }, 1000);


});

// =================================================================================
var USE_READ = true;

SensorTag.discoverByUuid("247189e88004", function(tag) {

        SensorTag.discover(function(tag) {
            console.log('connected!');
            console.log('discovered: ' + tag.uuid + ', type = ' + tag.type);
            //socket.emit('discover', { 'message': 'connected' });
        });
});
