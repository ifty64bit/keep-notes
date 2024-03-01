import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout-public")({
    component: () => (
        <div className="">
            <Outlet />
        </div>
    ),
});
