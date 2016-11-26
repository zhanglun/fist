import firebase from 'firebase';
import React, { Component } from 'react';

export default class NoteViewItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // let currentUser = firebase.auth().currentUser;
  }

  selectNote() {
    let { note, onSelectNote } = this.props;
    onSelectNote();
  }

  render() {
    let { note } = this.props;
    return (
      <div className="noteview-item" onClick={this.selectNote.bind(this)}>
        <div className="noteview-item-title">
          {note.title}
        </div>
      </div>
    );
  }
}