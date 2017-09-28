// Login using Facebook Connect SDK
function DoLogin() {
  FB.login(function(response) {
    if (response.status == 'connected') {
        // User just authorized your app
        window.location.assign("http://localhost/48033-IoT-WPW-System/views/home.html")
    } else {}
  });
}
