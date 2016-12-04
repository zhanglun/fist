import firebase from 'firebase';


export function add(userid, note) {
  let { title, content } = Object.assign({}, note);
  // A post entry.
  let postData = {
    content,
    title,
    author_id: userid,
    create_time: note.create_time,
    update_time: new Date(),
    order_desc: -new Date(),
  };

  // Get a key for a new Post.
  let newNoteKey = firebase.database().ref().child('notes').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
  updates['/notes/' + newNoteKey] = postData;
  // 保存到用户的数据去掉 html 标签
  updates['/user-notes/' + userid + '/' + newNoteKey] = postData;

  return firebase.database().ref().update(updates);
}

export function update(userid, key, data) {
  let updates = {};
  updates['/notes/' + key] = data;
  updates['/user-notes/' + userid + '/' + key] = data;
  return firebase.database().ref().update(updates);

}

export function save(userid, note) {
  if (note.key) {
    let data = JSON.parse(JSON.stringify(note));
    delete data.key;
    data.update_time = new Date();
    data.order_desc = -new Date();

    update(userid, note.key, data);
  } else {
    note.create_time = new Date();
    add(userid, note);
  }
  // let noteRef = firebase.database().ref('posts/' + note+ '/starCount');
}

