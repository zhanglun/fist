import React, { Component } from 'react';

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
          <span className="material-icons" onClick={this.deleteNote.bind(this)}>delete</span>
        </div>
      </div>
    );
  }
}