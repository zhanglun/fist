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
    let { note } = this.props;
    console.log('editor init note', note);
    this.setState({ note, });
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
    console.log('editor update props note', note);
    this.setState({ note, });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleInputChange(newcontent) {
    this.setState({ content: newcontent });
  }


  save() {
    console.log(Note);
    Note.add(window.currentUser.uid, {
      title: this.state.title,
      content: this.state.content
    });

  }

  render() {
    return (
      <div className="editor">
        <div>
          <input className="editor-input__title" type="text" value={this.state.note.title}
                 onChange={this.handleTitleChange.bind(this)}/>
          <textarea id="editor" className="editor-input__content" value={this.state.note.content}
                    onChange={this.handleInputChange.bind(this)}></textarea>
        </div>
        <button onClick={this.save.bind(this)}>保存</button>
      </div>
    )
  }
}