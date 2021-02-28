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
  return firestore
    .collection("notes")
    .doc()
    .set(data)
    .then(() => data);
}

export function deleteNote(id) {
  return firestore
    .collection("notes")
    .doc(id)
    .delete()
    .then(() => id);
}
