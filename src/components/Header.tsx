import { useNavigate } from "@tanstack/react-router";
import { auth } from "../utils/firebase";

function Header() {
    const navigate = useNavigate();
    const user = auth.currentUser;

    return (
        <header className="header-glass h-16 px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-white"
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
                <h3 className="text-lg font-semibold text-surface-800">
                    {user?.displayName ? (
                        <>
                            Welcome,{" "}
                            <span className="text-gradient">
                                {user.displayName}
                            </span>
                        </>
                    ) : (
                        "Keep Notes"
                    )}
                </h3>
            </div>

            <div className="relative has-submenu">
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-100 transition-colors">
                    <img
                        src={user?.photoURL || "/user-circle-svgrepo-com.png"}
                        alt={user?.displayName || "User"}
                        className="w-9 h-9 rounded-full ring-2 ring-primary-200 object-cover"
                    />
                </button>

                <ul className="absolute right-0 top-full mt-2 min-w-[140px] glass-card rounded-xl overflow-hidden">
                    <li
                        className="px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-primary-50 text-surface-700 transition-colors flex items-center gap-2"
                        onClick={async () => {
                            await auth.signOut();
                            navigate({ to: "/" });
                        }}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Logout
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
