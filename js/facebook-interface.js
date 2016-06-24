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
            getinfoExport(response, display, displaypic, showDashboard);
         } else if (response.status === 'not_authorized') {
         } else {
           var agescreen = pleaseWait({
             logo: "pictures/logo.png",
             backgroundColor: '#43a047',
             loadingHtml: "<div class='birthday'><h4 id='message'>You Must be at least 18 Years Old to view this page</h4><div id='dateinput'><label for='birthday'>Enter Birthday</label><input type='date' class='datepicker' id='birthday'><a class='waves-effect waves-light btn-large' id='submit'>Submit</a></div></div>"
           });
           $('.datepicker').pickadate({
             selectMonths: true, // Creates a dropdown to control month
             selectYears: 70 // Creates a dropdown of 15 years to control year
           });
           $("#submit").click(function(){
             var birthdate = $("#birthday").val();
             var date = new Date(birthdate);
             var dob = moment(date).format("YYYY-MM-DD");
             var age = moment().diff(moment(dob, 'YYYYMMDD'), 'years');
             if(age >=18){
               agescreen.finish();
             }else{
               $("#message").text("You are under 18 and not allowed to view this site please leave");
               $("#dateinput").fadeOut();
             }
           });
         }
     });

}
