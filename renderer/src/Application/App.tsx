import { useState, Suspense } from "react";
import "./App.css";
import { trpc } from "./utils/trpc";
import Home from "../View/pages/home/index";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ipcLink} from "../Infranstructure/services/IpcServices/IpcLink";
import RenderRouter from "./routers";
import {history, HistoryRouter} from "./routers/history";
import {Spin} from 'antd'
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
 // const { theme, loading } = useState( );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/*<Home />*/}
        <HistoryRouter history={history}>
          <Suspense fallback={null}>
            <Spin
              spinning={true}
              className="app-loading-wrapper"
              tip="dsdsd"
            ></Spin>
        <RenderRouter/>
          </Suspense>
        </HistoryRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
