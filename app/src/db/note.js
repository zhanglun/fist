import firebase from 'firebase';

export function add(userid, note) {
  let { title, content } = Object.assign({}, note);
  // A post entry.
  let postData = {
    content,
    title,
    author_id: userid,
    create_time: new Date(),
    update_time: new Date(),
  };

  // Get a key for a new Post.
  let newNoteKey = firebase.database().ref().child('notes').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
  postData.id = newNoteKey;
  updates['/notes/' + newNoteKey] = postData;
  updates['/user-notes/' + userid + '/' + newNoteKey] = postData;

  return firebase.database().ref().update(updates);
}

export function update(userid, note) {
  // let noteRef = firebase.database().ref('posts/' + note+ '/starCount');
}

