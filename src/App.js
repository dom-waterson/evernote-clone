import React, { useEffect, useState, useContext } from "react";
import { Editor } from "./components";

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
    <div className="app-container">
      <h1>Evernote Clone!</h1>
      <div>
        <ol>
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ol>
      </div>
      <Editor />
    </div>
  );
}

export default App;
