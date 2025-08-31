import React from "react";
import AppLayout from "../../Layouts/AppLayout";
import { useForm, usePage } from "@inertiajs/react";

const EditProfile = () => {
    const { auth, mustVerifyEmail, status } = usePage().props; // Use Inertia props
    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name || "",
        email: auth.user.email || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form to update the user's profile
        patch(route("profile.update"), {
            onSuccess: () => {
                alert("Profile updated successfully!");
            },
        });
    };

    return (
        <AppLayout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

                {/* Status Message */}
                {status && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/* Name Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs italic mt-2">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Email Verification Notice */}
                    {mustVerifyEmail && !auth.user.email_verified_at && (
                        <div className="mb-4">
                            <p className="text-sm text-yellow-600">
                                Your email is not verified.{" "}
                                <a
                                    href={route("verification.send")}
                                    className="text-blue-500 underline"
                                >
                                    Click here to resend the verification email.
                                </a>
                            </p>
                        </div>
                    )}

                    {/* Password Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Password Confirmation Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs italic mt-2">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={processing}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

                {/* Delete Account Section */}
                <div className="bg-red-50 border border-red-200 p-4 rounded">
                    <h2 className="text-lg font-bold mb-2 text-red-600">Delete Account</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <form
                        method="POST"
                        action={route("profile.destroy")}
                        onSubmit={(e) => {
                            if (!confirm("Are you sure you want to delete your account?")) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input type="hidden" name="_method" value="DELETE" />
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditProfile;