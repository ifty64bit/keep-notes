import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import Button from "../../components/Button";
import { loginWithGoogle } from "../../utils/firebase";
import GoogleIcon from "../../assets/GoogleIcon";

export const Route = createLazyFileRoute("/_layout-public/")({
    component: Index,
});

function Index() {
    const navigate = useNavigate();

    async function handleGoogleLogin() {
        const user = await loginWithGoogle();
        if (user) {
            navigate({ to: "/dashboard" });
        }
    }

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12">
            <div className="text-center max-w-md">
                {/* Logo */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <svg
                        className="w-9 h-9 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </div>

                {/* Hero text */}
                <h1 className="text-4xl sm:text-5xl font-bold text-surface-800 leading-tight mb-2">
                    Your Notes,
                    <br />
                    <span className="text-gradient">On The Cloud.</span>
                </h1>
                <p className="text-surface-500 text-lg mb-10">
                    Access anywhere. Anytime. On any device.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <Button
                        variant="primary"
                        icon={<GoogleIcon className="w-5 h-5" />}
                        iconPosition="left"
                        onClick={handleGoogleLogin}
                        className="w-full"
                    >
                        Continue with Google
                    </Button>

                    <Link to="/signup" className="w-full">
                        <Button variant="outline" className="w-full">
                            Sign Up
                        </Button>
                    </Link>

                    <Link to="/login" className="w-full">
                        <Button variant="ghost" className="w-full">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
