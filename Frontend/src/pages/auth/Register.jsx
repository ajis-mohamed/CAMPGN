import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, registerUser } from "../../services/authService";
import axios from 'axios'
import useUserStore from "../../zustand/useUserStore";

function Register() {
    const navigate = useNavigate();
    const setAuthState = useUserStore((state) => state.setAuthState);
    const [accountType, setAccountType] = useState("brand");

    // Register form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    // after clicking google
    const [showAccountType, setShowAccountType] = useState(false);

    // UI States
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isBrand = accountType === "brand";

    // Regular Expression Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;

    // Backend URL
    const URL = 'http://localhost:5000/'


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        // Extra safety checks on submit
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (!termsAccepted) {
            setErrorMessage("You must accept the terms and conditions.");
            return;
        }

        setLoading(true);
        try {
            const user = await registerUser(email, password);
            console.log(user);
            if (accountType === 'brand') {
                const responseBrand = await axios.post(`${URL}brand`, {
                    name: name,
                    email: email,
                    uid: user.uid,
                    accountType: accountType
                })
                console.log(responseBrand.data)
            } else {
                const responseCreator = await axios.post(`${URL}creator`, {
                    name: name,
                    email: email,
                    uid: user.uid,
                    accountType: accountType
                })
                console.log(responseCreator.data)
            }
            setAuthState(user, accountType);
            navigate(`/${accountType}/dashboard`);
            console.log("Registration completed")
        } catch (error) {
            console.error("Error registering user:", error);

            switch (error.code) {
                case "auth/email-already-in-use":
                    setErrorMessage("An account with this email already exists. Please log in instead.");
                    break;
                case "auth/invalid-email":
                    setErrorMessage("Invalid email format.");
                    break;
                case "auth/weak-password":
                    setErrorMessage("Password is too weak.");
                    break;
                case "auth/network-request-failed":
                    setErrorMessage("Network error. Please check your internet connection.");
                    break;
                default:
                    setErrorMessage(error.message || "Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setShowAccountType(true)
    }

    const handleAccountType = async (type) => {
        try {
            setAccountType(type);
            setShowAccountType(false);

            const user = await loginWithGoogle();

            console.log("Google User:", user);

            // Now save user to MongoDB
            if (type === "brand") {
                await axios.post(`${URL}brand`, {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    accountType: "brand"
                });
            } else {
                await axios.post(`${URL}creator`, {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    accountType: "creator"
                });
            }

            setAuthState(user, type);

            navigate(`/${type}/dashboard`);

        } catch (error) {
            console.error("Google registration error:", error);
            setErrorMessage(
                error.response?.data?.message ||
                error.message ||
                "Google registration failed."
            );
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#faf9ff] px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center">
            <div className="w-full max-w-[640px]">

                {/* ================= HEADER ================= */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e5edff] text-[#315cff] text-xs font-semibold uppercase tracking-wider">
                        Create your workspace
                    </div>
                    <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#172033]">
                        Create your account
                    </h1>
                    <p className="mt-2 mx-auto max-w-md text-xs sm:text-sm text-[#737b8a]">
                        Join brands and creators collaborating with transparency, structure, and measurable growth.
                    </p>
                </div>

                {/* ================= MAIN CARD ================= */}
                <div className="bg-white border border-[#e4e7ef] rounded-2xl shadow-[0_10px_35px_rgba(40,50,90,0.08)] p-6 sm:p-8">

                    {/* ================= ACCOUNT TYPE ================= */}
                    <div>
                        <p className="text-xs font-semibold text-[#30394a] mb-3">
                            How will you use CAPGN?
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* BRAND */}
                            <button
                                type="button"
                                onClick={() => setAccountType("brand")}
                                className={`relative text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer ${isBrand
                                    ? "border-[#315cff] bg-[#f5f8ff] shadow-[0_0_0_1px_#315cff]"
                                    : "border-[#e4e7ef] bg-white hover:border-[#bdc8df]"
                                    }`}
                            >
                                {isBrand && (
                                    <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#315cff] text-white flex items-center justify-center text-xs">
                                        ✓
                                    </span>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold ${isBrand ? "bg-[#dfe9ff] text-[#315cff]" : "bg-[#f1f3f8] text-[#737b8a]"}`}>
                                        ▣
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#202938]">Brand / Agency</h3>
                                        <p className="text-xs text-[#737b8a]">Find and manage creators</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs leading-relaxed text-[#687080]">
                                    Build campaigns, discover regional creators, manage deliverables, and track performance.
                                </p>
                                <div className="mt-4 space-y-1.5">
                                    <p className="text-xs text-[#687080]">✓ Discover verified creators</p>
                                    <p className="text-xs text-[#687080]">✓ Manage campaigns & payments</p>
                                    <p className="text-xs text-[#687080]">✓ Track campaign performance</p>
                                </div>
                            </button>

                            {/* CREATOR */}
                            <button
                                type="button"
                                onClick={() => setAccountType("creator")}
                                className={`relative text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer ${!isBrand
                                    ? "border-[#315cff] bg-[#f5f8ff] shadow-[0_0_0_1px_#315cff]"
                                    : "border-[#e4e7ef] bg-white hover:border-[#bdc8df]"
                                    }`}
                            >
                                {!isBrand && (
                                    <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#315cff] text-white flex items-center justify-center text-xs">
                                        ✓
                                    </span>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold ${!isBrand ? "bg-[#dfe9ff] text-[#315cff]" : "bg-[#f1f3f8] text-[#737b8a]"}`}>
                                        ◎
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#202938]">Creator</h3>
                                        <p className="text-xs text-[#737b8a]">Earn from brand partnerships</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs leading-relaxed text-[#687080]">
                                    Discover relevant campaigns, protect your work, and get paid for your influence.
                                </p>
                                <div className="mt-4 space-y-1.5">
                                    <p className="text-xs text-[#687080]">✓ Discover relevant campaigns</p>
                                    <p className="text-xs text-[#687080]">✓ Protect your work & rights</p>
                                    <p className="text-xs text-[#687080]">✓ Receive secure payouts</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#edf0f5] my-6" />

                    {/* ================= FORM ================= */}
                    <div className="space-y-5">

                        {/* NAME */}
                        <div>
                            <label className="block text-xs font-semibold text-[#30394a] mb-2">
                                {isBrand ? "Organization / Brand Name" : "Creator Name"}
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={isBrand ? "Enter your brand or agency name" : "Enter your full name"}
                                className="w-full h-11 px-3.5 rounded-xl border border-[#e3e7ef] bg-white text-sm text-[#202938] placeholder:text-[#a0a6b2] outline-none transition focus:border-[#315cff] focus:ring-2 focus:ring-[#315cff]/10"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-xs font-semibold text-[#30394a] mb-2">
                                Work Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full h-11 px-3.5 rounded-xl border border-[#e3e7ef] bg-white text-sm text-[#202938] placeholder:text-[#a0a6b2] outline-none transition focus:border-[#315cff] focus:ring-2 focus:ring-[#315cff]/10"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#30394a] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a password"
                                        className="w-full h-11 px-3.5 pr-10 rounded-xl border border-[#e3e7ef] text-sm outline-none focus:border-[#315cff] focus:ring-2 focus:ring-[#315cff]/10"
                                    />
                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8c94a3] cursor-pointer">
                                        👁️
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#30394a] mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat your password"
                                        className="w-full h-11 px-3.5 pr-10 rounded-xl border border-[#e3e7ef] text-sm outline-none focus:border-[#315cff] focus:ring-2 focus:ring-[#315cff]/10"
                                    />
                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8c94a3] cursor-pointer">
                                        👁️
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ================= ACCOUNT INFO ================= */}
                        <div className="rounded-xl bg-[#f5f7ff] border border-[#e6eaf5] p-4">
                            <p className="text-xs font-semibold text-[#30394a]">
                                {isBrand ? "Built for brands & agencies" : "Built for creators"}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[#737b8a]">
                                {isBrand
                                    ? "Launch campaigns, find relevant creators, manage deliverables, and measure your return."
                                    : "Find brand opportunities, submit your work, protect your content rights, and receive secure payments."}
                            </p>
                        </div>

                        {/* TERMS */}
                        <label className="flex items-start gap-3 cursor-pointer pt-1">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-gray-300 accent-[#315cff] cursor-pointer"
                            />
                            <span className="text-xs leading-relaxed text-[#737b8a]">
                                I agree to CAPGN's{" "}
                                <span className="text-[#315cff] font-medium hover:underline cursor-pointer">Terms of Service</span> and{" "}
                                <span className="text-[#315cff] font-medium hover:underline cursor-pointer">Privacy Policy</span>.
                            </span>
                        </label>

                        {/* ERROR MESSAGE DISPLAY */}
                        {errorMessage && (
                            <p className="text-xs text-red-500 font-medium text-center">
                                {errorMessage}
                            </p>
                        )}

                        {/* CREATE ACCOUNT BUTTON */}
                        <button
                            type="button"
                            disabled={loading}
                            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#1557d6] hover:bg-[#1049b7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-blue-500/25 transition cursor-pointer"
                            onClick={(e) => handleSubmit(e)}
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {loading ? `Creating ${isBrand ? "Brand" : "Creator"} Account...` : `Creating ${isBrand ? "Brand" : "Creator"} Account`}
                        </button>

                        {/* GOOGLE */}
                        <button
                            type="button"
                            className="w-full h-11 rounded-xl bg-[#f3f5fa] hover:bg-[#e9edf6] text-[#30394a] text-xs font-semibold transition flex items-center justify-center gap-3 cursor-pointer shadow-sm"
                            onClick={handleGoogleLogin}
                        >
                            <span className="font-bold text-base text-[#315cff]">G</span>
                            Continue with Google
                        </button>

                        {/* POPUP AFTER CLICKING GOOGLE */}
                        {showAccountType && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                                <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8 animate-in zoom-in-95 duration-200">

                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-[#315cff]/10 text-[#315cff] rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                                            🚀
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                            How do you want to use CAPGN?
                                        </h2>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                            Select your primary role to customize your workspace experience.
                                        </p>
                                    </div>

                                    {/* Selection Options */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                                        {/* Brand Option */}
                                        <button
                                            type="button"
                                            onClick={() => handleAccountType("brand")}
                                            className="group relative flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-[#315cff] bg-white hover:bg-[#f5f7ff] transition-all duration-200 text-left hover:shadow-md cursor-pointer"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                                                🏢
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-[#315cff] transition-colors">
                                                    I'm a Brand
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Hire creators & launch campaigns
                                                </p>
                                            </div>
                                        </button>

                                        {/* Creator Option */}
                                        <button
                                            type="button"
                                            onClick={() => handleAccountType("creator")}
                                            className="group relative flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-[#315cff] bg-white hover:bg-[#f5f7ff] transition-all duration-200 text-left hover:shadow-md cursor-pointer"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-[#315cff] flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                                                🎨
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-[#315cff] transition-colors">
                                                    I'm a Creator
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Find brand deals & monetize content
                                                </p>
                                            </div>
                                        </button>

                                    </div>

                                    {/* Footer note */}
                                    <p className="text-center text-[11px] text-slate-400 mt-6">
                                        You can switch or manage your account preferences anytime in settings.
                                    </p>

                                </div>
                            </div>
                        )}

                        {/* SIGNIN */}
                        <p className="text-center text-xs text-[#737b8a] pt-2">
                            Already have an account?
                            <button
                                type="button"
                                className="ml-1 text-[#315cff] font-semibold hover:underline cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                Sign in
                            </button>
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Register;