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
  'allow_signup': 'false'
});


window.onload = function () {

  // const inputEmail = document.getElementById('email');
  // const inputPassword = document.getElementById('password');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnGithub = document.getElementById('btnGithub');

  btnSignUp.addEventListener('click', e => {
    // const email = inputEmail.value;
    // const pass = inputPassword.value;
    let email = '549936800@qq.com';
    let password = 'smile1410_happy';
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function () {
        console.log(arguments);
      }).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error);
    });

  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  });
  btnGithub.addEventListener('click', (e) => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      debugger;
      // ...
    }).catch(function (error) {
      debugger;
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
