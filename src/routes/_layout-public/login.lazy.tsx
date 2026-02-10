import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import Button from "../../components/Button";
import { loginWithEmailPassword, loginWithGoogle } from "../../utils/firebase";
import { toast } from "react-toastify";
import GoogleIcon from "../../assets/GoogleIcon";

export const Route = createLazyFileRoute("/_layout-public/login")({
    component: Login,
});

function Login() {
    const navigate = useNavigate();

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get("email") as string;
        const password = form.get("password") as string;

        if (!email || !password) {
            toast.error("All fields are required!");
            return;
        }

        const user = await loginWithEmailPassword(email, password);
        if (user) {
            navigate({ to: "/dashboard" });
        } else {
            toast.error("Failed to login!");
        }
    }

    return (
        <section className="min-h-screen flex flex-col md:flex-row gap-12 justify-center items-center px-6 py-12">
            {/* Heading */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-surface-800">
                    Welcome
                    <br />
                    <span className="text-gradient">Back!</span>
                </h1>
                <p className="mt-4 text-surface-500">
                    Sign in to access your notes
                </p>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-sm">
                <form
                    className="glass-card rounded-2xl p-6 space-y-4"
                    onSubmit={handleFormSubmit}
                >
                    <div>
                        <label className="block text-sm font-medium text-surface-600 mb-1.5">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-600 mb-1.5">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="input"
                        />
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                        Sign In
                    </Button>

                    <div className="relative flex items-center justify-center py-1">
                        <div className="border-t border-surface-200 w-full" />
                        <span className="absolute bg-white px-3 text-xs text-surface-400">
                            or
                        </span>
                    </div>

                    <Button
                        type="button"
                        variant="secondary"
                        icon={<GoogleIcon className="w-5 h-5" />}
                        iconPosition="left"
                        className="w-full"
                        onClick={async () => {
                            const user = await loginWithGoogle();
                            if (user) navigate({ to: "/dashboard" });
                        }}
                    >
                        Continue with Google
                    </Button>

                    <p className="text-center text-sm text-surface-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
