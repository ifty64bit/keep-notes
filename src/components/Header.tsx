import { useNavigate } from "@tanstack/react-router";
import { auth } from "../utils/firebase";

function Header() {
    const navigate = useNavigate();
    const user = auth.currentUser;
    return (
        <header className="px-6 py-4 flex justify-between bg-orange-400">
            <div></div>
            <div className="relative has-submenu ">
                <div>
                    <img
                        src={user?.photoURL || "/user-circle-svgrepo-com.png"}
                        alt={user?.displayName || "User"}
                        width={40}
                    />
                </div>
                <ul className="absolute flex-col -left-3 -bottom-12 bg-orange-400 shadow-xl rounded-md overflow-hidden">
                    <li
                        className="hover:bg-orange-500 cursor-pointer px-2 py-1"
                        onClick={async () => {
                            await auth.signOut();
                            navigate({
                                to: "/login",
                            });
                        }}
                    >
                        Logout
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
