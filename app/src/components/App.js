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

import React, { Component } from 'react';

import NoteEditorComponent from './NoteEditor';
import NoteListComponent from './NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      auth: false,
      currentNote: {}
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        window.currentUser = user;
        this.setState({
          loading: false,
          auth: true,
        });
      } else {
        this.setState({
          loading: false,
          auth: false,
        });
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


  selectNote(note) {
    this.setState({ currentNote: note });
  }

  initApp() {
    let {
      loading,
      auth,
    } = this.state;
    let styles = {
      top: {
        width: '100%',
        height: 50,
        borderBottom: '2px solid #f4f4f4',
      },
      container: {
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
      }
    };
    if (loading) {
      return (
        <h2>Loading...</h2>
      )
    } else if (!loading && !auth) {
      return (<div className="login-panel">
        <span className=" login-icon-button" onClick={this.signIn.bind(this)}>
          <span className="icon-github"></span>
          <span className="login-icon-button-text">Github</span>
        </span>
      </div>)
    } else {
      return (
        <div className="app">
          {/*<SidebarComponent />*/}
          <div className="app-container">
            <div style={styles.container}>
              <NoteListComponent onSelectNote={this.selectNote.bind(this)}/>
              <div className="note-detail">
                <NoteEditorComponent note={this.state.currentNote}/>
              </div>
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