import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/editor";
import { useDebounce } from "../../hooks";

function Editor({ classes }) {
  const [note, setNote] = useState({ title: "", text: "" });
  const debouncedValue = useDebounce(note, 1500);

  useEffect(() => {
    console.log("Updating", debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={note.title}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
        }}
      ></input>
      <ReactQuill
        value={note.text}
        onChange={(text) => setNote({ ...note, text })}
      ></ReactQuill>
    </div>
  );
}

export default withStyles(styles)(Editor);
