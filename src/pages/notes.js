import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function NotesPage() {
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
      <Sidebar />
    </>
  );
}

export default NotesPage;
