import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { signupWithEmailPassword } from "../../utils/firebase";
import Button from "../../components/Button";

function Signup() {
    const navigate = useNavigate();

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

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
            toast.success("Account created!");
            navigate({
                to: "/dashboard",
            });
        } else {
            toast.error("Failed to create account!");
        }
    }

    return (
        <section className="flex flex-col md:flex-row gap-10 justify-center items-center min-h-screen">
            <h3 className="text-5xl font-bold">Create Account!</h3>
            <div>
                <form
                    onSubmit={handleFormSubmit}
                    className="[&_input]:border [&_input]:rounded-lg [&_input]:p-2 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 space-y-4"
                >
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                        />
                    </div>
                    <div>
                        <Button className="self-start">Signup</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export const Route = createLazyFileRoute("/_layout-public/signup")({
    component: Signup,
});
