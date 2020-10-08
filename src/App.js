import React, { useEffect, useState, useContext } from "react";
import { Editor, Sidebar } from "./components";

import { FirebaseContext } from "./context";

function App() {
  const { firebase } = useContext(FirebaseContext);
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState();
  const [selectedNote, setSelectedNote] = useState();

  function deleteNote() {
    console.log("deleteNote called");
  }

  function selectNote() {
    console.log("selectNote called");
  }

  function newNote() {
    console.log("newNote called");
  }

  function noteUpdate() {
    console.log("noteUpdate called");
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
      {selectedNote && (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      )}
    </div>
  );
}

export default App;
