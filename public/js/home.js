<!-- Toggle button to close the sidebar navigation -->
document.getElementById("myBtn").addEventListener("click", toggleNav);
function toggleNav(x){
    navSize = document.getElementById("Sidenav").offsetWidth;
    if (navSize == 0) {
      return openNav(x);
    }
    return closeNav(x);
}
/* Set the width of the side navigation to 250px */
function openNav(x) {
    document.getElementById("Sidenav").style.width = "100%";
    x.classList.toggle("change");
}
/* Set the width of the side navigation to 0 */
function closeNav(x) {
    document.getElementById("Sidenav").style.width = "0";
    x.classList.toggle("change");
}
// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  $.simpleWeather({
    location: 'Sydney, Australia',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      tempHtml = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';
      visHtml = '<p>Visibility: '+weather.visibility+'</p>';
      rainHtml = '<p>'+weather.currently+'</p>';
      windHtml = '<p>Chill: '+weather.wind.chill+'</br>'+'Speed: '+weather.wind.speed+'</br>'+'Direction: '+weather.wind.direction+'</p>';
      locHtml = '<p>'+weather.city+', '+weather.region+'</p>';
      $("#weather").html(tempHtml);
      $("#vis").html(visHtml);
      $("#rain").html(rainHtml);
      $("#wind").html(windHtml);
      $("#loc").html(locHtml);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
      $("#vis").html('<p>'+error+'</p>');
      $("#rain").html('<p>'+error+'</p>');
      $("#wind").html('<p>'+error+'</p>');
    }
  });
});
