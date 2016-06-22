var checkLoginState = require('./../js/facebook-backend.js').checkLoginState;
var moment = require('moment');
var loading_screen = pleaseWait({
  logo: "pictures/logo.png",
  backgroundColor: '#43a047',
  loadingHtml: "<div class='birthday'><i class='material-icons prefix'>mode_edit</i><input type='date' class='datepicker' id='birthday'></div><label for='birthday'>First Name</label>"
});
$('.datepicker').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15 // Creates a dropdown of 15 years to control year
});
function display(response){
  console.log(response);
  if(response.birthday != null){
    var date = new Date(response.birthday);
    var dob = moment(date).format("YYYY-MM-DD");
    var age = moment().diff(moment(dob, 'YYYYMMDD'), 'years');
    $("#age").val(age);
    $("#ageI").addClass("active");
  }
  $("#first_name").val(response.first_name);
  $("#last_name").val(response.last_name);
  $("#email").val(response.email);

  $("#first_nameI").addClass("active");
  $("#last_nameI").addClass("active");
  $("#emailI").addClass("active");

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
      checkLoginState(display, displaypic)

    });
});
