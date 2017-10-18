//var  = module.exports = {};
const sqlite3 = require('sqlite3').verbose();  //database SQLite
module.exports = exports;

/* Create Tables, if not already created */
exports.createTables = function(db,callback){	
	db.serialize(function () {
		console.log("Creating Event table");
		db.run("CREATE TABLE IF NOT EXISTS Event (event_id INTEGER PRIMARY KEY, event_name TEXT NOT NULL UNIQUE, event_location TEXT NOT NULL)");
		
		console.log("Creating Humidity table");
		db.run("CREATE TABLE IF NOT EXISTS Humidity (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL,temperature REAL NOT NULL, humidity REAL NOT NULL,timestamp TEXT NOT NULL)");
		
		console.log("Creating Barometer table");
		db.run("CREATE TABLE IF NOT EXISTS Barometer (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL,pressure REAL NOT NULL, timestamp TEXT NOT NULL)");
		
		console.log("Creating Luxometer table");
		db.run("CREATE TABLE IF NOT EXISTS Luxometer (id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL,lux REAL NOT NULL, timestamp TEXT NOT NULL)");
		
		callback();
	});
}

/* Inserts Event data into db */
exports.insertEventData = function(db,event_name,event_location) {
	var stmt = db.prepare("INSERT INTO Event VALUES(NULL,?,?)");
	
	stmt.run(event_name,event_location, function(error) {
		console.log("Caught an error : ", error);
	});  
	stmt.finalize();
}

/* Inserts Humidity data into db */
exports.insertHumidityData = function(db,event_id,temperature,humidity,timestamp) {
    //console.log("Inserting Humidity data");
	var stmt = db.prepare("INSERT INTO Humidity VALUES(NULL,?,?,?,?)");
	stmt.run(event_id,temperature,humidity,timestamp); 
	stmt.finalize();
}

/* Inserts Barometer data into db */
exports.insertBarometerData = function(db,event_id,pressure,timestamp) {
    //console.log("Inserting Barometer data");
	var stmt = db.prepare("INSERT INTO Barometer VALUES(NULL,?,?,?)");
	stmt.run(event_id,pressure,timestamp); 
	stmt.finalize();
}

/* Inserts Luxometer data into db */
exports.insertLuxometerData = function(db,event_id,lux,timestamp) {
    //console.log("Inserting Luxometer data");
	var stmt = db.prepare("INSERT INTO Luxometer VALUES(NULL,?,?,?)");
	stmt.run(event_id,lux,timestamp); 
	stmt.finalize();
}

/*TEST */
exports.getHumidityTemp = function(db,eventId,callback) {
	let sql = "SELECT timestamp,temperature,humidity FROM Humidity WHERE event_id=? and timestamp >?";
	//get last 5 minutes
	var d1 = new Date (),
    d2 = new Date ( d1 );
	d2.setMinutes ( d1.getMinutes() - 1 );

    db.all(sql,[eventId,d2],(err, rows) => {
		callback(err,rows);
	});
}

exports.getPressure = function(db,eventId,callback) {
	let sql = "SELECT timestamp,pressure FROM Barometer WHERE event_id=? and timestamp >?";
	//get last 5 minutes
	var d1 = new Date (),
    d2 = new Date ( d1 );
	d2.setMinutes ( d1.getMinutes() - 1 );

    db.all(sql,[eventId,d2],(err, rows) => {
		callback(err,rows);
	});
}
	

exports.getLux = function(db,eventId,callback) {
	let sql = "SELECT timestamp,lux FROM Luxometer WHERE event_id=? and timestamp >?";
	//get last 5 minutes
	var d1 = new Date (),
    d2 = new Date ( d1 );
	d2.setMinutes ( d1.getMinutes() - 1 );

    db.all(sql,[eventId,d2],(err, rows) => {
		callback(err,rows);
	});
}


/*Get data from specific tables */
exports.getTableContent = function(db,table, eventId,callback) {
    console.log("table: " + table);
	//let sql = "SELECT * FROM "+table +" WHERE event_id=? and timestamp BETWEEN ? AND ?";
	let sql = "SELECT * FROM "+table +" WHERE event_id=? ORDER BY ID DESC LIMIT 1";
    db.all(sql,[eventId],(err, rows) => {
		callback(err,rows);
	});
}

/*Get all rows in the table */
exports.readAllRows = function(db,table) {
    console.log("readAllRows " + table);
    db.all("SELECT * FROM "+table, function(err, rows) {
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
