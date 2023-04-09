import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AuthContextProvider } from "./Context/AuthContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const query = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={query}>
      <AuthContextProvider>
        <Header />
        <Outlet />
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

export default App;
