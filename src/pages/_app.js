import { CssBaseline } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthProvider } from "@/lib/auth";
import { SelectedNoteProvider } from "@/context/selectedNote";

const queryClient = new QueryClient();

import "@/styles/App.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <SelectedNoteProvider>
          <Component {...pageProps} />
        </SelectedNoteProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
