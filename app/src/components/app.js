import React, { Component } from 'react';
import EditorComponent from './editor';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Fist</h2>
        <EditorComponent />

      </div>
    )
  }
}