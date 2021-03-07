import { useQueryClient, useMutation } from "react-query";
import DeleteIcon from "@material-ui/icons/Delete";

import { useAuth } from "@/lib/auth";
import { deleteNote } from "@/lib/db";
import { useSelectedNote } from "@/context/selectedNote";

function DeleteNote({ note }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { setSelectedNote } = useSelectedNote();

  const deleteNoteMutation = useMutation((id) => deleteNote(id), {
    onSuccess: (id) => {
      queryClient.setQueryData(["notes", user.token], (oldData) => {
        setSelectedNote(null);

        return {
          notes: oldData.notes.filter((note) => note.id !== id),
        };
      });
    },
  });

  const onDeleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      deleteNoteMutation.mutate(note.id);
    }
  };

  return <DeleteIcon onClick={() => onDeleteNote(note)}></DeleteIcon>;
}

export default DeleteNote;
