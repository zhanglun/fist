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
      } else {
        console.log('not logged in');
      }
      this.setState({ loading: false });
    });
  }

  initApp() {
    let { loading } = this.state;
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
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