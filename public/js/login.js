// Login using Facebook Connect SDK
function DoLogin() {
  FB.login(function(response) {
    if (response.status == 'connected') {
        // User just authorized your app
        window.location.assign("http://localhost/48033-IoT-WPW-System/views/home.html")
    } else {}
  });
}

function loginAdmin () {
	var user = document.getElementById('usr');
	var pass = document.getElementById('pwd');

	var coruser = 'admin';
	var corpass = 'root';

	if(user.value == coruser) {
		if(pass.value == corpass) {
      window.location.assign("home");/*opens the target page while Id & password matches*/
		}
    else {
			alert("Error: Incorrect Password or Username");/*displays error message*/
		}
	}
  else {
		alert("Error: Incorrect Password or Username");/*displays error message*/
	}
}

// function DoAdminLogin(form) {
//   /*the following code checkes whether the entered userid and password are matching*/
//   if(form.id.value == "admin")
//   {
//     alert("yee");
//     if (form.pass.value == "root"){
//       window.location.assign("../views/home.html")/*opens the target page while Id & password matches*/
//     }
//     else {
//       alert("Error Password or Username")/*displays error message*/
//     }
//   }
// }
