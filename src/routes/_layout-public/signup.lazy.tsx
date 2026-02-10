import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import Button from "../../components/Button";
import { signupWithEmailPassword } from "../../utils/firebase";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/_layout-public/signup")({
    component: Signup,
});

function Signup() {
    const navigate = useNavigate();

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get("email") as string;
        const password = form.get("password") as string;
        const confirmPassword = form.get("confirmPassword") as string;

        if (!email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const user = await signupWithEmailPassword(email, password);
        if (user) {
            navigate({ to: "/dashboard" });
        } else {
            toast.error("Failed to sign up!");
        }
    }

    return (
        <section className="min-h-screen flex flex-col md:flex-row gap-12 justify-center items-center px-6 py-12">
            {/* Heading */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-surface-800">
                    Create
                    <br />
                    <span className="text-gradient">Account</span>
                </h1>
                <p className="mt-4 text-surface-500">
                    Start organizing your notes today
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
                    <div>
                        <label className="block text-sm font-medium text-surface-600 mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="input"
                        />
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                        Create Account
                    </Button>

                    <p className="text-center text-sm text-surface-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
