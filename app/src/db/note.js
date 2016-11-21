import firebase from 'firebase';

export function add(userid, user, note) {
  console.log(firebase.auth().currentUser);
  let { title, content } = Object.assign({}, note);
  // A post entry.
  let postData = {
    author: userid,
    content,
    title,
  };

  // Get a key for a new Post.
  let newNoteKey = firebase.database().ref().child('notes').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
  updates['/notes/' + newNoteKey] = postData;
  updates['/user-notes/' + userid + '/' + newNoteKey] = postData;

  return firebase.database().ref().update(updates);
}


export function getAll(userid,) {

}