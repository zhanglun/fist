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

import NoteDetailComponent from './NoteDetail';
import NoteListComponent from './NoteList';
import NewNoteComponent from './NewNote';
// import SidebarComponent from './Sidebar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      auth: false,
      currentNote: null,
      showNewNoteEditor: false,
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

  removeNote(note) {
    this.setState({
      currentNote: null,
      showNewNoteEditor: false,
    });
  }

  openNewNoteEditor() {
    this.setState({
      showNewNoteEditor: true,
    });
  }

  handleCloseNewNote() {
    this.setState({
      showNewNoteEditor: false,
    });
  }

  render() {
    let {
      loading,
      auth,
    } = this.state;
    if (loading) {
      return (
        <div className="app">
          <h2>Loading...</h2>
        </div>
      )
    } else if (!loading && !auth) {
      return (
        <div className="app">
          <div className="login-panel">
          <span className=" login-icon-button" onClick={this.signIn.bind(this)}>
            <span className="icon-github"/>
            <span className="login-icon-button-text">Github</span>
          </span>
          </div>
        </div>)
    } else {
      return (
        <div className="app">
          <NewNoteComponent
            isOpen={this.state.showNewNoteEditor}
            onClose={this.handleCloseNewNote.bind(this)}
          />
          <NoteListComponent
            key={'list'}
            onSelectNote={this.selectNote.bind(this)}
            onRemoveNote={this.removeNote.bind(this)}
            onOpenNewNoteEditor={this.openNewNoteEditor.bind(this)}
          />

          {this.state.currentNote &&
          <NoteDetailComponent note={this.state.currentNote} key={'list2'}/>}
        </div>
      )
    }
  }
}