import { useAuth } from "@/lib/auth";

function HomePage() {
  const { signinWithGoogle } = useAuth();

  return (
    <div>
      <button onClick={() => signinWithGoogle()}>Sign in with google</button>
    </div>
  );
}

export default HomePage;
