"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

function ReactQueryClientProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryClientProvider;
