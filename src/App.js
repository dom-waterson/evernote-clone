import React, { useEffect, useState, useContext } from "react";

import { Editor, Sidebar } from "./components";
import "./App.css";
import { FirebaseContext } from "./context";

function App() {
  const { firebase } = useContext(FirebaseContext);
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState();
  const [selectedNote, setSelectedNote] = useState();

  function deleteNote(note) {
    console.log("deleteNote called");
  }

  function selectNote(note, index) {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  }

  function newNote(title) {
    console.log("newNote called");
  }

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
      <Sidebar
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      />
      {selectedNote && <Editor selectedNote={selectedNote} />}
    </div>
  );
}

export default App;
