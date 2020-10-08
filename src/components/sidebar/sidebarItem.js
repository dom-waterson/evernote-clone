import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./styles/sidebarItem";
import { FirebaseContext } from "../../context";
import { removeHTMLTags } from "../../helpers";

function SidebarItem({
  _index,
  _note,
  classes,
  selectNote,
  selectedNoteIndex,
}) {
  const { firebase } = useContext(FirebaseContext);

  const onDeleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      firebase.firestore().collection("notes").doc(note.id).delete();
    }
  };

  return (
    <div key={_index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => {
            selectNote(_note, _index);
          }}
        >
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => onDeleteNote(_note)}
          className={classes.deleteIcon}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(SidebarItem);
