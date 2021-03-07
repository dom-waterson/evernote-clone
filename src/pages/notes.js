import Head from "next/head";

import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "@/lib/auth";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { useSelectedNote } from "@/context/selectedNote";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function NotesPage() {
  const { selectedNote } = useSelectedNote();

  const classes = useStyles();
  const { user, signout } = useAuth();

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('evernote-clone-auth')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      {user ? (
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
            <NotesList />
            {selectedNote && <NoteEditor />}
          </div>
        </>
      ) : (
        <h1>Loading ....</h1>
      )}
    </>
  );
}

export default NotesPage;
