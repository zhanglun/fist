import React, { Component } from 'react';
// https://github.com/olahol/react-tagsinput/blob/master/src/index.js

function renderInput(props) {
  // let {onChange, value, ...other} = props;
  return (
    <input ref="input" type='text' {...props} />
  )
}

function renderTags(tags) {
  return tags.map((key) => {
    return <span key={key}>{key}</span>;
  })
}

export default class NoteToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags,
    }
  }

  handleKeyDown(event) {
    if (!event.target.value && event.keyCode == 8) {
      this.removeTags();
    }
    if (event.keyCode == 13) {
      let value = event.target.value;
      this.addTags(value);
    }
  }

  addTags(tag) {
    let { tags } =  this.state;
    let notExist = tags.every((key) => {
      return key != tag;
    });
    if (notExist) {
      tags.push(tag);
      this.setState({ tags });
    }

    this.refs.input.value = '';
    this.props.onTagsChange(tags, tag);
  }

  removeTags(tag) {
    let { tags } = this.state;
    let removed = null;
    if (tag) {
      removed = tags.splice(tags.indexOf(tag) - 1);
    } else {
      removed = tags.pop();
    }
    this.setState({
      tags,
    });
    this.props.onTagsChange(tags, removed);
  }


  render() {
    let { tags } = this.state;
    let inputComponent = renderInput({
      onKeyDown: this.handleKeyDown.bind(this),
    });
    let tagsComponent = renderTags(tags);
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