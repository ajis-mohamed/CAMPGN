import { useState } from 'react';
import { BookOpen, Sparkles, Plus, Edit3, X, CheckCircle2, Award, Target, Heart } from 'lucide-react';
import useUserStore from '../../../zustand/useUserStore';
import { getAuthHeaders } from '../../../services/authService';
import axios from 'axios';

export default function CreatorNarratives() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    // Modal state
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Form state initialized with existing user narrative data or defaults
    const [formData, setFormData] = useState({
        bio: user?.bio || "",
        contentNiche: Array.isArray(user?.contentNiche) ? user.contentNiche : [],
        targetAudience: user?.targetAudience || "",
        collabTypes: Array.isArray(user?.collabTypes) ? user.collabTypes : []
    });

    // Temporary input fields for adding items one-by-one
    const [nicheInput, setNicheInput] = useState("");
    const [collabInput, setCollabInput] = useState("");

    const handleAddNiche = () => {
        if (formData.contentNiche.length >= 5) {
            setSaveError("You can add up to 5 content specialities.");
            return;
        }
        if (nicheInput.trim() && !formData.contentNiche.includes(nicheInput.trim())) {
            setFormData({
                ...formData,
                contentNiche: [...formData.contentNiche, nicheInput.trim()]
            });
            setNicheInput("");
            setSaveError("");
        }
    };

    const handleRemoveNiche = (indexToRemove) => {
        setFormData({
            ...formData,
            contentNiche: formData.contentNiche.filter((_, index) => index !== indexToRemove)
        });
    };

    const handleAddCollab = () => {
        if (formData.collabTypes.length >= 5) {
            setSaveError("You can add up to 5 preferred partnerships.");
            return;
        }
        if (collabInput.trim() && !formData.collabTypes.includes(collabInput.trim())) {
            setFormData({
                ...formData,
                collabTypes: [...formData.collabTypes, collabInput.trim()]
            });
            setCollabInput("");
            setSaveError("");
        }
    };

    const handleRemoveCollab = (indexToRemove) => {
        setFormData({
            ...formData,
            collabTypes: formData.collabTypes.filter((_, index) => index !== indexToRemove)
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveError("");

        if (!user?.uid || !user?.email) {
            setSaveError("Your creator profile is not loaded. Refresh the page and try again.");
            return;
        }

        if (formData.bio.length > 500) {
            setSaveError("Bio cannot be longer than 500 characters.");
            return;
        }
        if (formData.contentNiche.length > 5 || formData.collabTypes.length > 5) {
            setSaveError("Content specialities and preferred partnerships can each have up to 5 items.");
            return;
        }

        const updatedData = {
            ...user,
            accountType: user.accountType,
            bio: formData.bio,
            contentNiche: formData.contentNiche,
            targetAudience: formData.targetAudience,
            collabTypes: formData.collabTypes
        };

        setIsSaving(true);
        try {
            const response = await axios.post("http://localhost:5000/creator/saveprofile", updatedData, {
                headers: await getAuthHeaders()
            });
            setUser(response.data.updatedCreator);
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error saving narrative profile:", error);
            setSaveError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Could not save your creator narrative. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const hasNarrative = user?.bio ||
        (Array.isArray(user?.contentNiche) && user.contentNiche.length > 0) ||
        user?.targetAudience ||
        (Array.isArray(user?.collabTypes) && user.collabTypes.length > 0);

    const openEditor = () => {
        setFormData({
            bio: user?.bio || "",
            contentNiche: Array.isArray(user?.contentNiche) ? [...user.contentNiche] : [],
            targetAudience: user?.targetAudience || "",
            collabTypes: Array.isArray(user?.collabTypes) ? [...user.collabTypes] : []
        });
        setNicheInput("");
        setCollabInput("");
        setSaveError("");
        setIsEditOpen(true);
    };

    return (
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900 tracking-tight">Creator Narrative & Bio</h2>
                        <p className="text-xs text-slate-500 font-medium">Brand overview, content philosophy, and collaboration style</p>
                    </div>
                </div>

                {hasNarrative && (
                    <button
                        type="button"
                        onClick={openEditor}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs cursor-pointer"
                    >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Edit Narrative</span>
                    </button>
                )}
            </div>

            {!hasNarrative ? (
                /* Empty State View */
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-2xs">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">No Creator Narrative Added Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
                        Help brands understand your creative style, content specialties, and target audience by completing your narrative profile.
                    </p>
                    <button
                        type="button"
                        onClick={openEditor}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Creator Narrative</span>
                    </button>
                </div>
            ) : (
                /* Filled State Display View */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 items-stretch">
                    {/* Column 1: Bio */}
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>About Creator</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {user.bio}
                        </p>
                    </div>

                    {/* Column 2: Content Specialties */}
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                            <Target className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>Content Specialities</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5 mb-3">
                            {user.contentNiche?.map((item, index) => (
                                <span key={index} className="flex h-7 items-center gap-1.5 px-2 bg-white text-slate-700 border border-slate-200/70 rounded-lg text-xs font-medium">
                                    <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                                    <span className="truncate">{item}</span>
                                </span>
                            ))}
                        </div>
                        {user.targetAudience && (
                            <p className="mt-auto pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                                Primary Audience: <span className="text-slate-700 font-medium">{user.targetAudience}</span>
                            </p>
                        )}
                    </div>

                    {/* Column 3: Collaboration Preferences */}
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                            <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Preferred Partnerships</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5 mb-3">
                            {user.collabTypes?.map((collab, index) => (
                                <span key={index} className="flex h-7 items-center gap-1.5 px-2 bg-white text-emerald-700 border border-emerald-100/70 rounded-lg text-xs font-semibold">
                                    <Heart className="w-3 h-3 text-emerald-500 shrink-0" />
                                    <span className="truncate">{collab}</span>
                                </span>
                            ))}
                        </div>
                        <p className="mt-auto pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                            Open to long-term contracts & affiliates.
                        </p>
                    </div>
                </div>
            )}

            {/* EDIT / CREATE NARRATIVE MODAL POPUP */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Configure Creator Narrative</h3>
                            <button type="button" onClick={() => setIsEditOpen(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-6 space-y-4">
                            {saveError && (
                                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {saveError}
                                </p>
                            )}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-xs font-medium text-gray-700">About Creator / Bio</label>
                                    <span className={`text-[10px] font-semibold ${formData.bio.length > 500 ? 'text-red-600' : 'text-gray-400'}`}>
                                        {formData.bio.length}/500 chars
                                    </span>
                                </div>
                                <textarea
                                    rows={4}
                                    maxLength={500}
                                    placeholder="Write a short bio about yourself..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none resize-none"
                                />
                            </div>

                            {/* Content Specialities - Add One by One */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Content Specialities</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. Street Food"
                                        disabled={formData.contentNiche.length >= 5}
                                        value={nicheInput}
                                        onChange={(e) => setNicheInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddNiche();
                                            }
                                        }}
                                        className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddNiche}
                                        disabled={formData.contentNiche.length >= 5}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                                    >
                                        Add
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">{formData.contentNiche.length}/5 added</p>
                                {formData.contentNiche.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                                        {formData.contentNiche.map((item, index) => (
                                            <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs">
                                                {item}
                                                <button type="button" onClick={() => handleRemoveNiche(index)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                                                    <X size={12} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Primary Audience Description</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Food enthusiasts, home cooks aged 18–35"
                                    value={formData.targetAudience}
                                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Preferred Partnerships - Add One by One */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Partnerships</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. Sponsored Reels"
                                        disabled={formData.collabTypes.length >= 5}
                                        value={collabInput}
                                        onChange={(e) => setCollabInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddCollab();
                                            }
                                        }}
                                        className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCollab}
                                        disabled={formData.collabTypes.length >= 5}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                                    >
                                        Add
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">{formData.collabTypes.length}/5 added</p>
                                {formData.collabTypes.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                                        {formData.collabTypes.map((collab, index) => (
                                            <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-emerald-700 border border-emerald-100 rounded-lg text-xs font-medium shadow-2xs">
                                                {collab}
                                                <button type="button" onClick={() => handleRemoveCollab(index)} className="text-emerald-400 hover:text-red-500 cursor-pointer">
                                                    <X size={12} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsEditOpen(false)} className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSaving} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer">
                                    {isSaving ? "Saving..." : "Save Narrative"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}