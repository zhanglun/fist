import React, { Component } from 'react';
import * as Note from '../helper/db/note';

export default class NoteViewItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  selectNote(e) {
    let { note, onSelectNote } = this.props;
    onSelectNote();
  }

  deleteNote(e) {
    console.log('TODO: remove note');
    let { note } = this.props;
    Note.remove(note.author_id, note);
    console.log(note);
    e.stopPropagation();
  }

  render() {
    let { note } = this.props;
    let content = note.content ? note.content.replace(/<\/?[^>]*>/ig, '').slice(0, 40) : '';
    return (
      <div className="noteview-item" onClick={this.selectNote.bind(this)}>
        <div className="noteview-item-title">
          {note.title}
        </div>
        <div className="noteview-item-content">
          {content}
        </div>
        <div className="noteview-item-toolbar">
          <span className="icon-bin" onClick={this.deleteNote.bind(this)}/>
        </div>
      </div>
    );
  }
}