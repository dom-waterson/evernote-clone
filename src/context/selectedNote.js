import { createContext, useContext, useState } from "react";

const SelectedNoteContext = createContext();

export function useSelectedNote() {
  return useContext(SelectedNoteContext);
}

export function SelectedNoteProvider({ children }) {
  const [selectedNote, setSelectedNote] = useState();

  return (
    <SelectedNoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
    </SelectedNoteContext.Provider>
  );
}
