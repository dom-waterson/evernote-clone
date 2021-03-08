import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

import styles from "@/styles/noteEditor";
import { useDebounce } from "@/hooks/useDebounce";
import { updateNote } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { useSelectedNote } from "@/context/selectedNote";

function Editor({ classes }) {
  const { selectedNote } = useSelectedNote();
  const [title, setTitle] = useState(selectedNote.title);
  const [body, setBody] = useState(selectedNote.body);
  const [id, setId] = useState(selectedNote.id);

  const titleDebounce = useDebounce(title, 1500);
  const bodyDebounce = useDebounce(body, 1500);

  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateNoteMutation = useMutation((note) => updateNote(note), {
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", user.token], (oldData) => {
        const updatedNotes = oldData.notes.filter(
          (cachedNote) => cachedNote.id !== data.id
        );

        updatedNotes.unshift(data);

        return { notes: updatedNotes };
      });
    },
  });

  useEffect(() => {
    setTitle(selectedNote.title);
    setBody(selectedNote.body);
    setId(selectedNote.id);
  }, [selectedNote]);

  useEffect(() => {
    updateNoteMutation.mutate({
      title,
      body,
      id,
    });
  }, [titleDebounce, bodyDebounce]);

  return (
    <div className={classes.editorContainer}>
      <Input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title}
        onChange={(e) => {
          console.log("changed");
          setTitle(e.target.value);
        }}
      />
      <ReactQuill value={body} onChange={(body) => setBody(body)} />
    </div>
  );
}

export default withStyles(styles)(Editor);
