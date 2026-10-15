import { useState } from 'react';
import { UserCheck, Edit3, FileText, Link as LinkIcon, MapPin, Utensils, Languages, ShieldCheck, X, Upload, Loader2 } from 'lucide-react';
import useUserStore from '../../../zustand/useUserStore';
import axios from "axios";
import { getAuthHeaders } from '../../../services/authService';

export default function CreatorDetails() {
    // 1. Fetch user data and setter from Zustand store
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    // 2. State to control the popup modal (open/closed) and loading status
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 3. Temporary form state for editing, initialized with live user data
    const [formData, setFormData] = useState({
        creatorName: "",
        handle: "",
        role: "",
        location: "",
        languages: "",
        tier: "",
        turnaround: "",
        avatarUrl: ""
    });

    const API_BASE_URL = 'http://localhost:5000';

    // Fallback display values if user data is minimal upon first login
    const displayName = user?.name || "User";
    const displayEmail = user?.email || "";
    const displayRole = user?.niche || "Creator";
    const displayLocation = user?.location || "Location not set";
    const displayLanguages = user?.languages || "Tamil + English";
    const displayTier = user?.tier || "Standard";
    const displayTurnaround = user?.turnaround || "3-5 days";
    const avatarImg = user?.profileImage

    // File Image Handle For Profile State
    const [file, setFile] = useState(null)

    // 4. Handle file selection for computer image upload
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // For Immediate Actions
            setFormData(prev => ({ ...prev, avatarUrl: URL.createObjectURL(selectedFile) }));
        }
    };

    // Save to the creator endpoint with loading state enabled during the network request.

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveError("");

        if (!user?.uid || !user?.email) {
            setSaveError(
                "Your creator profile is not loaded. Refresh the page and try again."
            );
            return;
        }

        setIsLoading(true);

        try {
            let profileImageUrl = user.profileImage || "";

            // STEP 1: Upload the selected image to Cloudinary.
            if (file) {
                const formDataToUpload = new FormData();
                formDataToUpload.append("profileImage", file);

                const uploadResponse = await axios.post(
                    `${API_BASE_URL}/creator/upload-profile-image`,
                    formDataToUpload,
                    {
                        headers: await getAuthHeaders(),
                    }
                );

                profileImageUrl = uploadResponse.data.profileImage;
            }

            // STEP 2: Save the creator's profile details.
            const dataToSend = {
                ...user,
                accountType: "creator",
                name: formData.creatorName,
                username: formData.handle,
                niche: formData.role,
                location: formData.location,
                languages: formData.languages,
                tier: formData.tier,
                turnaround: formData.turnaround,
                profileImage: profileImageUrl,
            };

            const response = await axios.post(
                `${API_BASE_URL}/creator/saveprofile`,
                dataToSend,
                {
                    headers: await getAuthHeaders(),
                }
            );

            // STEP 3: Update the frontend's Zustand state.
            setUser(response.data.updatedCreator);
            setFile(null);
            setIsEditOpen(false);

        } catch (error) {
            console.error("Error saving profile:", error);

            setSaveError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Could not save your profile. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full min-w-0 bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 mb-6 transition-all">
            {/* Main Flex Layout: Keeps elements organized neatly on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Left Group: Avatar + Core Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 min-w-0">

                    {/* Avatar with Verified Status Badge */}
                    <div className="relative shrink-0">
                        <img
                            src={avatarImg}
                            alt={displayName}
                            className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-100"
                        />
                        <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Creator">
                            <UserCheck className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Creator Identity & Metadata */}
                    <div className="space-y-2 text-center sm:text-left min-w-0">

                        {/* Name, Handle & Live Status */}
                        <div className="space-y-0.5">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <h1 className="max-w-full text-xl font-bold tracking-tight text-slate-900 truncate">
                                    {displayName}
                                </h1>
                                <span className="text-sm text-slate-400 font-medium">(@{displayEmail})</span>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100/60 ml-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Available
                                </div>
                            </div>
                        </div>

                        {/* Primary Tags Row */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium">
                            <div className="flex items-center gap-1.5">
                                <Utensils className="w-3.5 h-3.5 text-slate-400" />
                                <span>{displayRole}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                <span>{displayLocation}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Languages className="w-3.5 h-3.5 text-slate-400" />
                                <span>{displayLanguages}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-600">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Verified Partner</span>
                            </div>
                        </div>

                        {/* Commercial Pills */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                            <span className="px-2.5 py-1 bg-blue-50/70 text-blue-700 border border-blue-100/60 rounded-lg text-xs font-semibold">
                                Tier: {displayTier}
                            </span>
                            <span className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200/60 rounded-lg text-xs font-medium">
                                Turnaround: {displayTurnaround}
                            </span>
                            <span className="px-2.5 py-1 bg-purple-50/70 text-purple-700 border border-purple-100/60 rounded-lg text-xs font-medium">
                                UGC Licensed
                            </span>
                        </div>

                    </div>
                </div>

                {/* Right Group: Professional Action Toolbar */}
                <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">

                    {/* Edit Profile Button (Opens Modal) */}
                    <button
                        type="button"
                        onClick={() => {
                            setFormData({
                                creatorName: user?.name || "",
                                handle: user?.username || user?.email?.split('@')[0] || "",
                                role: user?.niche || "",
                                location: user?.location || "",
                                languages: user?.languages || "Tamil + English",
                                tier: user?.tier || "Gold",
                                turnaround: user?.turnaround || "4 days",
                                avatarUrl: user?.profileImage || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
                            });
                            setSaveError("");
                            setIsEditOpen(true);
                        }}
                        className="inline-flex justify-center items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs active:scale-[0.98] whitespace-nowrap"
                    >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Edit Profile</span>
                    </button>

                    {/* Media Kit */}
                    <button
                        type="button"
                        className="inline-flex justify-center items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs active:scale-[0.98] whitespace-nowrap"
                    >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Media Kit</span>
                    </button>

                    {/* Copy Public Link */}
                    <button
                        type="button"
                        className="inline-flex justify-center items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] whitespace-nowrap"
                    >
                        <LinkIcon className="w-3.5 h-3.5 text-white" />
                        <span>Copy Public Link</span>
                    </button>

                </div>

            </div>

            {/* EDIT PROFILE MODAL POPUP */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Creator Profile</h3>
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="mt-6 space-y-4">
                            {saveError && (
                                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {saveError}
                                </p>
                            )}

                            {/* Profile Image Upload from Computer */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Profile Picture</label>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={formData.avatarUrl}
                                        alt="Preview"
                                        className="w-14 h-14 rounded-full object-cover border border-gray-200"
                                    />
                                    <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-xs ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <Upload size={16} />
                                        <span>Upload from Computer</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            disabled={isLoading}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Creator Name & Handle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Creator Name</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={isLoading}
                                        placeholder="e.g. Aziz Pheonix"
                                        value={formData.creatorName}
                                        onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Handle / Username</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={isLoading}
                                        placeholder="e.g. azizcreates"
                                        value={formData.handle}
                                        onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Role & Location */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Role / Niche</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={isLoading}
                                        placeholder="e.g. Food Creator"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={isLoading}
                                        placeholder="e.g. Chennai, India"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Languages & Turnaround */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Languages</label>
                                    <input
                                        type="text"
                                        disabled={isLoading}
                                        placeholder="e.g. Tamil + English"
                                        value={formData.languages}
                                        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Turnaround Time</label>
                                    <input
                                        type="text"
                                        disabled={isLoading}
                                        placeholder="e.g. 4 days"
                                        value={formData.turnaround}
                                        onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => setIsEditOpen(false)}
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{isLoading ? 'Saving Changes...' : 'Save Changes'}</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}