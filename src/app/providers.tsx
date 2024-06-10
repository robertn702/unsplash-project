"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";

const queryClient = new QueryClient()

export type ProvidersProps = Readonly<{
  children: ReactNode
}>

export default function Providers({children}: ProvidersProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}