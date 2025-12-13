import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Password strength checker
    const checkPasswordStrength = (password) => {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        return checks;
    };

    const passwordChecks = checkPasswordStrength(formData.password);
    const passwordsMatch =
        formData.password && formData.password === formData.confirmPassword;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (
            !passwordChecks.length ||
            !passwordChecks.uppercase ||
            !passwordChecks.lowercase ||
            !passwordChecks.number
        ) {
            setError("Password does not meet requirements");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Signed up with:", {
                name: formData.name,
                email: formData.email,
            });
            setIsLoading(false);
            // Replace with actual auth logic:
            // const { data, error } = await supabase.auth.signUp({
            //   email: formData.email,
            //   password: formData.password,
            //   options: { data: { name: formData.name } }
            // })
        }, 1000);
    };

    const PasswordRequirement = ({ met, text }) => (
        <div className="flex items-center gap-2 text-sm">
            {met ? (
                <Check size={16} className="text-green-500" />
            ) : (
                <X size={16} className="text-gray-400" />
            )}
            <span className={met ? "text-green-700" : "text-gray-600"}>{text}</span>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Account ✨
                    </h2>
                    <p className="text-gray-600">Sign up to get started</p>
                </div>

                <div className="space-y-5">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            disabled={isLoading}
                        />
                    </div>

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
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition pr-12"
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

                        {/* Password Requirements */}
                        {formData.password && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                                <PasswordRequirement
                                    met={passwordChecks.length}
                                    text="At least 8 characters"
                                />
                                <PasswordRequirement
                                    met={passwordChecks.uppercase}
                                    text="One uppercase letter"
                                />
                                <PasswordRequirement
                                    met={passwordChecks.lowercase}
                                    text="One lowercase letter"
                                />
                                <PasswordRequirement
                                    met={passwordChecks.number}
                                    text="One number"
                                />
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition pr-12"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {formData.confirmPassword && (
                            <p
                                className={`mt-2 text-sm ${passwordsMatch ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {passwordsMatch
                                    ? "✓ Passwords match"
                                    : "✗ Passwords do not match"}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <button
                        className="text-purple-600 hover:text-purple-700 font-semibold"
                        onClick={() => console.log("Navigate to login")}
                    >
                        Login
                    </button>
                </p>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500 mt-4">
                    By signing up, you agree to our{" "}
                    <button className="text-purple-600 hover:underline">
                        Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-purple-600 hover:underline">
                        Privacy Policy
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
