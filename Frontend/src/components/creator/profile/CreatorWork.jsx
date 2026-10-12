import React, { useEffect, useState } from "react";
import { Play, Heart, MoreHorizontal, Plus, X } from "lucide-react";

function CreatorWork({ onLoadWorks }) {
    // 1. Controls whether the popup modal is open or closed
    const [addWork, setAddWork] = useState(false);

    // 2. State for category filter ("All" by default)
    const [selectedCategory, setSelectedCategory] = useState("All");

    // 3. State for holding your work items list
    const [workItems, setWorkItems] = useState([
        {
            id: 1,
            platform: "Instagram Reel",
            isFeatured: true,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
            title: "Urban Style Lookbook",
            brand: "Roadster",
            tags: ["Fashion", "Reel"],
            description: "A short fashion reel showcasing the latest winter collection from Roadster.",
            views: "12.4K views",
            engagement: "784 likes",
        },
        {
            id: 2,
            platform: "Instagram Post",
            isFeatured: false,
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
            title: "Skincare Routine Campaign",
            brand: "The Derma Co.",
            tags: ["Beauty", "Post"],
            description: "Product photography and lifestyle shots for The Derma Co. skincare range.",
            views: "8.7K reach",
            engagement: "432 likes",
        },
        {
            id: 3,
            platform: "YouTube Video",
            isFeatured: false,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
            title: "Healthy Food Choices",
            brand: "GoodBelly",
            tags: ["Food", "Video"],
            description: "Simple and healthy recipes for everyday living. Full video on YouTube.",
            views: "28.4K views",
            engagement: "1.2K likes",
        },
        {
            id: 4,
            platform: "Instagram Post",
            isFeatured: false,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
            title: "Travel Diaries - Munnar",
            brand: "Mountain Mist",
            tags: ["Travel", "Image"],
            description: "A beautiful travel series from Munnar with stunning landscapes and local food.",
            views: "6.3K reach",
            engagement: "320 likes",
        },
    ]);

    // 4. State for handling form inputs inside the popup
    const [formData, setFormData] = useState({
        title: "",
        brand: "",
        platform: "Instagram Reel",
        image: "",
        description: "",
        views: "",
        engagement: "",
        tags: "",
        isFeatured: false,
    });

    // 5. Dynamic helper to change metric labels based on chosen platform type
    const getMetricLabels = () => {
        switch (formData.platform) {
            case "YouTube Video":
                return { viewsLabel: "Video Views", engagementLabel: "Likes & Comments" };
            case "Instagram Reel":
                return { viewsLabel: "Reel Views", engagementLabel: "Likes" };
            case "Instagram Post":
                return { viewsLabel: "Post Reach", engagementLabel: "Likes" };
            case "TikTok":
                return { viewsLabel: "Video Views", engagementLabel: "Likes & Shares" };
            default:
                return { viewsLabel: "Views / Reach", engagementLabel: "Engagement" };
        }
    };

    const labels = getMetricLabels();

    // 6. Send work items up to parent whenever workItems change
    useEffect(() => {
        if (onLoadWorks) {
            onLoadWorks(workItems);
        }
    }, [workItems, onLoadWorks]);

    // 7. Function running when user submits the "Add Work" form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload

        const newWorkItem = {
            id: Date.now(),
            title: formData.title,
            brand: formData.brand,
            platform: formData.platform,
            image: formData.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
            description: formData.description,
            views: formData.views || "1K views",
            engagement: formData.engagement || "50 likes",
            tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : ["General"],
            isFeatured: formData.isFeatured,
        };

        setWorkItems([newWorkItem, ...workItems]);
        setAddWork(false);
        setFormData({
            title: "",
            brand: "",
            platform: "Instagram Reel",
            image: "",
            description: "",
            views: "",
            engagement: "",
            tags: "",
            isFeatured: false,
        });
    };

    // 8. Filter work items based on selected category tag
    const filteredWorks = selectedCategory === "All"
        ? workItems
        : workItems.filter((item) => item.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()));

    const categories = ["All", "Fashion", "Beauty", "Food", "Travel"];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header & Add Button */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">My Work</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Showcase your best work and let brands discover your creativity.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 shadow-sm"
                    onClick={() => setAddWork(true)}
                >
                    <Plus size={18} />
                    Add Work
                </button>
            </div>

            {/* Category Filter Buttons */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-xl px-4 py-2 text-xs font-medium transition ${selectedCategory === category
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid of Work Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredWorks.length > 0 ? (
                    filteredWorks.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
                        >
                            <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                                        {item.platform}
                                    </span>
                                </div>

                                {item.isFeatured && (
                                    <div className="absolute top-3 right-3">
                                        <span className="inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                                            Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col p-4">
                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                    {item.title}
                                </h3>

                                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-700">
                                        {item.brand ? item.brand[0] : "B"}
                                    </span>
                                    <span className="font-medium text-gray-700">{item.brand}</span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {item.tags && item.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-2.5 text-xs leading-5 text-gray-500 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Play size={12} className="text-indigo-600 fill-indigo-600" />
                                            {item.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart size={12} className="text-rose-500 fill-rose-500" />
                                            {item.engagement}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50/50 hover:border-indigo-100"
                                    >
                                        View Work
                                    </button>
                                    <button
                                        type="button"
                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                                        aria-label="More options"
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-sm text-gray-500">
                        No work items found for "{selectedCategory}".
                    </div>
                )}
            </div>

            {/* Popup Modal Form */}
            {addWork && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8 max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Work Sample</h3>
                            <button
                                type="button"
                                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                onClick={() => setAddWork(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Summer Lookbook"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Brand Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Roadster"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Platform Type</label>
                                    <select
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none bg-white"
                                    >
                                        <option value="Instagram Reel">Instagram Reel</option>
                                        <option value="Instagram Post">Instagram Post</option>
                                        <option value="YouTube Video">YouTube Video</option>
                                        <option value="TikTok">TikTok</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700">Description</label>
                                <textarea
                                    rows="3"
                                    required
                                    placeholder="Brief details about the campaign or content..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">{labels.viewsLabel}</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 15K views"
                                        value={formData.views}
                                        onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">{labels.engagementLabel}</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 850 likes"
                                        value={formData.engagement}
                                        onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="Fashion, Reel, Summer"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                                    Mark as Featured Work
                                </label>
                            </div>

                            {/* Form Buttons */}
                            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => setAddWork(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Add Work
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreatorWork;