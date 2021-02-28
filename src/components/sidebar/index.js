import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";

import styles from "./styles/sidebar";
import SidebarItem from "./sidebarItem";
import { useAuth } from "@/lib/auth";
import { createNote } from "@/lib/db";

function Sidebar({ classes, selectNote, notes }) {
  const { user } = useAuth();
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
    const note = {
      authorId: user.uid,
      title: title,
      body: "",
    };

    createNote(note);

    setTitle(null);
    setAddingNote(false);
  };

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
                selectNote={selectNote}
              ></SidebarItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  ) : null;
}

export default withStyles(styles)(Sidebar);
