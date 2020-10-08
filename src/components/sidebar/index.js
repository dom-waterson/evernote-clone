import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";

import styles from "./styles/sidebar";
import SidebarItem from "./sidebarItem";
import { FirebaseContext } from "../../context";

function Sidebar({ classes, selectNote, selectedNoteIndex }) {
  const { firebase } = useContext(FirebaseContext);

  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);
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

  const newNoteBtnClick = () => {
    setTitle(null);
    setAddingNote((addingNote) => !addingNote);
  };

  const updateTitle = (txt) => {
    setTitle(txt);
  };

  const newNoteUpdate = async () => {
    const note = {
      title: title,
      body: "",
    };

    await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTitle(null);
    setAddingNote(false);
  };

  // const onSelectNote = (n, i) => selectNote(n, i);

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
