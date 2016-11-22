import firebase from 'firebase';
import React, { Component } from 'react';
export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentWillMount() {
    setTimeout(() => {
      let currentUser = firebase.auth().currentUser;
      if (currentUser) {
        let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid);
        NoteRef.on('value', function (snapshot) {
          console.log(snapshot.val());

          // updateStarCount(postElement, snapshot.val());
        });
        NoteRef.on('child_added', (data) => {
          console.log('child_added', data.val());
          let { notes } = this.state;
          notes = [].concat(notes);
          notes.push(data.val());
          this.setState({ notes, });
        });
        NoteRef.on('child_changed', (data) => {
          console.log('child_changed', data);
        });
        NoteRef.on('child_removed', (data) => {
          console.log('child_removed', data);
        });
      }
    }, 1500);
  }

  render() {
    let { notes } = this.state;
    return (
      <div>
        <h3>Todo</h3>
        <div>
          {notes.map((note, i) => {
            return (
              <div key={i}>
                <div>{note.title}</div>
                <div>{note.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}