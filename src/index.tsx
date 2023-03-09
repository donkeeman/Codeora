import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import Router from "./Configs/Router";
import { queryClient } from "./Configs/queryClient";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={Router} />
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);
