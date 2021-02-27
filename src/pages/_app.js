import { FirebaseProvider } from "@/context/firebase";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
