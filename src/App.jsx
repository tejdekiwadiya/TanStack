{/* 13 KB FILES SIZE */ }
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

import { MainComponet } from "./componets/MainComponet";
import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');


function App() {
  const queryClient = new QueryClient();
  return (
    <>

      {/*  Shallow Comparison To Data Change Detection */}

      <QueryClientProvider client={queryClient}>
        {/* DEV TOOL FOR DEBUGING QUERIES CALL INITIALLY FALSE FOR NOT TOGGLE TOOL */}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" position="bottom" />
        <MainComponet />
      </QueryClientProvider>
    </>
  )
}

export default App
