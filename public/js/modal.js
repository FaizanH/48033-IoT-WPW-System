// Get the modal
var modal1 = document.getElementById('modalTemp');
var modal2 = document.getElementById('modalSolar');
var modal3 = document.getElementById('modalRain');
var modal4 = document.getElementById('modalWind');

// Get the button that opens the modal
var btn1 = document.getElementById("btnTemp");
var btn2 = document.getElementById("btnSolar");
var btn3 = document.getElementById("btnRain");
var btn4 = document.getElementById("btnWind");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
span.onclick = function() {
    modal1.style.display = "none";
	modal2.style.display = "none";
	modal3.style.display = "none";
	modal4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
	else if (event.target == modal2) {
        modal2.style.display = "none";
    }
	else if (event.target == modal3) {
        modal3.style.display = "none";
    }
	else if (event.target == modal4) {
        modal4.style.display = "none";
    }
}