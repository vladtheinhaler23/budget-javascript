var config = {
 apiKey: "AIzaSyDAazSLzo-KZeqTds-eWeut4a40Tr8-kxc",
 authDomain: "budget-1617b.firebaseapp.com",
 databaseURL: "https://budget-1617b.firebaseio.com",
 storageBucket: "budget-1617b.appspot.com",
};
firebase.initializeApp(config);

exports.writeUserData = function(userId, name) {
 firebase.database().ref('users/' + userId).set({
   username: name,
   email: "",
   city: "",
   state: "",
   typepref: "",
   eflpref: "",
   budget: "",
   transactions: ""
 });
};

exports.getUserTransactions = function(userId) {
  firebase.database().ref('/users/' + userId + "/transactions").once('value').then(function(snapshot) {
  var userTransactions = snapshot.val();
  console.log(userTransactions);
  userTransactions.forEach(function(transaction) {
    $("#recents").append("<p>" + "Date: " + transaction.date + "<br>" + "Amount: " + transaction.amount + "<br>" + "Dispensary: " + transaction.dispensary + "</p>");
  })

});
};
