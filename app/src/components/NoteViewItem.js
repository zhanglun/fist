import firebase from 'firebase';
import React, { Component } from 'react';

export default class NoteViewItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // let currentUser = firebase.auth().currentUser;
  }

  render() {
    let { note } = this.props;
    return (
      <div className="noteview-item">
        {note.title}
      </div>
    );
  }
}