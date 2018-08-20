const idApp = '548038762266220'

 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }

 function statusChangeCallback(response) {
   if (response.status === 'connected') {
    localStorage.setItem("fbToken", response.authResponse.accessToken)
   } else {
     document.getElementById('status').innerHTML = 'Please log ' +
       'into this app.';
   }
 }

 window.fbAsyncInit = function() {
   FB.init({
     appId      : idApp,
     cookie     : true,  // enable cookies to allow the server to access 
                         // the session
     xfbml      : true,  // parse social plugins on this page
     version    : 'v2.8' // use graph api version 2.8
   });

   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });

 };

 (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=548038762266220&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'))

 
 function testAPI() {
   FB.api('/me', function(response) {
     console.log('Successful login for: ' + response.name);
     document.getElementById('status').innerHTML =
       'Thanks for logging in, ' + response.name + '!';
   });
 }



  
