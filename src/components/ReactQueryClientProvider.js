"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function ReactQueryClientProvider({children}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryClientProvider;
