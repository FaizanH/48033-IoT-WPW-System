//var  = module.exports = {};
const sqlite3 = require('sqlite3').verbose();  //database SQLite
module.exports = exports;

/* Create Tables, if not already created */
exports.createTables = function(db){	
	db.serialize(function () {
		console.log("Creating Event table");
		db.run("CREATE TABLE IF NOT EXISTS Event (event_id INTEGER PRIMARY KEY, event_name TEXT NOT NULL, event_location TEXT NOT NULL)");
		
		console.log("Creating Humidity table");
		db.run("CREATE TABLE IF NOT EXISTS Humidity (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL,temperature REAL NOT NULL, humidity REAL NOT NULL,timestamp TEXT NOT NULL)");
		
		console.log("Creating Barometer table");
		db.run("CREATE TABLE IF NOT EXISTS Barometer (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL,pressure REAL NOT NULL, timestamp TEXT NOT NULL)");
		
		console.log("Creating Luxometer table");
		db.run("CREATE TABLE IF NOT EXISTS Luxometer (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL,lux REAL NOT NULL, timestamp TEXT NOT NULL)");
	});
}

/* Inserts Event data into db */
exports.insertEventData = function(db,event_name,event_location) {
    console.log("Inserting Event data");
	var stmt = db.prepare("INSERT INTO Event VALUES(NULL,?,?)");
	stmt.run(event_name,event_location); 
	stmt.finalize();
}

/* Inserts Humidity data into db */
exports.insertHumidityData = function(db,event_id,temperature,humidity,timestamp) {
    console.log("Inserting Humidity data");
	var stmt = db.prepare("INSERT INTO Humidity VALUES(NULL,?,?,?,?)");
	stmt.run(event_id,temperature,humidity,timestamp); 
	stmt.finalize();
}

/* Inserts Barometer data into db */
exports.insertBarometerData = function(db,event_id,pressure,timestamp) {
    console.log("Inserting Barometer data");
	var stmt = db.prepare("INSERT INTO Barometer VALUES(NULL,?,?,?)");
	stmt.run(event_id,event_id,pressure,timestamp); 
	stmt.finalize();
}

/* Inserts Luxometer data into db */
exports.insertLuxometerData = function(db,event_id,lux,timestamp) {
    console.log("Inserting Luxometer data");
	var stmt = db.prepare("INSERT INTO Luxometer VALUES(NULL,?,?,?)");
	stmt.run(event_id,temperature,lux,timestamp); 
	stmt.finalize();
}

/*Get all rows in the table */
exports.readAllRows = function(db,table) {
    console.log("readAllRows" + table);
    db.all("SELECT *, info FROM "+table, function(err, rows) {
        rows.forEach(function (row) {
            //console.log(row.id + ": " + row.info);
			console.log(row);
        });
    });
}

/* Get schama of the database */
exports.getSchema = function(db) {
	db.serialize(function () {
		db.all("select name from sqlite_master where type='table'", function (err, tables) {
			console.log(tables);
		});
	});
}
