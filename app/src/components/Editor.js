import React, { Component } from 'react';
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
    this.editor = this.refs.textarea;
  }

  componentWillReceiveProps(nextprops) {
    let { title, content, id } = nextprops;
    if (content !== this.state.content && id !== this.state.id) {
      this.setState({ content, id, });
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

  handleContentChange(event) {
    // let { onContentChange } = this.props;
    // onContentChange(event.target.value);
    this.setState({
      content: event.target.value,
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
    }, 800);
  }

  save() {
    let { onSave } = this.props;
    let { title, content } = this.state;
    this.setState({
      isSaving: true,
    });
    onSave({ title, content }, () => {
      this.setState({
        isSaving: false,
      })
    });
  }

  renderButtons() {
    let {
      showButton,
      buttonStyles,
    } = this.props;
    let result = null;

    if (!showButton) {
      return false;
    } else {
      if (this.editor && this.editor.value) {
        result = <button
          className="button button-action button-rounded button-small"
          style={buttonStyles}
          onClick={this.save.bind(this)}>
          保存
        </button>;
      } else {
        result = <button
          className="button button-action button-rounded button-small"
          style={buttonStyles}
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
    return (
      <div className="editor-header">
        <div className="editor-title-container">
          <input
            className="editor-title-input"
            type="text"
            value={this.state.title}
            placeholder="取个什么标题好呢?"
            onChange={this.handleTitleChange.bind(this)}/>
        </div>
        {isSaving && type !== 'new' && <span className={headerStatusClassNames}>
            <i className="icon-spinner9"/>
            保存中...
          </span>}
        {this.renderButtons()}
      </div>
    )
  }

  render() {
    let { className } = this.props;
    let editorClassName = classNames({
      editor: true,
    }, className);
    return (
      <div className={editorClassName}>
        {this.renderEditorHeader()}
        <textarea
          className="editor-textarea"
          ref="textarea"
          value={this.state.content}
          placeholder="直接开始输入吧!"
          onChange={this.handleContentChange.bind(this)}
          onKeyUp={this.handleContentChange.bind(this)}/>
      </div>
    )
  }
}

EditorComponent.defaultProps = {
  timer: null,
};