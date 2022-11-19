import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SignIn from "./Pages/SignIn";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <SignIn />
                <ReactQueryDevtools />
            </div>
        </QueryClientProvider>
    );
}

export default App;
