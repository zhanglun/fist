import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Note from '../db/note';

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        title: '',
        content: '',
      },
    };
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
    let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid + '/' + note.key);
    NoteRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      let note = Object.assign({}, snapshot.val(), { key: snapshot.ref.key });
      this.setState({ note, });
    });
  };

  handleTitleChange(event) {
    let { note } = this.state;
    note.title = event.target.value;
    this.setState({ note, });
  }

  handleInputChange(event) {
    let { note } = this.state;
    note.content = event.target.value;
    this.setState({ note, });
  }


  save() {
    Note.add(window.currentUser.uid, {
      title: this.state.title,
      content: this.state.content
    });

  }

  render() {
    return (
      <div className="editor">
        <div>
          <input
            className="editor-input__title"
            type="text"
            value={this.state.note.title}
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea
            id="editor"
            className="editor-input__content"
            value={this.state.note.content}
            onChange={this.handleInputChange.bind(this)}/>
        </div>
        <button onClick={this.save.bind(this)}>保存</button>
      </div>
    )
  }
}