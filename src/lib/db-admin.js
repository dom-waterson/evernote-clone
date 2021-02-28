import { db } from "./firebase-admin";

export async function getUserNotes(uid) {
  const snapshot = await db
    .collection("notes")
    .where("authorId", "==", uid)
    .get();

  const notes = [];

  snapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return { notes };
}

export async function getAllNotes() {
  const snapshot = await db.collection("notes").get();
  const notes = [];

  snapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return { notes };
}
