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
      humidityHtml = '<p>'+weather.humidity+' %'+'</p>';
      pressureHtml = '<p>'+weather.pressure+' '+weather.units.pressure+'</p>';
      locHtml = '<p>'+weather.city+', '+weather.region+'</p>';
      $("#temperature").html(tempHtml);
      $("#vis").html(visHtml);
      $("#humidity").html(humidityHtml);
      $("#pressure").html(pressureHtml);
      $("#loc").html(locHtml);
    },
    error: function(error) {
      $("#temperature").html('<p>'+error+'</p>');
      $("#vis").html('<p>'+error+'</p>');
      $("#humidity").html('<p>'+error+'</p>');
      $("#pressure").html('<p>'+error+'</p>');
    }
  });
});
