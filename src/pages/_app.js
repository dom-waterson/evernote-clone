import { CssBaseline } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "@/lib/auth";

const queryClient = new QueryClient();

import "@/styles/App.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
