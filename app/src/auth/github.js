import firebase from 'firebase';
// Initialize Firebase
let config = {
  apiKey: "AIzaSyCSCN_fEp4_7xrFDDFJeq7F8A2TMC0TOlc",
  authDomain: "scorching-heat-5565.firebaseapp.com",
  databaseURL: "https://scorching-heat-5565.firebaseio.com",
  storageBucket: "scorching-heat-5565.appspot.com",
  messagingSenderId: "352659147102"
};

firebase.initializeApp(config);

let provider = new firebase.auth.GithubAuthProvider();
provider.addScope('user');
provider.setCustomParameters({
  'allow_signup': 'true'
});


window.onload = function () {

  const btnGithub = document.getElementById('btnGithub');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      window.currentUser = user;
    } else {
      console.log('not logged in');
    }
  });
  btnGithub.addEventListener('click', (e) => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      window.currentUser = result.user;
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })
};
