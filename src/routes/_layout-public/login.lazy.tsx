import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
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
            alert("All fields are required!");
            return;
        }

        const user = await loginWithEmailPassword(email, password);
        if (user) {
            navigate({
                to: "/dashboard",
            });
        } else {
            toast.error("Failed to login!");
        }
    }

    return (
        <section className="flex flex-col md:flex-row gap-10 justify-center items-center min-h-screen">
            <h3 className="text-5xl font-bold">
                Get Into Your <br /> Note Vault Now!
            </h3>
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
                    <div className="flex gap-4 items-start">
                        <Button className="" type="submit">
                            Login
                        </Button>
                        <Button
                            type="button"
                            icon={<GoogleIcon />}
                            iconPosition="left"
                            onClick={() => {
                                loginWithGoogle()
                                    .then(() =>
                                        navigate({
                                            to: "/dashboard",
                                        })
                                    )
                                    .catch(console.error);
                            }}
                        >
                            Google
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
