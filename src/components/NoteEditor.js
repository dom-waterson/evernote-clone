import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

import styles from "@/styles/noteEditor";
import { updateNote } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { useSelectedNote } from "@/context/selectedNote";
import { debounce } from "@/utils/helpers";

function Editor({ classes }) {
  const { selectedNote } = useSelectedNote();
  const [title, setTitle] = useState(selectedNote.title);
  const [body, setBody] = useState(selectedNote.body);
  const [id, setId] = useState(selectedNote.id);

  const updateDB = useCallback(
    debounce(
      (title, body, id) =>
        updateNoteMutation.mutate({
          title,
          body,
          id,
        }),
      1500
    ),
    []
  );

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
    if (title !== selectedNote.title || body !== selectedNote.body) {
      updateDB(title, body, id);
    }
  }, [title, body]);

  return (
    <div className={classes.editorContainer}>
      <Input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={body} onChange={(body) => setBody(body)} />
    </div>
  );
}

export default withStyles(styles)(Editor);
