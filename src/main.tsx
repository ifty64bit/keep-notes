import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import App from "./App";

// Create a new router instance
export const router = createRouter({
    routeTree,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function Main() {
    return (
        <>
            <StrictMode>
                <App />
            </StrictMode>
        </>
    );
}

// **Create the root only once:**
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Main />);
}
