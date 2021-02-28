import { getUserNotes, getAllNotes } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async (req, res) => {
  try {
    // const { uid } = await auth.verifyIdToken(req.headers.token);
    // const { notes } = await getUserNotes(uid);
    const { notes } = await getAllNotes();

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error });
  }
};
