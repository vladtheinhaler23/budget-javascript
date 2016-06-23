var appid = require('./../.env').appid;
var getinfoExport = require('./../js/facebook-backend.js').getinfoExport;
  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId="+appid;
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

showInfo = function(){
    checkLoginState(display, displaypic, showDashboard);
}
window.fbAsyncInit = function() {
  FB.init({
    appId      : appid,
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.6' // use graph api version 2.5
  });
  FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
           console.log(response);
            getinfoExport(response, display, displaypic, showDashboard);
         } else if (response.status === 'not_authorized') {
         } else {
         }
     });

}
