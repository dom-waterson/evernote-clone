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
  const site = firestore.collection("notes").doc();
  return site.set(data).then(() => ({ id: site.id, ...data }));
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
    .update(newValues)
    .then(() => newValues);
}
