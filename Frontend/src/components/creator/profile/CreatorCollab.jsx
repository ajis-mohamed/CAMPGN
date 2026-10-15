import { useState, useEffect } from "react";
import { ChevronRight, Plus, X, Award, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import useUserStore from "../../../zustand/useUserStore";
import { getAuthHeaders } from "../../../services/authService";

const MAX_LIMIT = 3;

function CreatorCollab() {
    // From Zustand
    const user = useUserStore((state) => state.user);
    const API_BASE_URL = "http://localhost:5000";

    // Modal and status states
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [saveError, setSaveError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [hide, setHide] = useState(false);

    // List of collaborations stored locally in state
    const [collaborations, setCollaborations] = useState([]);

    // Form input state
    const [formData, setFormData] = useState({
        brand: "",
        campaign: "",
        fromDate: "",
        toDate: "",
        contentCount: ""
    });

    // Fetch collaborations when user data is ready
    useEffect(() => {
        const fetchCollab = async () => {
            if (!user?.uid) return;

            try {
                const response = await axios.get(`${API_BASE_URL}/creator/getcollab/${user.uid}`, {
                    headers: await getAuthHeaders()
                });

                if (response.data.success && Array.isArray(response.data.collaborations)) {
                    const fetchedCollabs = response.data.collaborations;
                    setCollaborations(fetchedCollabs);
                    setHide(fetchedCollabs.length >= MAX_LIMIT);
                }
            } catch (error) {
                console.error("Error fetching collaborations:", error);
                setSaveError(error.response?.data?.message || "Could not load collaborations. Please refresh and try again.");
            }
        };

        fetchCollab();
    }, [user?.uid]);

    // Keep hide state updated whenever collaborations array changes
    useEffect(() => {
        setHide(collaborations.length >= MAX_LIMIT);
    }, [collaborations]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveError("");

        if (!user?.uid) {
            setSaveError("Please sign in again before saving collaborations.");
            return;
        }

        if (new Date(formData.toDate) < new Date(formData.fromDate)) {
            setSaveError("The end date must be on or after the start date.");
            return;
        }

        const next = {
            ...(editingIndex !== null && collaborations[editingIndex]?._id ? { _id: collaborations[editingIndex]._id } : {}),
            brand: formData.brand.trim(),
            campaign: formData.campaign.trim(),
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            dateRange: `${formData.fromDate} – ${formData.toDate}`,
            contentCount: formData.contentCount.trim(),
            logoBg: "bg-indigo-600",
            logoText: formData.brand.trim().charAt(0).toUpperCase()
        };

        const updated = [...collaborations];

        if (editingIndex === null) {
            if (updated.length >= MAX_LIMIT) {
                setSaveError(`Maximum limit of ${MAX_LIMIT} collaborations reached.`);
                return;
            }
            updated.push(next);
        } else {
            updated[editingIndex] = { ...updated[editingIndex], ...next };
        }

        setIsSaving(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/creator/savecollab`, {
                collaborations: updated
            }, {
                headers: await getAuthHeaders()
            });

            if (response.data.success && response.data.data?.collaborations) {
                setCollaborations(response.data.data.collaborations);
            }
            setIsEditOpen(false);
            resetForm();
        } catch (error) {
            console.error("Something went wrong:", error);
            setSaveError(error.response?.data?.message || error.response?.data?.error || error.message || "Could not save collaboration. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({ brand: "", campaign: "", fromDate: "", toDate: "", contentCount: "" });
        setEditingIndex(null);
        setSaveError("");
    };

    const openEditor = (item = null, index = null) => {
        if (item === null && collaborations.length >= MAX_LIMIT) {
            setSaveError(`You have reached the maximum limit of ${MAX_LIMIT} collaborations.`);
            return;
        }

        resetForm();
        if (item) {
            setFormData({
                brand: item.brand || "",
                campaign: item.campaign || "",
                fromDate: item.fromDate || "",
                toDate: item.toDate || "",
                contentCount: item.contentCount || ""
            });
            setEditingIndex(index);
        }
        setIsEditOpen(true);
    };

    const handleDelete = async (indexToDelete) => {
        if (isSaving) return;

        const updated = collaborations.filter((_, index) => index !== indexToDelete);
        setSaveError("");
        setIsSaving(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/creator/savecollab`, { collaborations: updated }, {
                headers: await getAuthHeaders()
            });
            setCollaborations(response.data.data.collaborations);
        } catch (error) {
            setSaveError(error.response?.data?.message || error.response?.data?.error || error.message || "Could not delete collaboration. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const hasCollaborations = Array.isArray(collaborations) && collaborations.length > 0;

    return (
        <div className="mb-6 w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            {saveError && !isEditOpen && (
                <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{saveError}</p>
            )}

            {/* Header & Action Button */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                        <Award size={16} />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900 tracking-tight">
                            Previous Collaborations ({collaborations.length}/{MAX_LIMIT})
                        </h2>
                        <p className="text-xs font-medium text-slate-500">
                            Brands I've worked with and the campaigns I've been a part of.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {hasCollaborations && !hide && (
                        <button
                            type="button"
                            onClick={() => openEditor()}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                            <Plus size={14} />
                            <span>Add Collaboration</span>
                        </button>
                    )}
                    <button
                        type="button"
                        className="group inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 cursor-pointer"
                    >
                        <span>View All</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Conditional Rendering: Empty State vs Filled Grid */}
            {!hasCollaborations ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-2xs">
                        <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">No Collaborations Added Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
                        Showcase up to {MAX_LIMIT} brands you've collaborated with and build immediate trust with prospective partners.
                    </p>
                    <button
                        type="button"
                        onClick={() => openEditor()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-500/20 active:scale-[0.98] cursor-pointer"
                    >
                        <Plus size={16} />
                        <span>Add Your First Collaboration</span>
                    </button>
                </div>
            ) : (
                /* Filled Grid of Collaboration Cards */
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {collaborations.map((item, index) => (
                        <div
                            key={item._id || item.id || index}
                            className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:shadow-md"
                        >
                            <div>
                                {/* Brand Logo & Name Header */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold shadow-sm ${item.logoBg || 'bg-indigo-600'}`}
                                        >
                                            <span className="text-sm">{item.logoText}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold text-slate-900 truncate">
                                                {item.brand}
                                            </h3>
                                            <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-md uppercase tracking-wider truncate">
                                                {item.campaign}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            type="button"
                                            aria-label="Edit collaboration"
                                            onClick={() => openEditor(item, index)}
                                            className="text-slate-500 hover:text-indigo-600 cursor-pointer"
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Delete collaboration"
                                            disabled={isSaving}
                                            onClick={() => handleDelete(index)}
                                            className="text-slate-500 hover:text-red-600 disabled:opacity-50 cursor-pointer"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>

                                {/* Campaign Meta details */}
                                <div className="mt-3 space-y-1 text-xs text-slate-600 border-t border-slate-200/50 pt-3">
                                    <p>Duration: <span className="font-medium text-slate-800">{item.dateRange}</span></p>
                                    <p>Deliverables: <span className="font-medium text-slate-800">{item.contentCount}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hide && (
                <p className="mt-3 text-xs text-amber-600 font-medium">
                    Maximum limit of {MAX_LIMIT} collaborations reached. Delete one to add a new sample.
                </p>
            )}

            {/* ADD / EDIT COLLABORATION MODAL POPUP */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">{editingIndex === null ? "Add Collaboration" : "Edit Collaboration"}</h3>
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => { setIsEditOpen(false); resetForm(); }}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-6 space-y-4">
                            {saveError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{saveError}</p>}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Nykaa, boAt"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Campaign Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Skincare Campaign"
                                    value={formData.campaign}
                                    onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            {/* Two Date Input Fields (From and To) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
                                    <input
                                        type="date"
                                        required
                                        max={formData.toDate || undefined}
                                        value={formData.fromDate}
                                        onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none bg-white cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                                    <input
                                        type="date"
                                        required
                                        min={formData.fromDate || undefined}
                                        value={formData.toDate}
                                        onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none bg-white cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Content Count</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 5 content pieces"
                                    value={formData.contentCount}
                                    onChange={(e) => setFormData({ ...formData, contentCount: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => { setIsEditOpen(false); resetForm(); }}
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {isSaving ? "Saving..." : "Save Collaboration"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreatorCollab;