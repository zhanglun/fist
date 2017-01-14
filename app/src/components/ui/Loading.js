import React, { Component } from 'react';

export class ColorfulBarLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  render() {
    return (
      <div className="loading loading-colorfulbar">
        <div className="loading-elem">
          <div className="loading-elem-bar"></div>
          <div className="loading-elem-bar"></div>
          <div className="loading-elem-bar"></div>
          <div className="loading-elem-bar"></div>
        </div>
        <div className="loading-text">{this.state.text}</div>
      </div>
    )
  }
}

export class SignalLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading loading-signal">
        <div className="loading-elem"></div>
        <div className="loading-text">{this.state.text}</div>
      </div>
    )
  }
}