import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    
//  updates the form state whenever a user types in an input field, keeping all existing values while only changing the field that was edited.
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!credentials.email || !credentials.password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Logged in with:", credentials);
            setIsLoading(false);
            // Replace with actual auth logic:
            // const { data, error } = await supabase.auth.signInWithPassword(credentials)
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-600">Sign in to continue to your account</p>
                </div>

                <div className="space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <button
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                        onClick={() => console.log("Navigate to signup")}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;