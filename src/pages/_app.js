import { FirebaseProvider } from "@/context/firebase";
import { AuthProvider } from "@/lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
