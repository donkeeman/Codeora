import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import Router from "./Router";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <div className="App">
                    <GlobalStyle />
                    <Router />
                    <ReactQueryDevtools />
                </div>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
