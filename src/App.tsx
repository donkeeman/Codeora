import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import GlobalStyle from "./GlobalStyle";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <div className="App">
                    <GlobalStyle />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </BrowserRouter>
                    <ReactQueryDevtools />
                </div>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
