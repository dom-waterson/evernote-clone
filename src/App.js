import React, { useEffect, useState, useContext } from "react";

import { FirebaseContext } from "./context";

function App() {
  const { firebase } = useContext(FirebaseContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setNotes(notes);
      });
  }, [firebase]);

  return (
    <div>
      <h1>Evernote Clone!</h1>
      <ol>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
