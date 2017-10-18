function connectUserManagement(){
	// Initialize variables
	var $window = $(window);
	var socket = io();  
   
	var btnSave = document.getElementById("btnSave");
	var btnStartSensor = document.getElementById("btnStartSensor");
	var btnStopSensor = document.getElementById("btnStopSensor");
  
	//repace the values with input from user
	btnSave.onclick = function(){
		 socket.emit('save data', {
			uuid: document.getElementById('uuid').value,
			twitterInterval: document.getElementById('twitterInt').value,
			location: document.getElementById('event_location').value,
			eventName: document.getElementById('event_name').value
		 });
	 }
	 
	 btnStartSensor.onclick = function(){
		 socket.emit('start sensors',"start");
	 }
	 
	 btnStopSensor.onclick = function(){
		 socket.emit('stop sensors',"stop");
	 }
	
	// Whenever the server emits 'sensor update'
	socket.on('sensor update', function (data) {
		alert(data.message);
	});
	
		// Whenever the server emits 'error'
	socket.on('error', function (data) {
		alert(data.message);
	});
}