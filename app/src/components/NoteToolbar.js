import React, { Component } from 'react';
// https://github.com/olahol/react-tagsinput/blob/master/src/index.js


class NoteToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags,
    }
  }

  _addTags(tag) {
    let { tags } =  this.state;
    let notExist = tags.every((key) => {
      return key != tag;
    });
    if (notExist) {
      tags.push(tag);
      this.setState({ tags });
    }

    this.refs.input.value = '';
    this.props.onChange('add', tag, tags);
  }

  _removeTags(tag) {
    let { tags } = this.state;
    let removed = null;
    if (tag) {
      removed = tags.splice(tags.indexOf(tag), 1);
    } else {
      removed = tags.pop();
    }
    this.setState({
      tags,
    });
    this.props.onChange('remove', removed, tags);
  }

  handleRemove(tag) {
    this._removeTags(tag);
  }

  handleKeyDown(event) {
    if (!event.target.value && event.keyCode == 8) {
      this._removeTags();
    }
    if (event.keyCode == 13) {
      let value = event.target.value;
      this._addTags(value);
    }
  }


  renderInput(props) {
    // let {onChange, value, ...other} = props;
    return (
      <input ref="input" type='text' {...props} />
    )
  }

  renderTags(props) {
    let { tags } = this.state;
    let {
      onRemove, tagProps,
    } = props;
    return tags.map((key) => {
      return <span key={key} className={tagProps.className}>{key}
        <a className={tagProps.classNameRemove} onClick={(e) => onRemove(key)}>&times;</a>
    </span>;
    })
  }

  render() {
    let { tagProps } = this.props;
    let inputComponent = this.renderInput({
      onKeyDown: this.handleKeyDown.bind(this)
    });
    let tagsComponent = this.renderTags({
      onRemove: this.handleRemove.bind(this),
      tagProps,
    });
    return (
      <div className="note-toolbar">
        <div className="note-tags-container">
          {tagsComponent}
          {inputComponent}
        </div>
      </div>
    )
  }

}
NoteToolbarComponent.defaultProps = {
  className: 'tagsinput',
  focusedClassName: 'tagsinput--focused',
  tagProps: { className: 'tagsinput-tag', classNameRemove: 'tagsinput-remove' },
  inputProps: {
    className: 'tagsinput-input',
    placeholder: 'Add a tag'
  },
};

export default NoteToolbarComponent
