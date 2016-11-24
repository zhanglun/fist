import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SimpleMDE from 'simplemde';
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
    let simplemde = new SimpleMDE({
      // autofocus: true,
      autosave: {
        enabled: true,
        uniqueId: "MyUniqueID",
        delay: 1000,
      },
      blockStyles: {
        bold: "__",
        italic: "_"
      },
      element: document.getElementById("editor"),
      forceSync: true,
      hideIcons: ["guide", "heading"],
      indentWithTabs: false,
      initialValue: "Hello world!",
      insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      },
      lineWrapping: false,
      parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: false,
        underscoresBreakWords: true,
      },
      placeholder: "Type here...",
      previewRender: function (plainText) {
        return customMarkdownParser(plainText); // Returns HTML from a custom parser
      },
      // previewRender: function (plainText, preview) { // Async method
      //   setTimeout(function () {
      //     preview.innerHTML = customMarkdownParser(plainText);
      //   }, 250);

      // return "Loading...";
      // },
      promptURLs: true,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
      shortcuts: {
        drawTable: "Cmd-Alt-T"
      },
      showIcons: ["code", "table"],
      // spellChecker: false,
      status: false,
      // status: ["autosave", "lines", "words", "cursor"], // Optional usage
      // status: ["autosave", "lines", "words", "cursor", {
      //   className: "keystrokes",
      //   defaultValue: function (el) {
      //     this.keystrokes = 0;
      //     el.innerHTML = "0 Keystrokes";
      //   },
      //   onUpdate: function (el) {
      //     el.innerHTML = ++this.keystrokes + " Keystrokes";
      //   }
      // }], // Another optional usage, with a custom status bar item that counts keystrokes
      styleSelectedText: false,
      tabSize: 2,
      // toolbar: false,
      // toolbarTips: false,
    });
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
          <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
          <textarea id="editor"></textarea>
        </div>
        <button onClick={this.save.bind(this)}>保存</button>
      </div>
    )
  }
}