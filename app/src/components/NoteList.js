import React, { Component } from 'react';
import { ColorfulBarLoading } from './ui/Loading';
import NoteViewComponent from './NoteViewItem';

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notes: [],
    }
  }

  componentWillMount() {

    let currentUser = firebase
      .auth()
      .currentUser;
    if (currentUser) {
      let NoteRef = firebase
        .database()
        .ref('user-notes/' + currentUser.uid);
        // .orderByChild('order_desc');

      NoteRef.once('value', (snapshot) => {
        this.setState({
          isLoading: false,
        });
      });
      NoteRef.on('child_added', (data) => {
        let { notes } = this.state;
        let value = data.val();
        // let index = value.order_desc;
        // notes[index] = Object.assign({}, value, { key: data.ref.key });
        value = Object.assign({}, value, { key: data.ref.key });
        notes = [].concat(notes);
        notes.unshift(value);
        this.setState({ notes });
      });
      // NoteRef.on('child_changed', (data) => {
      //   let { notes } = this.state;
      //   let value = data.val();
      //   // let index = value.order_desc;
      //   // if (notes[index]) {
      //   //   notes[index] = Object.assign({}, value, { key: data.ref.key });
      //
      //   this.setState({ notes });
      //   // }
      //   console.log('child_changed', data);
      // });
      // NoteRef.on('child_removed', (data) => {
      //   let notes = Object.assign({}, this.state.notes);
      //   let value = data.val();
      //   let index = value.order_desc;
      //   if (notes[index]) {
      //     this.removeNote(notes[index]);
      //     delete notes[index];
      //     this.setState({ notes });
      //   }
      // });
    }
  }

  componentDidMount() {
  }

  selectNote(note) {
    let { onSelectNote } = this.props;
    onSelectNote(note);
  }

  removeNote(note) {
    let { onRemoveNote } = this.props;
    onRemoveNote(note);
  }

  openNewNoteEditor() {
    let { onOpenNewNoteEditor }  = this.props;
    onOpenNewNoteEditor();
  }

  renderNoteViews() {
    // let result = [];
    let { notes, isLoading } = this.state;
    if (isLoading) {
      return (
        <ColorfulBarLoading />
      );
    }
    return notes.map((note) => {
      return <NoteViewComponent
        key={note.key}
        note={note}
        onSelectNote={this.selectNote.bind(this, note)}
        onRemoveNote={this.removeNote.bind(this, note)}
      />
    });
    // for (var id in notes) {
    //   result.push(<NoteViewComponent
    //     key={id}
    //     note={notes[id]}
    //     onSelectNote={this.selectNote.bind(this, notes[id])}
    //     onRemoveNote={this.removeNote.bind(this, notes[id])}
    //   />);
    // }
    // return result;
  }

  render() {
    return (
      <div className="sidebar-notes" ref="noteList">
        <div className="sidebar-notes-toolbar">
          <div className="sidebar-notes-searcher">
            <span className="icon-search"/>
            <input
              type="text"
              placeholder="搜索笔记"
              className="sidebar-notes-searcher__text-input"/>
          </div>
          <span className="icon-pencil2 sidebar-notes-toolbar__addnote"
                onClick={this.openNewNoteEditor.bind(this)}/>
        </div>
        <div className="sidebar-notesview">
          {/*<div className="notelist-box">*/}
          {this.renderNoteViews()}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}