import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
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
    this.editor = null;
  }

  componentWillMount() {
  }

  componentDidMount() {
    let editor = new Quill(ReactDOM.findDOMNode(this.refs.quillTextArea), {
      theme: 'snow',
      modules: {
        toolbar: ['bold', 'italic', 'underline', 'strike', // toggled buttons
          {
            'color': [],
          }, {
            'size': ['small', false, 'large', 'huge'],
          }, // custom dropdown
          {
            'header': [1, 2, 3, 4, 5, 6, false],
          }, {
            'list': 'ordered',
          }, {
            'list': 'bullet',
          },

        ],
      },
    });
    this.editor = editor;
  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
    let editor = this.editor;
    let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid + '/' + note.key);
    NoteRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      let note = Object.assign({}, snapshot.val(), { key: snapshot.ref.key });
      let content = note.content;
      this.setState({ note, });

      editor.root.innerHTML = content ;
      editor.update();

    });
  };

  handleTitleChange(event) {
    let { note } = this.state;
    note.title = event.target.value;
    this.setState({ note, });
  }

  // handleInputChange(event) {
  //   let { note } = this.state;
  //   note.content = event.target.value;
  //   this.setState({ note, });
  // }


  save() {
    let editor = this.editor;
    let content = editor.root.innerHTML;
    let { note } = this.state;
    note.content = content;
    this.setState({ note, });
    Note.save(window.currentUser.uid, note);

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
          <div ref="quillTextArea"></div>
          {/*<textarea*/}
          {/*id="editor"*/}
          {/*className="editor-input__content"*/}
          {/*value={this.state.note.content}*/}
          {/*onChange={this.handleInputChange.bind(this)}/>*/}
        </div>
        <div ref="quillToolbar">
        </div>
        <button onClick={this.save.bind(this)}>保存</button>
      </div>
    )
  }
}