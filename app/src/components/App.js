import firebase from 'firebase';
import React, { Component } from 'react';
import EditorComponent from './Editor';
import NoteListComponent from './NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        window.currentUser = user;
      } else {
        console.log('not logged in');
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Fist</h2>
        <NoteListComponent />
        <EditorComponent />

      </div>
    )
  }
}