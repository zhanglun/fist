import firebase from 'firebase';
import React, { Component } from 'react';

import SidebarComponent from './Sidebar';
import NoteEditorComponent from './NoteEditor';
import NoteListComponent from './NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentNote: {}
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


  selectNote(note) {
    this.setState({ currentNote: note });
  }

  initApp() {
    let { loading } = this.state;
    let styles = {
      top: {
        width: '100%',
        height: 50,
        borderBottom: '2px solid #f4f4f4',
      },
      container: {
        display: 'flex'
      }
    };
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
          <SidebarComponent />
          <div className="app-container">
            <div style={styles.top}>Header Temp</div>
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