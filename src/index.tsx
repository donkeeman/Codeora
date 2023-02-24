import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./Configs/queryClient";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                <App />
                </BrowserRouter>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);
