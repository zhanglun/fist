import firebase from 'firebase';
import React, { Component } from 'react';
import NoteViewComponent from './NoteViewItem';

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentWillMount() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid);
      NoteRef.on('value', function (snapshot) {
        console.log(snapshot.val());

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
  }

  selectNote(note) {
    let {onSelectNote} = this.props;
    onSelectNote(note);
  }

  render() {
    let { notes } = this.state;
    return (
      <div className="note-container">
        <div className="note-container__list">
          {notes.map((note, i) => {
            return (
              <NoteViewComponent key={i} note={note} onSelectNote={this.selectNote.bind(this, note)}/>
            );
          })}
        </div>
      </div>
    );
  }
}