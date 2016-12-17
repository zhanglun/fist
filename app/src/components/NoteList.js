import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NoteViewComponent from './NoteViewItem';

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
    };
  }


  componentWillMount() {

    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid).orderByChild('order_desc');
      NoteRef.on('value', function (snapshot) {
        console.log('value');
        console.log(snapshot.val());
      });
      NoteRef.on('child_added', (data) => {
        let { notes } = this.state;
        let newNote = Object.assign({}, data.val(), { key: data.ref.key });
        notes[data.ref.key] = newNote;
        this.setState({ notes, });
      });
      NoteRef.on('child_changed', (data) => {
        let { notes } = this.state;
        let key = data.ref.key;
        if (notes[key]) {
          notes[key] = Object.assign({}, data.val(), { key: data.ref.key });
          this.setState({ notes, });
        }
        console.log('child_changed', data);
      });
      NoteRef.on('child_removed', (data) => {
        console.log('child_removed', data);
      });
    }
  }

  componentDidMount() {
    console.log(this.refs.noteList);
  }

  selectNote(note) {
    let { onSelectNote } = this.props;
    onSelectNote(note);
  }

  renderNoteViews() {
    let result = [];
    let { notes } = this.state;

    for (var id in notes) {
      result.push(<NoteViewComponent
        key={id}
        note={notes[id]}
        onSelectNote={this.selectNote.bind(this, notes[id])}
      />);
    }
    return result;
  }

  render() {
    let { notes } = this.state;
    return (
      <div className="note-container" ref="noteList">
        <div className="note-container-toolbar"><h3>笔记列表 <span className="material-icons">add</span></h3></div>
        <div className="note-container__list">
          {this.renderNoteViews()}
        </div>
      </div>
    );
  }
}