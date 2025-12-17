import { useState } from "react";
import { Eye, EyeOff, Check, X, User, Shield } from "lucide-react";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        user_type: "member" as "admin" | "member",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const checkPasswordStrength = (password: string) => ({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });

    const passwordChecks = checkPasswordStrength(formData.password);
    const passwordsMatch =
        formData.password && formData.password === formData.confirmPassword;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleRoleSelect = (role: "admin" | "member") => {
        setFormData({ ...formData, user_type: role });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
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

        try {
            const response = await authService.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                user_type: formData.user_type,
            });

            if (response.success) {
                navigate("/login");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Account ✨
                    </h2>
                    <p className="text-gray-600">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Account Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Account Type
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleRoleSelect("member")}
                                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                                    formData.user_type === "member"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-200 bg-gray-50 text-gray-600"
                                }`}
                            >
                                <User size={18} /> Member
                            </button>

                            <button
                                type="button"
                                onClick={() => handleRoleSelect("admin")}
                                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                                    formData.user_type === "admin"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-200 bg-gray-50 text-gray-600"
                                }`}
                            >
                                <Shield size={18} /> Admin
                            </button>
                        </div>

                        <p className="mt-2 text-xs text-gray-500">
                            {formData.user_type === "admin"
                                ? "Can create and manage organizations"
                                : "Can join organizations via invites"}
                        </p>
                    </div>

                    {/* Name */}
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {/* Email */}
                    <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {formData.password && (
                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                            <PasswordRequirement met={passwordChecks.length} text="At least 8 characters" />
                            <PasswordRequirement met={passwordChecks.uppercase} text="One uppercase letter" />
                            <PasswordRequirement met={passwordChecks.lowercase} text="One lowercase letter" />
                            <PasswordRequirement met={passwordChecks.number} text="One number" />
                        </div>
                    )}

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-black text-sm mt-6">
                    Already have an account?{" "}
                    <button
                        className="text-blue-600 font-semibold"
                        onClick={() => navigate("/login")}
                    >   
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
