var moment = require('moment');
var appid = require('./../.env').appid;
function statusChangeCallback(response, display) {
    console.log('statusChangeCallback');
    console.log(response);
    getinfo(response, display);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }

  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  exports.checkLoginState = function(display) {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response, display);
    });
  };


  function getinfo(response, display){
    var url = "https://graph.facebook.com/v2.6/me?fields=id%2Cname%2Cbirthday%2Cemail%2Cpicture%2Cfirst_name%2Clast_name&access_token=" + response.authResponse.accessToken;
    var user = $.getJSON(url).then(function(response) {
        display(response);
    });
  }
  window.fbAsyncInit = function() {
  FB.init({
    appId      : appid,
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.6' // use graph api version 2.5
  });
}
