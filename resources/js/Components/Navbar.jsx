import React from "react";
import { Link, usePage } from "@inertiajs/react";

const Navbar = () => {
    const { auth } = usePage().props; // Access user authentication data

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-lg font-bold flex items-center">
                    <span className="material-icons mr-2">home</span> Home
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/categories" className="flex items-center hover:text-blue-400">
                        <span className="material-icons mr-2">category</span> Categories
                    </Link>
                    <Link href="/expenses" className="flex items-center hover:text-blue-400">
                        <span className="material-icons mr-2">attach_money</span> Expenses
                    </Link>
                    {auth.user ? (
                        <>
                            <Link href="/profile" className="flex items-center hover:text-blue-400">
                                <span className="material-icons mr-2">person</span> Profile
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center hover:text-red-400"
                            >
                                <span className="material-icons mr-2">logout</span> Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-blue-400">
                                Login
                            </Link>
                            <Link href="/register" className="hover:text-blue-400">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;