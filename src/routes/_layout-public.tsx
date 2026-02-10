import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout-public")({
    component: () => (
        <div className="min-h-screen bg-gradient-hero">
            <Outlet />
        </div>
    ),
});
