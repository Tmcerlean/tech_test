import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./assets/index";
import "./globals.css";
import Main from "./main";


const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root")!);

root.render(
    <QueryClientProvider client={queryClient}>
        <Main />
    </QueryClientProvider>
);