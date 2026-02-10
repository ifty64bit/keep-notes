import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "../utils/firebase";
import Header from "../components/Header";

export const Route = createFileRoute("/_layout-private")({
    component: () => (
        <div className="min-h-screen bg-surface-50">
            <Header />
            <main className="pb-20">
                <Outlet />
            </main>
        </div>
    ),
    beforeLoad: async () => {
        await auth.authStateReady();
        if (!auth.currentUser) {
            throw redirect({
                to: "/",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
});
