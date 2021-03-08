import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Input } from "@material-ui/core";

import { useAuth } from "@/lib/auth";
import { createNote } from "@/lib/db";
import { useSelectedNote } from "@/context/selectedNote";

function AddNote({ setAddingNote }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { setSelectedNote } = useSelectedNote();

  const [title, setTitle] = useState();

  const newNoteMutation = useMutation((note) => createNote(note), {
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", user.token], (oldData) => {
        setTitle(null);
        setAddingNote(false);
        setSelectedNote(data);
        return {
          notes: [data, ...oldData.notes],
        };
      });
    },
  });

  const newNoteUpdate = () => {
    const note = {
      authorId: user.uid,
      title: title,
      body: "<p><br><p>",
    };

    newNoteMutation.mutate(note);
  };

  return (
    <div>
      <Input
        fullWidth
        type="text"
        placeholder="Enter note title"
        onKeyUp={(e) => setTitle(e.target.value)}
      />
      <Button onClick={newNoteUpdate}>Submit Note</Button>
    </div>
  );
}

export default AddNote;
