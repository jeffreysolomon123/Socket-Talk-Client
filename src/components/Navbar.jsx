import React from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import ThemeToggle from "./ThemeToggle.jsx";
import { VscGithub } from "react-icons/vsc";


const Navbar = () => {
    const { authUser, logout } = useAuthStore();

    return (
        <div className="bg-panel text-main border-b border-surface inter-large navbar shadow-sm">
            <div className="ml-3 flex-1">
                <Link to="/" className="text-xl text-main">Socket-Talk</Link>
            </div>

            <div className="flex gap-2">
                <div className="text-2xl mr-3 mt-1.5">
                    <Link to="https://github.com/jeffreysolomon123/Socket-Talk-Client"><VscGithub /></Link>
                </div>
                <div className="mr-3 mt-1">
                    <ThemeToggle />
                </div>



                {authUser && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className=" mr-4 btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={authUser.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 w-60 p-3 bg-surface shadow menu menu-sm dropdown-content text-main rounded-box z-1"
                        >
                            <li><Link to="/profile" className="text-sm">Profile</Link></li>
                            <li>
                                <button className="text-sm" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
