import { useState, useEffect } from "react";
import {
    BriefcaseBusiness,
    Plus,
    X,
    Image as ImageIcon,
    ExternalLink,
    Eye,
    Heart,
    Pencil,
    Trash2,
} from "lucide-react";
import axios from "axios";
import useUserStore from "../../../zustand/useUserStore";
import { getAuthHeaders } from "../../../services/authService";
import imageCompression from "browser-image-compression";

const API_BASE_URL = "http://localhost:5000";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_LIMIT = 3;

const EMPTY_FORM = {
    title: "",
    category: "Instagram Reel",
    link: "",
    image: "",
    imageFile: null,
    description: "",
    views: "",
    likes: "",
};

const formatWork = (item) => ({
    _id: item._id,
    title: item.title || "",
    category: item.category || "Instagram Reel",
    link: item.projectUrl || "",
    image: item.thumbnailUrl || "",
    description: item.description || "",
    views: item.views || "",
    likes: item.likes || "",
});

export default function CreatorWork() {
    const user = useUserStore((state) => state.user);

    const [works, setWorks] = useState([]);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    // Maximum Limit state indicator
    const [hide, setHide] = useState(false);

    // Fetch existing work samples.
    useEffect(() => {
        if (!user?.uid) return;

        let cancelled = false;

        const fetchWorks = async () => {
            try {
                const headers = await getAuthHeaders();

                const response = await axios.get(
                    `${API_BASE_URL}/creator/getworks/${user.uid}`,
                    { headers }
                );

                if (!cancelled) {
                    const fetchedWorks = (response.data?.data?.works || []).map(formatWork);
                    setWorks(fetchedWorks);
                    setHide(fetchedWorks.length >= MAX_LIMIT);
                }
            } catch (error) {
                if (!cancelled) {
                    setSaveError(
                        error.response?.data?.message ||
                        "Could not load work samples."
                    );
                }
            }
        };

        fetchWorks();

        return () => {
            cancelled = true;
        };
    }, [user?.uid]);

    // Keep hide state updated whenever works array changes
    useEffect(() => {
        setHide(works.length >= MAX_LIMIT);
    }, [works]);

    const updateField = (field, value) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setFormData({ ...EMPTY_FORM });
        setEditingIndex(null);
        setSaveError("");
    };

    const closeEditor = () => {
        setIsEditOpen(false);
        resetForm();
    };

    const openWorkEditor = (work = null, index = null) => {
        if (work === null && works.length >= MAX_LIMIT) {
            setSaveError("You have reached the maximum limit of 3 works.");
            return;
        }

        setSaveError("");
        setEditingIndex(index);
        setFormData(
            work
                ? {
                    ...formatWork({
                        ...work,
                        projectUrl: work.link,
                        thumbnailUrl: work.image,
                    }), imageFile: null
                }
                : { ...EMPTY_FORM }
        );
        setIsEditOpen(true);
    };

    // Upload a selected file and receive its Cloudinary URL.
    const uploadThumbnail = async (file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error("Choose a JPEG, PNG, or WebP image.");
        }

        if (file.size > MAX_IMAGE_SIZE) {
            throw new Error("Thumbnail image must be 5 MB or smaller.");
        }

        console.time("Total thumbnail upload");

        try {
            console.time("Image compression");

            const compressedFile = await imageCompression(file, {
                maxSizeMB: 0.25,
                maxWidthOrHeight: 1000,
                useWebWorker: true,
                initialQuality: 0.75,
            });

            console.timeEnd("Image compression");

            const headers = await getAuthHeaders();

            const signatureResponse = await axios.post(
                `${API_BASE_URL}/creator/work-thumbnail-signature`,
                {},
                { headers }
            );

            const {
                signature,
                timestamp,
                apiKey,
                cloudName,
                folder,
            } = signatureResponse.data;

            const data = new FormData();

            data.append("file", compressedFile);
            data.append("api_key", apiKey);
            data.append("timestamp", String(timestamp));
            data.append("folder", folder);
            data.append("signature", signature);

            console.time("Direct Cloudinary upload");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    data
                );

                if (!response.data?.secure_url) {
                    throw new Error("Cloudinary did not return an image URL.");
                }

                return response.data.secure_url;
            } finally {
                console.timeEnd("Direct Cloudinary upload");
            }
        } finally {
            console.timeEnd("Total thumbnail upload");
        }
    };

    const saveWorks = async (updatedWorks) => {
        const payload = updatedWorks.map((work) => ({
            ...(work._id ? { _id: work._id } : {}),
            title: work.title,
            category: work.category,
            projectUrl: work.link,
            thumbnailUrl: work.image || "",
            description: work.description,
            views: work.views || "",
            likes: work.likes || "",
        }));

        const headers = await getAuthHeaders();

        const response = await axios.post(
            `${API_BASE_URL}/creator/saveworks`,
            { works: payload },
            { headers }
        );

        return (response.data?.data?.works || []).map(formatWork);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setSaveError("");

        if (!user?.uid) {
            setSaveError("Please sign in again before saving your work.");
            return;
        }

        if (
            formData.description.trim().length < 100 ||
            formData.description.trim().length > 300
        ) {
            setSaveError("Description must be between 100 and 300 characters.");
            return;
        }

        setIsSaving(true);

        try {
            let thumbnailUrl = formData.image;

            if (formData.imageFile) {
                thumbnailUrl = await uploadThumbnail(formData.imageFile);
            }

            const workToSave = {
                ...(editingIndex !== null && works[editingIndex]?._id
                    ? { _id: works[editingIndex]._id }
                    : {}),
                title: formData.title.trim(),
                category: formData.category,
                link: formData.link.trim(),
                image: thumbnailUrl,
                description: formData.description.trim(),
                views: formData.views.trim(),
                likes: formData.likes.trim(),
            };

            const updatedWorks = [...works];

            if (editingIndex === null) {
                if (updatedWorks.length >= MAX_LIMIT) {
                    setSaveError("Maximum limit of 3 works reached.");
                    setIsSaving(false);
                    return;
                }
                updatedWorks.push(workToSave);
            } else {
                updatedWorks[editingIndex] = workToSave;
            }

            const savedWorks = await saveWorks(updatedWorks);

            setWorks(savedWorks);
            closeEditor();
        } catch (error) {
            console.error("Failed to save work:", error);

            setSaveError(
                error.response?.data?.message ||
                error.message ||
                "Could not save work. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (index) => {
        if (isSaving) return;

        setSaveError("");
        setIsSaving(true);

        try {
            const updatedWorks = works.filter(
                (_, workIndex) => workIndex !== index
            );

            const savedWorks = await saveWorks(updatedWorks);
            setWorks(savedWorks);
        } catch (error) {
            setSaveError(
                error.response?.data?.message ||
                "Could not delete work. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const hasWorks = works.length > 0;

    return (
        <div className="mb-6 w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                        <BriefcaseBusiness size={16} />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            My Work ({works.length}/{MAX_LIMIT})
                        </h2>
                        <p className="text-xs font-medium text-slate-500">
                            Showcase your best content and creative projects
                        </p>
                    </div>
                </div>

                {/* Hide "Add New Work" button when hide is true (limit reached 3) */}
                {hasWorks && !hide && (
                    <button
                        type="button"
                        onClick={() => openWorkEditor()}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                        <Plus size={14} />
                        Add New Work
                    </button>
                )}
            </div>

            {!hasWorks ? (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <ImageIcon size={24} />
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-slate-900">
                        Your creative journey starts here
                    </h3>
                    <p className="mb-5 max-w-sm text-xs leading-relaxed text-slate-500">
                        Showcase your best videos, photos, and creative projects
                        to attract brands.
                    </p>
                    <button
                        type="button"
                        onClick={() => openWorkEditor()}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                    >
                        <Plus size={16} />
                        Add Your First Work
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {works.map((work, index) => (
                        <div
                            key={work._id || index}
                            className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50"
                        >
                            {work.image && (
                                <div className="h-40 w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col justify-between p-4">
                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <span className="rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                                            {work.category}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                aria-label="Edit work"
                                                onClick={() => openWorkEditor(work, index)}
                                                className="text-slate-500 hover:text-indigo-600 cursor-pointer"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Delete work"
                                                disabled={isSaving}
                                                onClick={() => handleDelete(index)}
                                                className="text-slate-500 hover:text-red-600 disabled:opacity-50 cursor-pointer"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="mb-1 line-clamp-1 text-sm font-bold text-slate-900">
                                        {work.title}
                                    </h3>
                                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
                                        {work.description}
                                    </p>
                                </div>

                                {(work.views || work.likes) && (
                                    <div className="my-2 flex items-center gap-4 border-y border-slate-200/50 py-2 text-xs text-slate-600">
                                        {work.views && (
                                            <span className="flex items-center gap-1.5">
                                                <Eye size={14} className="text-blue-500" />
                                                {work.views}
                                            </span>
                                        )}
                                        {work.likes && (
                                            <span className="flex items-center gap-1.5">
                                                <Heart size={14} className="text-rose-500" />
                                                {work.likes}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {work.link && (
                                <div className="px-4 pb-4">
                                    <a
                                        href={work.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 border-t border-slate-200/60 pt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                    >
                                        View Project Live
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {hide && (
                <p className="mt-3 text-xs text-amber-600 font-medium">
                    Maximum limit of {MAX_LIMIT} works reached. Delete one to add a new sample.
                </p>
            )}

            {saveError && (
                <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {saveError}
                </p>
            )}

            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingIndex === null ? "Add Work Sample" : "Edit Work Sample"}
                            </h3>
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={closeEditor}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-6 space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={100}
                                    value={formData.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    placeholder="e.g. Brand Launch Reel"
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Category / Platform
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => updateField("category", e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none cursor-pointer"
                                >
                                    <option value="TikTok Video">TikTok Video</option>
                                    <option value="Instagram Reel">Instagram Reel</option>
                                    <option value="YouTube Video">YouTube Video</option>
                                    <option value="Photography">Photography / Post</option>
                                    <option value="UGC Portfolio">UGC Portfolio Link</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                        Views Count
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.views}
                                        onChange={(e) => updateField("views", e.target.value)}
                                        placeholder="e.g. 45.2K"
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700">
                                        Likes Count
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.likes}
                                        onChange={(e) => updateField("likes", e.target.value)}
                                        placeholder="e.g. 3.4K"
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Project / Content Link
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.link}
                                    onChange={(e) => updateField("link", e.target.value)}
                                    placeholder="https://instagram.com/reel/..."
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Thumbnail Image (optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) =>
                                        updateField("imageFile", e.target.files?.[0] || null)
                                    }
                                    className="w-full cursor-pointer text-xs text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    JPEG, PNG or WebP. Maximum 5 MB.
                                    {formData.image && !formData.imageFile &&
                                        " Your existing thumbnail will be kept unless you choose a new image."}
                                </p>

                                {(formData.imageFile || formData.image) && (
                                    <img
                                        src={
                                            formData.imageFile
                                                ? URL.createObjectURL(formData.imageFile)
                                                : formData.image
                                        }
                                        alt="Thumbnail preview"
                                        className="mt-3 h-36 w-full rounded-xl border border-slate-200 object-cover"
                                    />
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-700">
                                    Description / Results
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    minLength={100}
                                    maxLength={300}
                                    value={formData.description}
                                    onChange={(e) => updateField("description", e.target.value)}
                                    placeholder="Describe the project, campaign goals, or results..."
                                    className="w-full resize-none rounded-xl border border-gray-300 p-3 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                                <p className="mt-1 text-right text-xs text-gray-500">
                                    {formData.description.length}/300 characters (minimum 100)
                                </p>
                            </div>

                            {saveError && (
                                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {saveError}
                                </p>
                            )}

                            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={closeEditor}
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {isSaving ? "Uploading & Saving..." : "Save Work"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}