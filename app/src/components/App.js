import firebase from 'firebase';
import React, { Component } from 'react';

import HeaderComponent from './Header';
import NoteEditorComponent from './NoteEditor';
import NoteListComponent from './NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        window.currentUser = user;
        this.setState({ loading: false });
      } else {
        this.setState({ loading: true });
        console.log('not logged in');
      }
    });
  }

  signIn() {
    let provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    provider.setCustomParameters({
      'allow_signup': 'true'
    });
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
  }


  initApp() {
    let { loading } = this.state;
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
          <button onClick={this.signIn.bind(this)}>sign in with github</button>
        </div>
      )
    } else {
      return (
        <div className="app">
          <HeaderComponent />
          <div className="app-container">
            <NoteListComponent />
            <div className="note-detail">
              <NoteEditorComponent />
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.initApp()}
      </div>
    )
  }
}