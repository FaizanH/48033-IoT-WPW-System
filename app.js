
/**
 * Module dependencies.
 */
 

var express = require('express')
    , http = require('http')
    , app = express()
	, async = require('async')
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server) // new
    , events = require('events')
    , EventEmitter = require('events').EventEmitter
    , path = require('path')
    , logger = require('morgan')
    , errorhandler = require('errorhandler')
    , ip = require('ip')
    , bodyParser = require('body-parser')
    , util = require('util')
	, SensorTag = require('sensortag'); 	// sensortag library
     
var sys = require('sys');
const sqlite3 = require('sqlite3').verbose();  //database SQLite
var sensorMod = require("./libs/sensor.js");	//sensor functions
var spawn = require("child_process").spawn;


//==========================================================
var db;	//database object
var sensorTagDb = './db/sensorTagData.db'
var sqliteDB = require("./db/sqliteDB.js");
//==========================================================

// all environments
app.set('port', process.env.PORT || 4000); 
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
var twitterInterval = 120000;	//default 1 hour (3600000)
var currentTag = null;
//============================================================================================

//=========================Talking to browser=============================================
//Once client is connected
io.on('connection', function (socket) {
	var addedUser = false;
	console.log("connected");

	// when the client emits 'save data', this listens and executes
	socket.on('save data', function (data) {
		// check if edit boxes are empty
		if(data.uuid=="" || data.twitterInterval=="" || data.location=="" || data.eventName==""){
			io.emit('error', { message: "ERROR: Unable to save, some values are empty" });
		}else{
			currentTag=data.uuid;
			twitterInterval = data.twitterInterval;
			sqliteDB.insertEventData(db,data.eventName,data.location);	
			sqliteDB.readAllRows(db,"Event");
		}
		console.log("UUID:"+data.uuid);
		
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
	socket.on('stop sensors', function (interval) {
		if(currentTag==null){
			//Send error to browser as there was not tag set
			//setInterval(sendTwitts, interval);
			io.emit('error', { message: "ERROR: sensor tag cannot be stopped if it was never started" });
		}else{
			sensorMod.disableSensors(currentTag);
		}
		
	});
	
// GET PREDICTION MESSAGES
	function initHumidityMessage(){
		getHumidityMessage(function callbackMessage(result){
			io.emit('sendHumidityMessage', { message: result });
		});
	}
	
	function initLuxMessage(){
		getLuxMessage(function callbackMessage(result){
			io.emit('sendLuxMessage', { message: result });
		});
	}
	
	function initTempMessage(){
		getTempMessage(function callbackMessage(result){
			io.emit('sendTemperatureMessage', { message: result });
		});
	}
	
	function initPressureMessage(){
		getPressureMessage(function callbackMessage(result){
			io.emit('sendPressureMessage', { message: result });
		});
	}
	
// END OF PREDICTION MESSAGES
	
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
	
	function sendPressure(){
		sqliteDB.getPressure(db,1,function callback(err,results){
			if(err)
				throw err;
			else
				io.emit('sendPressure', { message: results });
		});
	}
	
	setInterval(sendLux, 10000);
	setInterval(sendTemperature, 10000);
	setInterval(sendPressure, 10000);
	
	//send predictions every minute
	setInterval(initLuxMessage,10000);
	setInterval(initHumidityMessage,10000);
	setInterval(initTempMessage,10000);
	setInterval(initPressureMessage,10000);
  
});

// Send current time to all connected clients
function sendTagData() {
    io.emit('sensor update', { message: "hello friend" });
}

// send a twitt
function sendTwitts(){
	console.log("sending twitt")

	getPressureMessage(function callbackMessage(message){
		spawn('python',["/www/weather_prediction_system/libs/twitter_plugin.py", message]);
	});
	
	getLuxMessage(function callbackMessage(message){
		spawn('python',["/www/weather_prediction_system/libs/twitter_plugin.py", message]);
	});
	
	getTempMessage(function callbackMessage(message){
		spawn('python',["/www/weather_prediction_system/libs/twitter_plugin.py", message]);
	});
	
	getHumidityMessage(function callbackMessage(message){
		spawn('python',["/www/weather_prediction_system/libs/twitter_plugin.py", message]);
	});
	
}

//============================= WORK OUT THE PREDICTION MESSAGES =========================================
function getLuxMessage(callbackMessage){
	sqliteDB.getTableContent(db,"Luxometer",1,function callback(err,result){
			if(err)
				throw err;
			else
				console.log(result[0].lux);
				if(result[0].lux<100){
					console.log("Event is indoors, low lighting");
					callbackMessage("Event is indoors, low lighting");
				}else if(result[0].lux>100 && result[0].lux<500){
					console.log("Event is indoors, away from direct sunlight");
					callbackMessage("Event is indoors, away from direct sunlight");
				}else{
					console.log("Event is outside and its sunny, wear sunglasses, hat and sunscreen");
					callbackMessage("Event is outside and its sunny, wear sunglasses, hat and sunscreen");
				}
		});
}
	
function getTempMessage(callbackMessage){
	sqliteDB.getTableContent(db,"Humidity",1,function callback(err,result){
			if(err)
				throw err;
			else
				console.log(result[0].temperature);
				if(result[0].temperature<16){
					console.log("It can get chilly, wear a jacket");
					callbackMessage("It can get chilly, wear a jacket");
				}else if(result[0].temperature >16 && result[0].temperature< 32){
					
					console.log("Temperature is nice and warm");
					callbackMessage("Temperature is nice and warm");
				}else{
					
					console.log("It is a hot day, bring water ");
					callbackMessage("It is a hot day, bring water");
				}
		});
}

function getHumidityMessage(callbackMessage){
	sqliteDB.getTableContent(db,"Humidity",1,function callback(err,result){
			if(err)
				throw err;
			else
				console.log(result[0].humidity);
				if(result[0].humidity<39){
					console.log("Low humidity, hardly noticiable");
					callbackMessage("Low humidity, hardly noticiable");
				}else if(result[0].humidity>39 && result[0].humidity<55){
					
					console.log("Event venue is humid, expect to sweat so drink more water");
					callbackMessage("Event venue is humid, expect to sweat so drink more water");
				}else{
					console.log("Event venue is very humid, physical exertion is not recomended");
					callbackMessage("Event venue is very humid, physical exertion is not recomended");
				}
		});
}


function getPressureMessage(callbackMessage){
	sqliteDB.getTableContent(db,"Barometer",1,function callback(err,result){
			if(err)
				throw err;
			else
				console.log(result[0].pressure);
				if(result[0].pressure<1000){
					console.log("Good chance of rain so protect your phones");
					callbackMessage("Good chance of rain so protect your phones");
				}else if(result[0].pressure> 1000 && result[0].pressure< 1010){
					
					console.log("Slight chance of rain ");
					callbackMessage("Slight chance of rain ");
				}else{
					console.log("Expect calm weather tonight");
					callbackMessage("Expect calm weather tonight");
				}
		});
}

//============================= WORK OUT THE PREDICTION MESSAGES END =========================================


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
			setInterval(sendTwitts, twitterInterval); //start twitter notifications
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
		io.emit('error', { message: "Sensor tag started" });
		currentTag = tag;
		
		tag.on('disconnect', function() {
			console.log('disconnected!');
			process.exit(0);
		});

		function connectAndSetUpMe() {          // attempt to connect to the tag
			console.log('connectAndSetUp');
			sensorMod.connect(tag,db,evenId);	//should have event id instead of 1
		
		}
		connectAndSetUpMe();
	}
}



