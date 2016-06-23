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
      console.log(userTransactions);
      createUserCard(userTransactions);


  });
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
}
