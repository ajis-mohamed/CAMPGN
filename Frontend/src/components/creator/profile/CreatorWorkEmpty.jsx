import React from "react";
import { BriefcaseBusiness, Plus, Image as ImageIcon } from "lucide-react";

function CreatorWorkEmpty() {
    return (
        <div className="min-w-0 lg:h-[27rem] lg:overflow-hidden lg:flex lg:flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header */}
            <div className="mb-6 shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">
                    My Work
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Showcase your best content and creative projects.
                </p>
            </div>

            {/* Empty State */}
            <div className="min-h-0 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-indigo-100 bg-white px-5 py-6 lg:py-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <BriefcaseBusiness size={30} strokeWidth={1.7} />
                </div>

                <h3 className="max-w-full text-base font-semibold text-gray-900">
                    Your creative journey starts here
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 line-clamp-3">
                    You haven't added any work samples yet. Showcase your best
                    videos, photos, and creative projects to attract brands.
                </p>

                <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 shadow-sm"
                >
                    <Plus size={18} />
                    Add Your First Work
                </button>

                <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
                    <ImageIcon size={15} />
                    <span>Videos, photos & creative projects</span>
                </div>
            </div>
        </div>
    );
}

export default CreatorWorkEmpty;