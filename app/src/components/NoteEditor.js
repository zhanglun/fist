import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import * as Note from '../db/note';

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  componentWillMount() {
    let { value } = this.props;
    this.setState({ value, });
  }

  componentDidMount() {
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
    let options = {
      tabSize: 2,
      lineWrapping: true,
      theme: "markdown",
      mode: {
        name: 'markdown',
        highlightFormatting: true
      },
    };
    return (
      <div className="editor">
        <div>
          <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
        </div>
        <CodeMirror value={this.state.content} onChange={this.handleInputChange.bind(this)} options={options}/>
        <button onClick={this.save.bind(this)}>保存</button>
      </div>
    )
  }
}