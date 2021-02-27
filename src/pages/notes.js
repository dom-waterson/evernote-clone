import { useAuth } from "@/lib/auth";

function NotesPage() {
  const { signout } = useAuth();
  return (
    <div>
      Welcome to evernote clone! <button onClick={signout}>Sign out</button>
    </div>
  );
}

export default NotesPage;
