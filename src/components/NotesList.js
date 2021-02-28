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

function Sidebar({ classes, selectNote }) {
  const { user } = useAuth();
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const { data } = useQuery(["notes", user.token], () =>
    fetcher("api/notes", user.token)
  );

  const newNoteBtnClick = () => {
    setTitle(null);
    setAddingNote((addingNote) => !addingNote);
  };

  return data?.notes ? (
    <div className={classes.sidebarContainer}>
      <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
        {addingNote ? "Cancel" : "New Note"}
      </Button>
      {addingNote && <AddNote />}
      <List>
        {data.notes.map((_note, _index) => {
          return (
            <div key={_index}>
              <NotesListItem
                _note={_note}
                _index={_index}
                selectNote={selectNote}
              ></NotesListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  ) : null;
}

export default withStyles(styles)(Sidebar);
