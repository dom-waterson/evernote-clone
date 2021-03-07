import { useState } from "react";
import { useQuery } from "react-query";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";

import styles from "@/styles/notesList";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import AddNote from "@/components/AddNote";
import NotesListItem from "@/components/NotesListItem";

function Sidebar({ classes }) {
  const { user } = useAuth();
  const [addingNote, setAddingNote] = useState(false);

  const { data } = useQuery(["notes", user.token], () =>
    fetcher("api/notes", user.token)
  );

  const newNoteBtnClick = () => {
    setAddingNote((addingNote) => !addingNote);
  };

  return data?.notes ? (
    <div className={classes.sidebarContainer}>
      <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
        {addingNote ? "Cancel" : "New Note"}
      </Button>
      {addingNote && <AddNote />}
      <List>
        {data.notes.map((note) => {
          return (
            <div key={note.id}>
              <NotesListItem note={note} />
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  ) : null;
}

export default withStyles(styles)(Sidebar);
