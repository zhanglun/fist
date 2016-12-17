import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import MediumEditor from 'medium-editor';
import blacklist from 'blacklist';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/beagle.min.css';

class RMEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    this.medium = new MediumEditor(dom, this.props.options);
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this._updated) {
      this.setState({ text: nextProps.text });
    }

    if (this._updated) this._updated = false;
  }

  render() {
    let tag = this.props.tag;
    let props = blacklist(this.props, 'options', 'text', 'tag', 'contentEditable', 'dangerouslySetInnerHTML');
    props = Object.assign({}, props, {
      dangerouslySetInnerHTML: { __html: this.state.text }
    });
    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, props);
  }

  change(text) {
    if (this.props.onChange) this.props.onChange(text, this.medium);
  }

}

RMEditor.defaultProps = {
  tag: 'div',
};

export default RMEditor;