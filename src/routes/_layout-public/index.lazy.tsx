import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/GoogleIcon";
import { loginWithGoogle } from "../../utils/firebase";

export const Route = createLazyFileRoute("/_layout-public/")({
    component: Index,
});

function Index() {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen flex flex-wrap gap-10 justify-center items-center">
            <div className="hidden md:block">
                <img src="/sticky-note.png" alt="note" width={400} />
            </div>
            <div>
                <h1 className="text-5xl font-extrabold leading-normal">
                    Your Notes
                    <br />
                    On The Cloud.
                    <br /> Anywhere!
                    <br /> Anytime!
                </h1>
                <div>
                    <p className="my-4">Get started today!</p>
                    <div className="flex gap-4">
                        <Button
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
                        <Link to="/signup">
                            <Button>Signup</Button>
                        </Link>
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
