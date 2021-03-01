import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { removeHTMLTags } from "@/utils/helpers";
import DeleteNote from "@/components/DeleteNote";
import styles from "@/styles/notesListItem";

function SidebarItem({ _index, _note, classes, setSelectedNote }) {
  return (
    <div key={_index}>
      <ListItem
        className={classes.listItem}
        alignItems="flex-start"
        onClick={() => setSelectedNote(_note)}
      >
        <div className={classes.textSection}>
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteNote note={_note} />
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(SidebarItem);
