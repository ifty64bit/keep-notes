import {
    createRootRouteWithContext,
    Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRouteWithContext()({
    component: () => (
        <>
            <Outlet />
            <ToastContainer />
            <TanStackRouterDevtools />
        </>
    ),
    
    notFoundComponent: () => <p>Opps!</p>,
});
