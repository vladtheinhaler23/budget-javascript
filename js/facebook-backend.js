var moment = require('moment');
var appid = require('./../.env').appid;
function statusChangeCallback(response, display, displaypic) {
    console.log('statusChangeCallback');
    console.log(response);
    getinfo(response, display, displaypic);
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
  exports.checkLoginState = function(display, displaypic) {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response, display, displaypic);
    });
  };
  function getpic(response, accessToken, displaypic){
    console.log(response.id);
    FB.api(
      '/' + response.id + '/picture',
      'GET',
      {"type":"large"},
      function(response) {
        displaypic(response);
      }
  );
  }

  function getinfo(response, display, displaypic){
    var accessToken = response.authResponse.accessToken;
    FB.api(
      '/me',
      'GET',
      {"fields":"id,name,birthday,email,first_name,last_name"},
      function(response) {
        display(response);
        getpic(response, accessToken, displaypic);
      }
    );
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
