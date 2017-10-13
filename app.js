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
	, async = require('async')
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server) // new
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
var sensorMod = require("./libs/sensor.js");	//sensor functions


//==========================================================
var db;	//database object
var sensorTagDb = './db/sensorTagData.db'
var sqliteDB = require("./db/sqliteDB.js");
//==========================================================

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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//=========================User Setting Variables=============================================
var tagUuid = "247189e88004";		//default UUID
var eventId = 1;
var twitterInterval = 60;	//default minutes
var currentTag = null;
//============================================================================================

//=========================Talking to browser=============================================
//Once client is connected
io.on('connection', function (socket) {
	var addedUser = false;
	console.log("connected");

	// when the client emits 'save data', this listens and executes
	socket.on('save data', function (data) {
		// we tell the client to execute 'new message'
		console.log("MESSAGE:"+data.uuid);
		//TODO: save data to database and set variables
	});
  
  
	// Client wants to start Sensors
	socket.on('start sensors', function () {
		if(eventId==null){
			//Send error to browser as event wasn't set
			io.emit('error', { message: "ERROR: Event information not set" });
		}else{
			currentTag=tagUuid;
			startSensors(eventId,currentTag);
		}
	});
  
    // Client wants to stop Sensors
	socket.on('stop sensors', function () {
		if(currentTag==null){
			//Send error to browser as there was not tag set
			io.emit('error', { message: "ERROR: sensors were not started" });
		}else{
			sensorMod.disableSensors(tag);
		}
		
	});
	
	
	function sendTemperature(){
		sqliteDB.getHumidityTemp(db,1,function callback(err,results){
			if(err)
				throw err;
			else
				io.emit('sendTemperature', { message: results });
		});
	}
	
	function sendLux(){
		sqliteDB.getLux(db,1,function callback(err,results){
			if(err)
				throw err;
			else
				io.emit('sendLux', { message: results });
		});
	}
	
	setInterval(sendLux, 10000);
	setInterval(sendTemperature, 10000);

  
});

// Send current time to all connected clients
function sendTagData() {
    io.emit('sensor update', { message: "hello friend" });
}

// Send current time every 10 secs
//setInterval(sendTagData, 10000);

//=============================================================================


//link views
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

app.get('/management', function(req, res) {
    res.sendFile(__dirname + '/views/management.html', { title: 'Database Management' });
});


// test for OS
var myOS = process.platform;
console.log('This platform is ' + myOS);
// end of test for OS

//======================= Init Database =======================

//Open DB
db = new sqlite3.Database(sensorTagDb, (err) => {
		if (err) {
			return console.error(err.message);
		}
		sqliteDB.createTables(db,function callback(){
			console.log("DB done initializing");
		});
	
	});

//callback function once db is done
function db_done(){
	console.log("DB done initializing");
	sqliteDB.getTableContent(db,"Luxometer",1,function callback(err,results){
		if(err)
			throw err;
		else
			console.log(results);
	});
}

//

//==========================================================

// some delay here to start the server listen after serial port open
//var serverIP = 'localhost';
var serverIP = ip.address() ;
setTimeout(function(){
    server.listen(app.get('port'), serverIP, function(){
        console.log('Express server listening on:', serverIP, ':', app.get('port'));
    });
}, 2000);


// =================================================================================
// RUN SENSORS

//start sensors
function startSensors(evenId,tagUuid){
	SensorTag.discoverByUuid(tagUuid,onDiscover);

	function onDiscover(tag)  {  
		// when you disconnect from a tag, exit the program:
		currentTag = tag;
		
		tag.on('disconnect', function() {
			console.log('disconnected!');
			process.exit(0);
		});

		function connectAndSetUpMe() {          // attempt to connect to the tag
			console.log('connectAndSetUp');
			sensorMod.connect(tag,db,evenId);	//should have event id instead of 1
			
			//Stop simulations
			/*setTimeout(function () {
				console.log('timeout started')
				sensorMod.disableSensors(tag)
				sqliteDB.readAllRows(db,"Luxometer");
				sqliteDB.readAllRows(db,"Barometer");
				sqliteDB.readAllRows(db,"Humidity");
			}, 10000)*/
		
		}
		connectAndSetUpMe();
	}
}


