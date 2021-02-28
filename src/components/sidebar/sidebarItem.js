import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./styles/sidebarItem";
import { removeHTMLTags } from "@/utils/helpers";
import { deleteNote } from "@/lib/db";

function SidebarItem({ _index, _note, classes }) {
  const onDeleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      deleteNote(note.id);
    }
  };

  return (
    <div key={_index}>
      <ListItem className={classes.listItem} alignItems="flex-start">
        <div className={classes.textSection}>
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
