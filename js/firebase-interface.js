var config = {
  apiKey: "AIzaSyDAazSLzo-KZeqTds-eWeut4a40Tr8-kxc",
  authDomain: "budget-1617b.firebaseapp.com",
  databaseURL: "https://budget-1617b.firebaseio.com",
  storageBucket: "budget-1617b.appspot.com",
};
firebase.initializeApp(config);

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}
