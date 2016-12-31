import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import * as Note from '../helper/db/note';


export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content,
      id: props.id,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

    let dom = this.refs.editor;
    this.editor = new SimpleMDE({
      // element: dom,
      hideIcons: ["guide", "heading"],
      autofocus: false,
      indentWithTabs: false,
      initialValue: this.state.content,
      toolbar: false,
      insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      },
      placeholder: "Type here...",
      shortcuts: {
        drawTable: "Cmd-Alt-T"
      },
      showIcons: ["code", "table"],
      spellChecker: false,
      styleSelectedText: false,
      tabSize: 2,
      toolbarTips: false,
      status: false,
    });
    this.editor.codemirror.on("change", () => {
      if (this.editor.timer) {
        clearTimeout(this.editor.timer);
      }
      this.editor.timer = setTimeout(() => {
        this.save();
        console.log(this.editor.value());
      }, 2000);
    });
  }

  componentWillReceiveProps(nextprops) {
    let { title, content, id } = nextprops;
    if (content !== this.state.content && id !== this.state.id) {
      this.setState({ content, id, });
      this.editor.value(content);
    }
    if (title !== this.state.title && id !== this.state.id) {
      this.setState({ title, });
    }
  };

  handleTitleChange(event) {
    let { note } = this.state;
    let { onTitleChange } = this.props;
    onTitleChange(event.target.value);
  }

  save() {
    let { onSave } = this.props;
    let { title, content } = this.state;
    content = this.editor.value();
    onSave({ title, content });
  }

  render() {
    return (
      <div className="note-editor">
        <input
          className="note-editor-input__title"
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}/>
        <textarea />
        {/*<button*/}
        {/*className="button button-action button-rounded button-small"*/}
        {/*onClick={this.save.bind(this)}>保存*/}
        {/*</button>*/}
      </div>
    )
  }
}