var checkLoginState = require('./../js/facebook-backend.js').checkLoginState;
var moment = require('moment');
// var loading_screen = pleaseWait({
//   logo: "pictures/logo.png",
//   backgroundColor: '#43a047',
//   loadingHtml: "<div class='birthday'><h2 id='message'>You Must be at least 18 Years Old to view this page</h2><div id='dateinput'><label for='birthday'>Enter Birthday</label><input type='date' class='datepicker' id='birthday'><a class='waves-effect waves-light btn-large' id='submit'>Submit</a></div></div>"
// });
// $('.datepicker').pickadate({
//   selectMonths: true, // Creates a dropdown to control month
//   selectYears: 70 // Creates a dropdown of 15 years to control year
// });
// $("#submit").click(function(){
//   var birthdate = $("#birthday").val();
//   var date = new Date(birthdate);
//   var dob = moment(date).format("YYYY-MM-DD");
//   var age = moment().diff(moment(dob, 'YYYYMMDD'), 'years');
//   if(age >=18){
//     loading_screen.finish();
//   }else{
//     $("#message").text("You are under 18 and not allowed to view this site please leave");
//     $("#dateinput").fadeOut();
//   }
// })
function display(response){
  console.log(response);
  if(response.birthday != null){
    var date = new Date(response.birthday);
    var dob = moment(date).format("MMMM Do, YYYY");
    $("#age").val(dob);
    $("#ageI").addClass("active");
    $("#ageicon").addClass("active");

  }
  if(response.email != null){
    $("#email").val(response.email);
    $("#emailI").addClass("active");
    $("#emailicon").addClass("active");

  }
  $("#first_name").val(response.first_name);
  $("#last_name").val(response.last_name);

  $("#first_nameI").addClass("active");
  $("#firsticon").addClass("active");

  $("#last_nameI").addClass("active");
  $("#lasticon").addClass("active");



  $("#form").fadeIn(1200);
}
function displaypic(response){
  if(response.data.is_silhouette){
    $("#profile").attr("src", "pictures/userpic.jpg");
  }else{
    $("#profile").attr("src", response.data.url);
  }
  $("#profile").fadeIn(1200);

}

$(document).ready(function(){

    $("#show").click(function(){
      checkLoginState(display, displaypic);

    });
});
