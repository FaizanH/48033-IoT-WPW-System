//Module that will control sensors

var sqliteDB = require("../db/sqliteDB.js");
var SensorTag = require('sensortag');
module.exports = exports;
var tag = null;
var db = null;
var event_id=null;

exports.connect = function(recievedTag,database,eventId){
	db = database
	event_id = eventId;
	tag = recievedTag
	tag.connectAndSetUp(enableSensors); 
}

//Enable all sensors
function enableSensors() {        // attempt to enable the IR Temperature sensor
	console.log('Enabling Sensors');
	tag.enableHumidity(notifyMeTemp);
	tag.enableBarometricPressure(notifyMeBarr);
	tag.enableLuxometer(notifyMeLux);
}

	//Start Barrometer notifications
function notifyMeLux() {
	console.log('Start Lux notification');
	tag.notifyLuxometer(listenForLux);      // start the accelerometer listener
	tag.notifySimpleKey(listenForButton);       // start the button listener
}

//Listen for Luxomter updates
function listenForLux() {
	tag.on('luxometerChange', function(lux) {
		console.log('\tlux = %d', lux.toFixed(1));
		sqliteDB.insertLuxometerData(db,event_id,lux.toFixed(1),Number(new Date()));
   });
}

//Start Barrometer notifications
function notifyMeBarr() {
	console.log('Start Barrometer notification');
	tag.notifyBarometricPressure(listenForBarr);      // start the accelerometer listener
	tag.notifySimpleKey(listenForButton);       // start the button listener
}

//Listen for Barrometer updates
function listenForBarr() {
	tag.on('barometricPressureChange', function(pressure) {
	 console.log('\tpressure = %d mBar', pressure.toFixed(1));
	 sqliteDB.insertBarometerData(db,event_id,pressure.toFixed(1),Number(new Date()));
   });
}

//Start for Humidity notifications
function notifyMeTemp() {
	console.log('Start Humidity notification');
	tag.notifyHumidity(listenForTempReading);      // start the accelerometer listener
	tag.notifySimpleKey(listenForButton);       // start the button listener
}

// Listen for Humidity updates
function listenForTempReading() {
	tag.on('humidityChange', function(temperature, humidity) {
		console.log(tag.id);
	 console.log('\tTemperature Temp = %d deg. C', temperature.toFixed(1));
	 console.log('\tHumidity Temp = %d deg. C', humidity.toFixed(1));
	 sqliteDB.insertHumidityData(db,event_id,temperature.toFixed(1),humidity.toFixed(1),Number(new Date()));
   });
}

// when you get a button change, print it out:
function listenForButton() {
	tag.on('simpleKeyChange', function(left, right) {
		if (left) {
			console.log('left: ' + left);
		}
		if (right) {
			console.log('right: ' + right);
		}
		// if both buttons are pressed, disconnect:
		if (left && right) {
			tag.disconnect();
		}
   });
}

//Disable all sensors
//================================================================================================
exports.disableSensors = function(sensorTag){
	sensorTag.disableLuxometer(disable_lux);
	sensorTag.disableHumidity(disable_humidity);
	sensorTag.disableBarometricPressure(disable_barrometer);
}

//Disable all sensors
function disable_lux(){
	console.log("Lux disabled");
}

function disable_humidity(){
	console.log("Hunidity disabled");
}

function disable_barrometer(){
	console.log("Barrometer disabled");
}
//================================================================================================
