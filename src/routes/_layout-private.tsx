import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "../utils/firebase";
import Header from "../components/Header";

export const Route = createFileRoute("/_layout-private")({
    component: () => (
        <>
            <Header/>
            <Outlet />
        </>
    ),
    beforeLoad: async () => {
        await auth.authStateReady();
        if (!auth.currentUser) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            });
        }
    },
});
