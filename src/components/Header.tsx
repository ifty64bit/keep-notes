import { useNavigate } from "@tanstack/react-router";
import { auth } from "../utils/firebase";

function Header() {
    const navigate = useNavigate();
    const user = auth.currentUser;
    return (
        <header className="h-20 px-5 flex justify-between items-center bg-[#A5DD9B]">
            <div>
                <h3 className="text-xl font-semibold">
                    Welcome{user?.displayName ? ", " + user.displayName : ""}
                </h3>
            </div>
            <div className="relative has-submenu ">
                <div>
                    <img
                        src={user?.photoURL || "/user-circle-svgrepo-com.png"}
                        alt={user?.displayName || "User"}
                        width={40}
                        className="rounded-full "
                    />
                </div>
                <ul className="absolute flex-col -left-5 -bottom-10 bg-[#A5DD9B] shadow-xl rounded overflow-hidden border">
                    <li
                        className="hover:bg-[#c2e9bb] bg-opacity-30 cursor-pointer px-2 py-1"
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
