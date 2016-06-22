var checkLoginState = require('./../js/facebook-backend.js').checkLoginState;
var moment = require('moment');
function display(response){
  var date = new Date(response.birthday);
  var dob = moment(date).format("YYYY-MM-DD");
  var age = moment().diff(moment(dob, 'YYYYMMDD'), 'years');
  $("#profile").attr("src", response.picture.data.url);
  $("#first_name").val(response.first_name);
  $("#last_name").val(response.last_name);
  $("#email").val(response.email);
  $("#age").val(age);
  $("#first_nameI").addClass("active");
  $("#last_nameI").addClass("active");
  $("#emailI").addClass("active");
  $("#ageI").addClass("active");
  $("#form").fadeIn("slow");
}
$(document).ready(function(){

    $("#show").click(function(){
      checkLoginState(display)

    });
});
