import firebase from 'firebase';
import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // const btnGithub = document.getElementById('btnGithub');
    // btnGithub.addEventListener('click', (e) => {
    //   firebase.auth().signInWithPopup(provider).then(function (result) {
    //     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //     let token = result.credential.accessToken;
    //     // The signed-in user info.
    //     let user = result.user;
    //     window.currentUser = result.user;
    //   }).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
    // })
  }


  render() {
    let user = firebase.auth().currentUser;
    return (
      <div className="app-header">
        <div className="header-toolbar">
          <img className="header-toolbar-image" src={user.photoURL} alt=""/>
          <span>{user.email}</span>
        </div>
      </div>
    )
  }
}