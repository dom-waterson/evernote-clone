import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/editor";
import { FirebaseContext } from "../../context";
import { useDebounce } from "../../hooks";

function Editor({ classes, selectedNote }) {
  const { firebase } = useContext(FirebaseContext);
  const [note, setNote] = useState({
    title: selectedNote.title,
    body: selectedNote.body,
    id: selectedNote.id,
  });
  const [firstLoad, setFirstLoad] = useState(true);
  const debouncedNote = useDebounce(note, 1500);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      firebase.firestore().collection("notes").doc(note.id).update({
        title: note.title,
        body: note.body,
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNote]);

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon} />
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={note.title}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
        }}
      ></input>
      <ReactQuill
        value={note.body}
        onChange={(body) => {
          setNote({ ...note, body });
        }}
      ></ReactQuill>
    </div>
  );
}

export default withStyles(styles)(Editor);