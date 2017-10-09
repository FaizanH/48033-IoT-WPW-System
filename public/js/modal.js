// Get the modal
var modal1 = document.getElementById('modalTemp');
$(function() {

  // We use an inline data source in the example, usually data would
  // be fetched from a server

  var data = [],
    totalPoints = 300;

  function getRandomData() {

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]])
    }

    return res;
  }

  // Set up the control widget

  var updateInterval = 30;

  var plot = $.plot("#graphTemp", [ getRandomData() ], {
    series: {
      shadowSize: 0	// Drawing is faster without shadows
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    }
  });

  function update() {

    plot.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()

    plot.draw();
    setTimeout(update, updateInterval);
  }

  update();

  // Add the Flot version string to the footer

});
var modal2 = document.getElementById('modalSolar');
$(function() {

  // We use an inline data source in the example, usually data would
  // be fetched from a server

  var data = [],
    totalPoints = 300;

  function getRandomData() {

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]])
    }

    return res;
  }

  // Set up the control widget

  var updateInterval = 30;

  var plot = $.plot("#graphSolar", [ getRandomData() ], {
    series: {
      shadowSize: 0	// Drawing is faster without shadows
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    }
  });

  function update() {

    plot.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()

    plot.draw();
    setTimeout(update, updateInterval);
  }

  update();

  // Add the Flot version string to the footer

});
var modal3 = document.getElementById('modalRain');
$(function() {

  // We use an inline data source in the example, usually data would
  // be fetched from a server

  var data = [],
    totalPoints = 300;

  function getRandomData() {

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]])
    }

    return res;
  }

  // Set up the control widget

  var updateInterval = 30;

  var plot = $.plot("#graphRain", [ getRandomData() ], {
    series: {
      shadowSize: 0	// Drawing is faster without shadows
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    }
  });

  function update() {

    plot.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()

    plot.draw();
    setTimeout(update, updateInterval);
  }

  update();

  // Add the Flot version string to the footer

});
var modal4 = document.getElementById('modalWind');
$(function() {

  // We use an inline data source in the example, usually data would
  // be fetched from a server

  var data = [],
    totalPoints = 300;

  function getRandomData() {

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]])
    }

    return res;
  }

  // Set up the control widget

  var updateInterval = 30;

  var plot = $.plot("#graphWind", [ getRandomData() ], {
    series: {
      shadowSize: 0	// Drawing is faster without shadows
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    }
  });

  function update() {

    plot.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()

    plot.draw();
    setTimeout(update, updateInterval);
  }

  update();

  // Add the Flot version string to the footer

});

var btn1 = document.getElementById("btnTemp");
var btn2 = document.getElementById("btnSolar");
var btn3 = document.getElementById("btnRain");
var btn4 = document.getElementById("btnWind");

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
