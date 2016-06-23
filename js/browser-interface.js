var checkLoginState = require('./../js/facebook-backend.js').checkLoginState;
var getUserTransactions = require('./../js/firebase.js').getUserTransactions;
var transactions = require('./../js/firebase.js').transactions;
var updateUser = require('./../js/firebase.js').updateUser;
var writeUserTransaction = require('./../js/firebase.js').writeUserTransaction;
var getRecentTransactions = require('./../js/firebase.js').getRecentTransactions;
var setProgress = require('./../js/firebase.js').setProgress;
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
    var dob = moment(date).format("MMMM-DD-YYYY");
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
var showDashboard = function(){
  $("#landpage").hide();
  $("#dashboard").fadeIn(900);
}

$(document).ready(function(){

    $("#show").click(function(){
      checkLoginState(display, displaypic);
    });
    $(".dashboard").click(function(){
      showDashboard();
    });
    $("#test").click(function() {
      setProgress(0);
    });

    $("#testTrans").click(function() {
      // console.log("Hello");
      // var recentTransactions = getRecentTransactions(0);
      // console.log(recentTransactions);
    });

    $("#transactionSubmit").submit(function(event) {
      event.preventDefault();
      var id = $("#id").val();
      console.log(id);
      var newTransaction = {
        amount: $("#amount").val(),
       date: moment($("#date").val()).format("MMMM Do, YYYY"),
       dispensary: $("#dispensary").val(),
       efc: $("#tPrefTrans").val(),
       ish: $("#sPrefTrans").val(),
       location: $("#location").val(),
       strain: $("#strain").val(),
       month: moment($("#date").val()).format("MM"),
      }
      console.log(newTransaction);
      writeUserTransaction(id, newTransaction);

    });
    $("#form").submit(function(e){
      e.preventDefault();
      var temp;
      if($('#check').is(':checked')){
        temp = "Medical"
      }else{
        temp = "Recreational"
      }
      console.log($("#age").val());
      var id = $("#id").val();
      var user = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        birthdate: moment($("#age").val()).format("MMMM Do, YYYY"),
        city: $("#city").val(),
        state: $("#state").val(),
        sPref: $("#sPref").val(),
        tPref: $("#tPref").val(),
        medrec: temp,
        budget: parseInt($("#budget").val())
      };
      console.log(user);
      updateUser(id, user);

    });
});
