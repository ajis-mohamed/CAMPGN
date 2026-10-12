import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import axios from "axios";
import { loginWithGoogle } from "../../services/authService";
import useUserStore from "../../zustand/useUserStore";

function Login() {
    const navigate = useNavigate();
    const setAuthState = useUserStore((state) => state.setAuthState);

    const URL = 'http://localhost:5000/'

    // Regular Expression Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // UI States
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const completeLogin = async (user) => {
        const response = await axios.get(`${URL}accounttype?uid=${user.uid}`);
        const accountType = response.data.accountType;

        if (accountType !== "brand" && accountType !== "creator") {
            throw new Error("The account type returned by the server is invalid.");
        }

        setAuthState(user, accountType);
        navigate(`/${accountType}/dashboard`);
    };

    // Form Submission & Firebase Error Handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Client-side Validations
        if (!email.trim()) {
            setErrorMessage("Please enter your email address.");
            return;
        }
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setErrorMessage("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            const user = await loginUser(email, password);
            console.log("Logged in user:", user);

            await completeLogin(user);
        } catch (error) {
            console.error("Login error:", error);

            // Handle Firebase Auth Error Codes
            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    setErrorMessage("Invalid email or password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setErrorMessage("The email address is invalid.");
                    break;
                case "auth/user-disabled":
                    setErrorMessage("This account has been disabled. Contact support.");
                    break;
                case "auth/too-many-requests":
                    setErrorMessage("Too many failed attempts. Please reset your password or try again later.");
                    break;
                case "auth/network-request-failed":
                    setErrorMessage("Network error. Please check your internet connection.");
                    break;
                default:
                    setErrorMessage(error.message || "Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await loginWithGoogle()

            await completeLogin(user);
        } catch (error) {
            console.error("Login error:", error);

            // Handle Firebase Auth Error Codes
            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    setErrorMessage("Invalid email or password. Please try again.");
                    break;
                case "auth/invalid-email":
                    setErrorMessage("The email address is invalid.");
                    break;
                case "auth/user-disabled":
                    setErrorMessage("This account has been disabled. Contact support.");
                    break;
                case "auth/too-many-requests":
                    setErrorMessage("Too many failed attempts. Please reset your password or try again later.");
                    break;
                case "auth/network-request-failed":
                    setErrorMessage("Network error. Please check your internet connection.");
                    break;
                default:
                    setErrorMessage(error.message || "Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#faf9ff] px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* ================= LEFT SIDE: Product Value Prop ================= */}
                    <div className="hidden w-full space-y-6 md:block">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e5edff] text-[#315cff] text-xs font-semibold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#315cff]" />
                            Creator & Brand Workspace
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-tight">
                            Welcome back.
                        </h1>

                        {/* Description */}
                        <p className="max-w-lg text-sm sm:text-base text-[#4b5563] leading-relaxed">
                            Manage multi-tier creator campaigns, approve locked
                            deliverables, and automate milestone escrow payouts
                            directly from one synchronized operational cockpit.
                        </p>

                        {/* Campaign Dashboard Preview Card */}
                        <div className="w-full max-w-lg bg-white border border-[#e5e7eb] rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(40,50,90,0.08)] space-y-4">

                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#315cff] text-base">
                                        ▣
                                    </div>
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-[#111827]">
                                            Active Campaign Pipeline
                                        </h3>
                                        <p className="text-xs text-[#6b7280]">
                                            Q4 Omni-Channel Deployment
                                        </p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-[#eff6ff] text-[#315cff] text-xs font-semibold">
                                    ◎ Escrow Protected
                                </span>
                            </div>

                            {/* Creator Card snippet */}
                            <div className="bg-[#f8fafc] rounded-xl p-4 space-y-3 border border-[#f1f5f9]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#fed7aa] flex items-center justify-center text-sm shadow-sm">
                                            👩🏻
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-bold text-[#111827]">
                                                Maya Lin
                                            </p>
                                            <p className="text-xs text-[#6b7280]">
                                                15.4k Tier-2 Regional Creator
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-white text-xs font-medium text-[#4b5563] border border-gray-200">
                                        TikTok + IG Reels
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1">
                                    <div>
                                        <p className="text-xs text-[#6b7280]">Austin Metro Brew — Fall Launch</p>
                                        <p className="mt-0.5 text-xs font-semibold text-[#315cff]">0.0% Approved</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[#6b7280]">Milestone Payout Escrow</p>
                                        <p className="mt-0.5 text-sm font-bold text-[#111827]">$1,250.00</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
                                    <div className="w-[38%] h-full bg-[#315cff] rounded-full" />
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#f8fafc] rounded-xl p-3 border border-[#f1f5f9]">
                                    <p className="text-xs text-[#6b7280]">↗ Attributed ROAS</p>
                                    <p className="mt-1 text-sm font-bold text-[#111827]">+24.5% avg.</p>
                                </div>
                                <div className="bg-[#f8fafc] rounded-xl p-3 border border-[#f1f5f9]">
                                    <p className="text-xs text-[#6b7280]">▣ Network Density</p>
                                    <p className="mt-1 text-sm font-bold text-[#111827]">12 Verified Nano</p>
                                </div>
                            </div>

                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full border-2 border-[#faf9ff] bg-[#fed7aa] flex items-center justify-center text-xs">👨🏻</div>
                                <div className="w-7 h-7 rounded-full border-2 border-[#faf9ff] bg-[#fbcfe8] flex items-center justify-center text-xs">👩🏻</div>
                                <div className="w-7 h-7 rounded-full border-2 border-[#faf9ff] bg-[#d1fae5] flex items-center justify-center text-xs">👨🏽</div>
                            </div>
                            <p className="text-xs sm:text-sm text-[#4b5563]">
                                Trusted by <span className="font-semibold text-[#111827]">1,200+ brands and creators</span> to clear friction-free sponsorships.
                            </p>
                        </div>

                    </div>


                    {/* ================= RIGHT SIDE: Auth Form ================= */}
                    <div className="flex justify-center lg:justify-end w-full">

                        <div className="w-full max-w-[420px] bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(40,50,90,0.08)] space-y-6">

                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                                        Sign in to CAPGN
                                    </h2>
                                    <p className="mt-1 text-xs sm:text-sm text-[#6b7280]">
                                        Enter your credentials to access your live campaigns
                                    </p>
                                </div>
                                <span className="w-2 h-2 rounded-full bg-[#315cff] mt-1.5" />
                            </div>

                            {/* Google Sign In Button */}
                            <button
                                type="button"
                                className="w-full h-11 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs sm:text-sm font-semibold text-[#334155] flex items-center justify-center gap-3 hover:bg-[#f1f5f9] transition-all shadow-sm"
                                onClick={handleGoogleLogin}
                            >
                                <span className="text-base font-bold text-[#315cff]">G</span>
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-[#e2e8f0]" />
                                <span className="text-[10px] tracking-wider text-[#94a3b8] uppercase font-medium">
                                    Or with work credentials
                                </span>
                                <div className="flex-1 h-px bg-[#e2e8f0]" />
                            </div>

                            {/* Form Inputs container */}
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Work Email */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                                        Work Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="alex@brand.com"
                                        className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] bg-white text-xs sm:text-sm text-[#111827] outline-none focus:border-[#315cff] focus:ring-4 focus:ring-[#315cff]/10 transition-all"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-semibold text-[#334155]">
                                            Password
                                        </label>
                                        <a href="#forgot" className="text-xs text-[#315cff] font-medium hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            placeholder="••••••••••••"
                                            className="w-full h-11 px-3.5 pr-10 rounded-xl border border-[#cbd5e1] bg-white text-xs sm:text-sm text-[#111827] outline-none focus:border-[#315cff] focus:ring-4 focus:ring-[#315cff]/10 transition-all"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-[#334155]"
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 accent-[#315cff] cursor-pointer"
                                    />
                                    <label htmlFor="remember" className="text-xs text-[#6b7280] cursor-pointer">
                                        Remember this workstation for 30 days
                                    </label>
                                </div>

                                {/* ERROR MESSAGE DISPLAY */}
                                {errorMessage && (
                                    <p className="text-xs text-red-500 font-medium text-center">
                                        {errorMessage}
                                    </p>
                                )}

                                {/* Sign In Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-[0.99]"
                                >
                                    {loading && (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    )}
                                    {loading ? "Signing in..." : "Sign In →"}
                                </button>

                            </form>

                            {/* Footer Link */}
                            <p className="text-center text-xs text-[#6b7280] pt-2">
                                Don't have an enterprise account?
                                <button
                                    type="button"
                                    className="ml-1 text-[#315cff] font-semibold hover:underline"
                                    onClick={() => navigate("/register")}
                                >
                                    Create account
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;