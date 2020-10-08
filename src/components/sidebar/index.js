import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/sidebar";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "./sidebarItem";

function Sidebar({
  notes,
  classes,
  selectedNoteIndex,
  newNote,
  selectNote,
  deleteNote,
}) {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setTitle(null);
    setAddingNote((addingNote) => !addingNote);
  };

  const updateTitle = (txt) => {
    setTitle(txt);
  };

  const newNoteUpdate = () => {
    newNote(title);
    setTitle(null);
    setAddingNote(false);
  };

  const onSelectNote = (n, i) => selectNote(n, i);
  const onDeleteNote = (note) => deleteNote(note);

  return notes ? (
    <div className={classes.sidebarContainer}>
      <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
        {addingNote ? "Cancel" : "New Note"}
      </Button>
      {addingNote ? (
        <div>
          <input
            type="text"
            className={classes.newNoteInput}
            placeholder="Enter note title"
            onKeyUp={(e) => updateTitle(e.target.value)}
          ></input>
          <Button className={classes.newNoteSubmitBtn} onClick={newNoteUpdate}>
            Submit Note
          </Button>
        </div>
      ) : null}
      <List>
        {notes.map((_note, _index) => {
          return (
            <div key={_index}>
              <SidebarItem
                _note={_note}
                _index={_index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={onSelectNote}
                deleteNote={onDeleteNote}
              ></SidebarItem>
              <Divider></Divider>
            </div>
          );
        })}
      </List>
    </div>
  ) : null;
}

export default withStyles(styles)(Sidebar);
