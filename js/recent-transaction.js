
exports.createUserCard = function(userTransactions) {
      $("#recents").text("");
  userTransactions.forEach(function(transaction) {
    $("#recents").append(
  "<div class='col s3 m3 l3'>" +
    "<div class='card'>" +
      "<div class='card-image waves-effect waves-block waves-light'>" +
        "<img class='activator' src='images/office.jpg'>" +
      "</div>" +
      "<div class='card-content'>" +
        "<span class='card-title activator grey-text text-darken-4'>" + transaction.amount + "<br>" + transaction.date + "<br>" + transaction.strain + "<i class='material-icons right'>more_vert</i></span>" +
        "<p><a href='#'>This is a link</a></p>" +
      "</div>" +
      "<div class='card-reveal'>" +
        "<span class='card-title grey-text text-darken-4'>Transaction Details<i class='material-icons right'>close</i></span>" +
        "<p>Date: " + transaction.date + "<br>" + "Amount: " + transaction.amount + "<br>" + "Dispensary: " + transaction.dispensary + "<br>" + transaction.location + "</p>" +
      "</div>" +
    "</div>" +
  "</div>");
  });
// }else{
//   $("#recents").append(
// "<div class='col s3 m3'>" +
//   "<div class='card'>" +
//     "<div class='card-image waves-effect waves-block waves-light'>" +
//       "<img class='activator' src='images/office.jpg'>" +
//     "</div>" +
//     "<div class='card-content'>" +
//       "<span class='card-title activator grey-text text-darken-4'>" + userTransactions.amount + "<br>" + userTransactions.date + "<br>" + userTransactions.strain + "<i class='material-icons right'>more_vert</i></span>" +
//       "<p><a href='#'>This is a link</a></p>" +
//     "</div>" +
//     "<div class='card-reveal'>" +
//       "<span class='card-title grey-text text-darken-4'>Transaction Details<i class='material-icons right'>close</i></span>" +
//       "<p>Date: " + userTransactions.date + "<br>" + "Amount: " + userTransactions.amount + "<br>" + "Dispensary: " + userTransactions.dispensary + "<br>" + userTransactions.location + "</p>" +
//     "</div>" +
//   "</div>" +
// "</div>");
// }
};
