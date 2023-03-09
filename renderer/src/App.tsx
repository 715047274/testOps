import { useState } from "react";
import "./App.css";
import { trpc } from "./utils/trpc";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ipcLink} from "./services/IpcServices/IpcLink";

// FIXME:
// - the generics here are probably unnecessary
// - the RPC-spec could probably be simplified to combine HTTP + WS
/** @internal */
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [ipcLink()],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
