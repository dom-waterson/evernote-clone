import { useState } from "react";

import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "@/lib/auth";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function NotesPage() {
  const [selectedNote, setSelectedNote] = useState();

  const classes = useStyles();
  const { user, signout } = useAuth();

  if (!user) {
    return <h1>Loading... </h1>;
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Evernote clone
          </Typography>
          <Button className={classes.button} onClick={signout}>
            Sign out
          </Button>
          <Avatar alt={user.name} src={user.photoUrl} />
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "64px", height: "100vh" }}>
        <NotesList setSelectedNote={setSelectedNote} />
        {selectedNote && (
          <NoteEditor
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
        )}
      </div>
    </>
  );
}

export default NotesPage;
