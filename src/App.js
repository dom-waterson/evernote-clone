import React, { useState } from "react";

import { Editor, Sidebar } from "./components";
import "./App.css";

function App() {
  const [selectedNote, setSelectedNote] = useState();
  const [selectedNoteIndex, setSelectedNoteIndex] = useState();

  function selectNote(note, id) {
    console.log("calling", note, id);
    setSelectedNote(note);
    setSelectedNoteIndex(id);
  }

  return (
    <div className="app-container">
      <Sidebar selectNote={selectNote} selectedNoteIndex={selectedNoteIndex} />
      {selectedNote && <Editor selectedNote={selectedNote} />}
    </div>
  );
}

export default App;
