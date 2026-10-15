
import { ImagePlus, Trash2, Upload } from "lucide-react";

export default function BrandProfileLogo({
    logoPreview,
    onLogoChange,
    onRemoveLogo,
    isEditing,
    brandName,
}) {
    const initials = brandName.trim()
        ? brandName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase()
        : "BR";

    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Brand Logo
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Make your brand easy for creators to recognize.
                </p>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 text-2xl font-bold text-blue-600">
                    {logoPreview ? (
                        <img
                            src={logoPreview}
                            alt={`${brandName || "Brand"} logo`}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        initials
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    {isEditing ? (
                        <>
                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 transition hover:border-blue-400 hover:bg-blue-50/50">
                                <span className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
                                    <ImagePlus className="h-5 w-5" />
                                </span>

                                <span>
                                    <span className="block text-sm font-semibold text-slate-800">
                                        Upload your brand logo
                                    </span>
                                    <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                                        PNG, JPG, or WEBP. Maximum size 5 MB.
                                    </span>
                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                                        <Upload className="h-3.5 w-3.5" />
                                        Choose image
                                    </span>
                                </span>

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="sr-only"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        if (file) onLogoChange(file);
                                        event.target.value = "";
                                    }}
                                />
                            </label>

                            {logoPreview && (
                                <button
                                    type="button"
                                    onClick={onRemoveLogo}
                                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Remove logo
                                </button>
                            )}
                        </>
                    ) : (
                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                {brandName || "Your Brand"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                {logoPreview
                                    ? "Your selected logo is displayed above."
                                    : "You haven't added a logo yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
