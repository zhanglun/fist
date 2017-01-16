import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import classNames from 'classnames';
import * as Note from '../helper/db/note';


export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content,
      id: props.id,
      isSaving: false,
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
      this.setState({
        content: this.editor.value(),
      });
      if (this.props.type == 'new') {
        return false;
      }
      this.autoSave()
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

  onClose() {
    let { onClose } = this.props;
    onClose();
  }

  handleTitleChange(event) {
    let { onTitleChange } = this.props;
    onTitleChange(event.target.value);
    this.setState({
      title: event.target.value,
    });
    if (this.props.type == 'new') {
      return false;
    }
    this.autoSave();
  }

  autoSave() {
    if (this.editor.timer) {
      clearTimeout(this.editor.timer);
    }
    this.editor.timer = setTimeout(() => {
      this.save();
    }, 1500);
  }

  save() {
    let { onSave } = this.props;
    let { title, content } = this.state;
    this.setState({
      isSaving: true,
    });
    content = this.editor.value();
    onSave({ title, content }, () => {
      this.setState({
        isSaving: false,
      })
    });
  }

  renderButtons() {
    let {
      showButton
    } = this.props;
    let result = null;
    if (!showButton) {
      return false;
    } else {
      if (this.editor && this.editor.value()) {
        result = <button
          className="button button-action button-rounded button-small"
          onClick={this.save.bind(this)}>
          保存
        </button>;
      } else {
        result = <button
          className="button button-action button-rounded button-small"
          onClick={this.onClose.bind(this)}>取消
        </button>
      }
    }
    return result;
  }

  renderEditorHeader() {
    let { type } = this.props;
    let { isSaving, } = this.state;
    let headerStatusClassNames = classNames('editor-header-status', { 'isSaving': isSaving });
    console.log(headerStatusClassNames);
    if (type == 'new') {
      return (
        <div className="editor-header">
          <div className="editor-title-container">
            <input
              className="editor-title-input"
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}/>
          </div>
          {this.renderButtons()}
        </div>
      )
    } else {
      return (
        <div className="editor-header">
          <div className="editor-title-container">
            <input
              className="editor-title-input"
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}/>
          </div>
          {isSaving && <span className={headerStatusClassNames}>
            <i className="icon-spinner9"/>
            保存中...
          </span>}
          {this.renderButtons()}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="editor">
        {this.renderEditorHeader()}
        <textarea />
      </div>
    )
  }
}