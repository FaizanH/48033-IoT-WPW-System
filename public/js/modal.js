// Get the modal
var modal1 = document.getElementById('modalTemp');
$(function() {
	
	
	// Initialize variables
	var $window = $(window);
	var socket = io();  
	
	var bufferTemp =  [ [0,0] ];
    var minBufferSize = 50;
    var maxBufferSize = 300;
    var clientInterval = null;
    var rebuffer = true;
    var serverUpdates = 1;
    var clientUpdates = 30;
	
	//update graph 
    function repaintTempGraph() {
			//console.log(buffer);
             repaintTempGraph.plot = $.plot("#graphTemp",bufferTemp, {
                series: {
                    shadowSize: 0	// Drawing is faster without shadows
                },
               
                xaxis: {
                    show: false
                }
            });
    }
	
	var countTemp=0;
	/*
     * Receiving data from the server
     */
    socket.on('sendTemperature', function (data) {
        var recievedData = [];
			for(var i=0; i<data.message.length; i++){

				countTemp=countTemp+1;
				recievedData.push([countTemp,data.message[i].temperature]);
			}
			//shift data so that it doesn't stack
			bufferTemp.shift();
            bufferTemp.push(recievedData);
    });

	//Client side, wake up an _independent_ amount of time
    //from the server and try to repaint.  This gives us a smooth
    //animation and nothing jerky.  You really don't want to put
    //it within the socket call.  Let that "buffer" the data
    //instead.

    clientInterval = setInterval(function () {
        repaintTempGraph();
    },clientUpdates);
	
	socket.on('sendTemperatureMessage',function (prediction) {
		document.getElementById("tempAdvice").innerHTML = prediction.message;
	});
	
});




var modal2 = document.getElementById('modalSolar');
$(function() {
	
	// Initialize variables
	var $window = $(window);
	var socket = io();  
	
	var bufferLux =  [ [0,0] ];
    var minBufferSize = 50;
    var maxBufferSize = 300;
    var clientInterval = null;
    var rebuffer = true;
    var serverUpdates = 1;
    var clientUpdates = 30;
	
	//update graph 
    function repaintLuxGraph() {
			//console.log(buffer);
             repaintLuxGraph.plot = $.plot("#graphLux",bufferLux, {
                series: {
                    shadowSize: 0	// Drawing is faster without shadows
                },
               
                xaxis: {
                    show: false
                }
            });
    }
	
	var countLux=0;
	/*
     * Receiving data from the server
     */
    socket.on('sendLux', function (data) {
        var recievedData = [];
			for(var i=0; i<data.message.length; i++){

				countLux=countLux+1;
				recievedData.push([countLux,data.message[i].lux]);
			}
			//shift data so that it doesn't stack
			bufferLux.shift();
            bufferLux.push(recievedData);
    });

	//Client side, wake up an _independent_ amount of time
    //from the server and try to repaint.  This gives us a smooth
    //animation and nothing jerky.  You really don't want to put
    //it within the socket call.  Let that "buffer" the data
    //instead.

    clientInterval = setInterval(function () {
        repaintLuxGraph();
    },clientUpdates);
	
	socket.on('sendLuxMessage',function (prediction) {
		document.getElementById("solarAdvice").innerHTML = prediction.message;
	});
	
});


var modal3 = document.getElementById('modalHumidity');
$(function() {
// Initialize variables
	var $window = $(window);
	var socket = io();  
	
	var bufferHumidity =  [ [0,0] ];
    var minBufferSize = 50;
    var maxBufferSize = 300;
    var clientInterval = null;
    var rebuffer = true;
    var serverUpdates = 1;
    var clientUpdates = 30;
	
	//update graph 
    function repaintHumidityGraph() {
			//console.log(buffer);
             repaintHumidityGraph.plot = $.plot("#graphHumidity",bufferHumidity, {
                series: {
                    shadowSize: 0	// Drawing is faster without shadows
                },
               
                xaxis: {
                    show: false
                }
            });
    }
	
	var countHumidity=0;
	/*
     * Receiving data from the server
     */
    socket.on('sendTemperature', function (data) {
        var recievedData = [];
			for(var i=0; i<data.message.length; i++){

				countHumidity=countHumidity+1;
				recievedData.push([countHumidity,data.message[i].humidity]);
			}
			//shift data so that it doesn't stack
			bufferHumidity.shift();
            bufferHumidity.push(recievedData);
    });

	//Client side, wake up an _independent_ amount of time
    //from the server and try to repaint.  This gives us a smooth
    //animation and nothing jerky.  You really don't want to put
    //it within the socket call.  Let that "buffer" the data
    //instead.

    clientInterval = setInterval(function () {
        repaintHumidityGraph();
    },clientUpdates);

	
	socket.on('sendHumidityMessage',function (prediction) {
			document.getElementById("humidAdvice").innerHTML = prediction.message;
	});

});




var modal4 = document.getElementById('modalPressure');
$(function() {

  // Initialize variables
	var $window = $(window);
	var socket = io();  
	
	var bufferPressure =  [ [0,0] ];
    var minBufferSize = 50;
    var maxBufferSize = 300;
    var clientInterval = null;
    var rebuffer = true;
    var serverUpdates = 1;
    var clientUpdates = 30;
	
	//update graph 
    function repaintPressureGraph() {
			//console.log(buffer);
             repaintPressureGraph.plot = $.plot("#graphPressure",bufferPressure, {
                series: {
                    shadowSize: 0	// Drawing is faster without shadows
                },
               
                xaxis: {
                    show: false
                }
            });
    }
	
	var countPressure=0;
	/*
     * Receiving data from the server
     */
    socket.on('sendPressure', function (data) {
        var recievedData = [];
			for(var i=0; i<data.message.length; i++){

				countPressure=countPressure+1;
				recievedData.push([countPressure,data.message[i].pressure]);
			}
			//shift data so that it doesn't stack
			bufferPressure.shift();
            bufferPressure.push(recievedData);
    });

	//Client side, wake up an _independent_ amount of time
    //from the server and try to repaint.  This gives us a smooth
    //animation and nothing jerky.  You really don't want to put
    //it within the socket call.  Let that "buffer" the data
    //instead.

    clientInterval = setInterval(function () {
        repaintPressureGraph();
    },clientUpdates);
	
	
	socket.on('sendPressureMessage',function (prediction) {
		document.getElementById("pressureAdvice").innerHTML = prediction.message;
	});

});

var btn1 = document.getElementById("btnTemp");
var btn2 = document.getElementById("btnSolar");
var btn3 = document.getElementById("btnHumidity");
var btn4 = document.getElementById("btnPressure");

// Get the <span> element that closes the modal
var span0 = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];
var span2 = document.getElementsByClassName("close")[2];
var span3 = document.getElementsByClassName("close")[3];

// When the user clicks on the button, open the modal
btn1.onclick = function() {
    modal1.style.display = "block";
}
// When the user clicks on the button, open the modal
btn2.onclick = function() {
    modal2.style.display = "block";
}
// When the user clicks on the button, open the modal
btn3.onclick = function() {
    modal3.style.display = "block";
}
// When the user clicks on the button, open the modal
btn4.onclick = function() {
    modal4.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span0.onclick = function() {
  modal1.style.display = "none";
}
span1.onclick = function() {
  modal2.style.display = "none";
}
span2.onclick = function() {
  modal3.style.display = "none";
}
span3.onclick = function() {
  modal4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1)
    modal1.style.display = "none";
	else if (event.target == modal2)
    modal2.style.display = "none";
	else if (event.target == modal3)
    modal3.style.display = "none";
	else if (event.target == modal4)
    modal4.style.display = "none";
}
