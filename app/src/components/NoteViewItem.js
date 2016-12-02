import React, { Component } from 'react';

export default class NoteViewItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  selectNote() {
    let { note, onSelectNote } = this.props;
    onSelectNote();
  }

  render() {
    let { note } = this.props;
    let content = note.content ? note.content.replace(/<\/?[^>]*>/ig, '').slice(0, 40): '';
    return (
      <div className="noteview-item" onClick={this.selectNote.bind(this)}>
        <div className="noteview-item-title">
          {note.title}
        </div>
        <div className="noteview-item-content">
          {content}
        </div>
      </div>
    );
  }
}