var checkLoginState = require('./../js/facebook-backend.js').checkLoginState;
var getUserTransactions = require('./../js/firebase.js').getUserTransactions;
var transactions = require('./../js/firebase.js').transactions;
var updateUser = require('./../js/firebase.js').updateUser;
var writeUserTransaction = require('./../js/firebase.js').writeUserTransaction;
var getRecentTransactions = require('./../js/firebase.js').getRecentTransactions;
var getLastFive = require('./../js/firebase.js').getLastFive;
var setProgress = require('./../js/firebase.js').setProgress;
var moment = require('moment');
function display(response){
  $("#landingpage").hide();
  console.log("wtf");
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



  $("#landpage").fadeIn(1200);
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
    $("#landingpage").hide();
  getLastFive($("#id").val());
  if( $("#barcreated").val() !== "true"){
    setProgress($("#id").val(), barInit);
  }
  $("#landpage").hide();
  $("#dashboard").fadeIn(900);
}
// $(window).load(function() {
//   checkLoginState(display, displaypic, showDashboard);
// });
function randPic(pictures){
  var i = Math.floor((Math.random() * pictures.length) + 1);
  return pictures[i];
}
$(document).ready(function(){


    $("#show").click(function(){
      checkLoginState(display, displaypic, showDashboard);
    });
    $(".dashboard").click(function(){
      showDashboard();
    });
    $("#test").click(function() {
      setProgress($("#id").val());

    });

    $("#testTrans").click(function() {
      console.log("Hello");
      var recentTransactions = getRecentTransactions(0);
      console.log(recentTransactions);
    });

    $("#transactionSubmit").submit(function(event) {
      event.preventDefault();
      var weedpics = ["pictures/weed1.jpg","pictures/weed2.jpg","pictures/weed3.jpg","pictures/weed4.jpg","pictures/weed5.jpg","pictures/weed6.jpg","pictures/weed7.jpg","pictures/weed8.jpg","pictures/weed9.jpg","pictures/weed10.jpg"];
      var shatpics = ["pictures/shat1.jpg","pictures/shat2.jpg","pictures/shat3.jpg","pictures/shat4.jpg","pictures/shat5.jpg","pictures/shat6.jpg","pictures/shat7.jpg","pictures/shat8.jpg","pictures/shat9.jpg","pictures/shat10.jpg"];
      var edpics = ["pictures/ed1.jpg","pictures/ed2.jpg","pictures/ed3.jpg","pictures/ed4.jpg","pictures/ed5.jpg"];
      var randompic = "";
      if($("#tPrefTrans").val() === "Flower"){
        randompic = randPic(weedpics);
      } else if($("#tPrefTrans").val() === "Concentrate"){
        randompic = randPic(shatpics);
      }else{
        randompic = randPic(edpics);
      }
      var id = $("#id").val();
      console.log(id);
      var newTransaction = {
       amount: parseInt($("#amount").val()),
       date: moment($("#date").val()).format("MMMM Do, YYYY"),
       dispensary: $("#dispensary").val(),
       efc: $("#tPrefTrans").val(),
       ish: $("#sPrefTrans").val(),
       location: $("#location").val(),
       strain: $("#strain").val(),
       month: parseInt(moment($("#date").val()).format("MM")),
       picture: randompic
      }
      writeUserTransaction(id, newTransaction);
      $("#transactionSubmit")[0].reset();
      location.reload();

    });
    $(".home").click(function(){
      $("#landingpage").fadeIn(900);
      $("#landpage").hide();
      $("#dashboard").hide();
    })
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
      showDashboard();
    });
});
