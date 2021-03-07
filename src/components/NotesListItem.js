import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { removeHTMLTags } from "@/utils/helpers";
import DeleteNote from "@/components/DeleteNote";
import styles from "@/styles/notesListItem";
import { useSelectedNote } from "@/context/selectedNote";

function SidebarItem({ note, classes }) {
  const { setSelectedNote, selectedNote } = useSelectedNote();
  return (
    <div>
      <ListItem
        className={classes.listItem}
        alignItems="flex-start"
        onClick={() => setSelectedNote(note)}
        selected={selectedNote?.id === note.id}
      >
        <div className={classes.textSection}>
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteNote note={note} />
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(SidebarItem);
