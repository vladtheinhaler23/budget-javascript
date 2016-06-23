var createUserCard = require('./../js/recent-transaction.js').createUserCard;

var config = {
 apiKey: "AIzaSyDAazSLzo-KZeqTds-eWeut4a40Tr8-kxc",
 authDomain: "budget-1617b.firebaseapp.com",
 databaseURL: "https://budget-1617b.firebaseio.com",
 storageBucket: "budget-1617b.appspot.com",
};
firebase.initializeApp(config);

exports.writeUserData = function(userId, name) {
 firebase.database().ref('users/' + userId).set({
   username: name
 });
};

exports.getUserTransactions = function(userId) {
  var userTransactions = [];
  firebase.database().ref('/users/' + userId + "/transactions").once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        userTransactions.push(childSnapshot.val());
      });
      createUserCard(userTransactions);
      
  });
};
exports.getLastFive = function(userId) {
  var userTransactions = [];
  firebase.database().ref('/users/' + userId + "/transactions").limitToLast(5).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        userTransactions.push(childSnapshot.val());
      });
      createUserCard(userTransactions);

  });
};

exports.getRecentTransactions = function(userId) {
  var currentMonth = moment().format("MM");
  firebase.database().ref('/users/' + userId + "/transactions").orderByChild("month").equalTo(currentMonth ).once('value').then(function(snapshot) {
  var recentTransactions = snapshot.val();
  });
};

exports.writeUserTransaction = function(userId, newTransaction) {
  var newTransactionKey = firebase.database().ref().child('transactions').push().key;

  var updates = {};
  updates['/users/' + userId + '/transactions/' + newTransactionKey] = newTransaction;

  return firebase.database().ref().update(updates);
};

exports.checkUser = function(FBuser, display, accessToken, displaypic, getpic, writeUserData, getUserTransactions, showDashboard){
  firebase.database().ref('/users/' + FBuser.id).once('value').then(function(snapshot) {
  var user = snapshot.val();
  if(user === null){
    display(FBuser);
    // writeUserData(FBuser.id, FBuser.name);
    getpic(FBuser, accessToken, displaypic);
  }else{
    showDashboard();
    getUserTransactions(FBuser.id);
  }
});
};
exports.updateUser = function(id, user){
  var updates = {};
  updates['/users/' + id] = user;

  return firebase.database().ref().update(updates);
};
