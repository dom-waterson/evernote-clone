import React, { useState } from "react";

import { Editor, Sidebar } from "./components";
import "./App.css";

function App() {
  const [selectedNote, setSelectedNote] = useState();

  function selectNote(note) {
    setSelectedNote(note);
  }

  return (
    <div className="app-container">
      <Sidebar selectNote={selectNote} />
      {selectedNote && <Editor selectedNote={selectedNote} />}
    </div>
  );
}

export default App;
