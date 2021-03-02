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
  return note
    .set({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => ({ id: note.id, ...data }));
}

export function deleteNote(id) {
  return firestore
    .collection("notes")
    .doc(id)
    .delete()
    .then(() => id);
}

export function updateNote(newValues) {
  return firestore
    .collection("notes")
    .doc(newValues.id)
    .update({
      ...newValues,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => newValues);
}
