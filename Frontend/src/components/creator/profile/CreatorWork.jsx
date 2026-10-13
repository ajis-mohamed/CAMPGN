import React, { useState, useEffect } from 'react';
import { BriefcaseBusiness, Plus, X, Image as ImageIcon, ExternalLink, Upload, Eye, Heart } from 'lucide-react';
import useUserStore from '../../../zustand/useUserStore';
import axios from "axios";

export default function CreatorWork() {
    const user = useUserStore((state) => state.user);
    const API_BASE_URL = "http://localhost:5000";

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [works, setWorks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        category: "TikTok Video",
        link: "",
        image: null,
        description: "",
        views: "",
        likes: ""
    });

    // Fetch existing works from database and map schema fields to frontend fields
    useEffect(() => {
        const fetchWorks = async () => {
            if (!user?.uid) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/creator/getworks/${user.uid}`);
                if (response.data?.data?.works) {
                    const formattedWorks = response.data.data.works.map(item => ({
                        title: item.title,
                        category: item.category,
                        link: item.projectUrl,
                        image: item.thumbnailUrl,
                        description: item.description,
                        views: item.views,
                        likes: item.likes
                    }));
                    setWorks(formattedWorks);
                }
            } catch (error) {
                console.log("Could not fetch works:", error);
            }
        };
        fetchWorks();
    }, [user?.uid]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: previewUrl });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) return;
        if (!user?.uid) {
            alert("User not logged in!");
            return;
        }

        const updatedWorks = [...works, formData];

        // Map frontend fields to match your Mongoose schema before posting
        const payloadWorks = updatedWorks.map(item => ({
            title: item.title,
            category: item.category,
            projectUrl: item.link || "",
            thumbnailUrl: item.image || "",
            description: item.description || "",
            views: item.views || "",
            likes: item.likes || ""
        }));

        try {
            const response = await axios.post(`${API_BASE_URL}/creator/savenarratives`, {
                creatorUid: user.uid,
                works: payloadWorks
            });

            // Map server response back to frontend state shape
            const savedItems = response.data.data.works.map(item => ({
                title: item.title,
                category: item.category,
                link: item.projectUrl,
                image: item.thumbnailUrl,
                description: item.description,
                views: item.views,
                likes: item.likes
            }));

            setWorks(savedItems);
            setIsEditOpen(false);
            setFormData({
                title: "",
                category: "TikTok Video",
                link: "",
                image: null,
                description: "",
                views: "",
                likes: ""
            });
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    };

    const hasWorks = works.length > 0;

    return (
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/60 shadow-2xs shrink-0">
                        <BriefcaseBusiness className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900 tracking-tight">My Work</h2>
                        <p className="text-xs text-slate-500 font-medium">Showcase your best content and creative projects</p>
                    </div>
                </div>

                {hasWorks && (
                    <button
                        type="button"
                        onClick={() => setIsEditOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5 text-slate-500" />
                        <span>Add New Work</span>
                    </button>
                )}
            </div>

            {!hasWorks ? (
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-2xs">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Your creative journey starts here</h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
                        You haven't added any work samples yet. Showcase your best videos, photos, and creative projects to attract brands.
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsEditOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-500/20 active:scale-[0.98] cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Your First Work</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {works.map((work, index) => (
                        <div key={index} className="bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col justify-between overflow-hidden">
                            {work.image && (
                                <div className="w-full h-40 bg-slate-100 overflow-hidden">
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-0.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-md uppercase tracking-wider">
                                            {work.category}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">{work.title}</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                                        {work.description || "No description provided."}
                                    </p>
                                </div>

                                {(work.views || work.likes) && (
                                    <div className="flex items-center gap-4 py-2 my-2 border-t border-b border-slate-200/50 text-xs font-medium text-slate-600">
                                        {work.views && (
                                            <div className="flex items-center gap-1.5">
                                                <Eye size={14} className="text-blue-500" />
                                                <span>{work.views}</span>
                                            </div>
                                        )}
                                        {work.likes && (
                                            <div className="flex items-center gap-1.5">
                                                <Heart size={14} className="text-rose-500 fill-rose-50" />
                                                <span>{work.likes}</span>
                                            </div>
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
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 pt-2 border-t border-slate-200/60 w-full transition-colors"
                                    >
                                        <span>View Project Live</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Add Work Sample</h3>
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Austin Metro Brew Launch Reel"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Category / Platform</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:border-indigo-600 focus:outline-none"
                                >
                                    <option value="TikTok Video">TikTok Video</option>
                                    <option value="Instagram Reel">Instagram Reel</option>
                                    <option value="YouTube Video">YouTube Video</option>
                                    <option value="Photography">Photography / Post</option>
                                    <option value="UGC Portfolio">UGC Portfolio Link</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Views Count</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 45.2K"
                                        value={formData.views}
                                        onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Likes Count</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 3.4K"
                                        value={formData.likes}
                                        onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Project / Content Link</label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://instagram.com/reel/..."
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Upload Thumbnail Image</label>
                                <div className="flex items-center gap-3">
                                    <label className="flex-1 flex items-center justify-center gap-2 h-10 px-3 rounded-xl border border-gray-300 border-dashed bg-gray-50 text-xs text-gray-600 cursor-pointer hover:bg-gray-100 transition">
                                        <Upload size={16} />
                                        <span>{formData.image ? "Change selected image" : "Choose image file..."}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {formData.image && (
                                        <span className="text-xs font-semibold text-emerald-600">Attached ✓</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Description / Results</label>
                                <textarea
                                    rows={3}
                                    placeholder="Briefly describe campaign goals, reach, or metrics achieved..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-indigo-600 focus:outline-none resize-none"
                                />
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                                >
                                    Save Work
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}