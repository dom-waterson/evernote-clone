import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set(
      {
        uid,
        ...data,
      },
      { merge: true }
    );
}

export function createNote(data) {
  const note = firestore.collection("notes").doc();
  note.set(data);
  return note;
}

export function deleteNote(id) {
  return firestore.collection("notes").doc(id).delete();
}
