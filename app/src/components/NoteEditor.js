import React, { Component } from 'react';
import { Editor, ContentState, EditorState } from 'draft-js';
console.log(ContentState);
import 'medium-draft/lib/index.css';
import * as Note from '../helper/db/note';


export default class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                title: '',
                content: '',
            },
            editorState: EditorState.createEmpty(),
        };
        this.onChange = (editorState) => {
            this.setState({ editorState });
        };

    }

    componentWillMount() {
    }

    componentDidMount() {
        this.refs.editor.focus();
    }

    componentWillReceiveProps(nextprops) {
        let { note } = nextprops;
        let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid + '/' + note.key);
        NoteRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            let note = Object.assign({}, snapshot.val(), { key: snapshot.ref.key });
            this.setState({ note, });
            this.setState({
                editorState: createEditorState(note.content)
            });
        });
    };

    handleTitleChange(event) {
        let { note } = this.state;
        note.title = event.target.value;
        this.setState({ note, });
    }

    handleInputChange(text, meduim) {
        let { note } = this.state;
        note.content = text;
        this.setState({ note, });
    }


    save() {
        let { note } = this.state;
        Note.save(window.currentUser.uid, note);
        console.log('saved');

    }

    render() {
        const { editorState } = this.state;
        return (
            <div className="editor">
                <div>
                    <input
                        className="editor-input__title"
                        type="text"
                        value={this.state.note.title}
                        onChange={this.handleTitleChange.bind(this)} />
                    <Editor
                        ref="editor"
                        editorState={editorState}
                        onChange={this.onChange} />
                </div>
                <button className="button button-action button-rounded button-small"
                    onClick={this.save.bind(this)}>保存</button>
            </div>
        )
    }
}