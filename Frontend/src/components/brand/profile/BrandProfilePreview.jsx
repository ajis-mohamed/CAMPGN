
import { AtSign, BriefcaseBusiness, Globe, MapPin, Play } from "lucide-react";

const socialLinks = [
    { name: "instagram", label: "Instagram", Icon: AtSign },
    { name: "youtube", label: "YouTube", Icon: Play },
    { name: "linkedin", label: "LinkedIn", Icon: BriefcaseBusiness },
    { name: "otherLink", label: "Website", Icon: Globe },
];

function safeUrl(value) {
    if (!value) return "";
    try {
        const url = new URL(value);
        return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

export default function BrandProfilePreview({ formData, logoPreview }) {
    const initials = formData.brandName.trim()
        ? formData.brandName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase()
        : "BR";

    const location = [
        formData.city,
        formData.state,
        formData.country,
    ].filter(Boolean).join(", ");

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Creator View Preview
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        How creators may see your brand
                    </p>
                </div>

                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    Brand
                </span>
            </div>

            <div className="p-4 sm:p-5">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-blue-50/80 to-white p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-base font-bold text-white shadow-sm">
                            {logoPreview ? (
                                <img
                                    src={logoPreview}
                                    alt={`${formData.brandName || "Brand"} logo`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                initials
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="break-words text-base font-bold text-slate-900">
                                {formData.brandName || "Your Brand Name"}
                            </h3>

                            <span className="mt-1.5 inline-flex max-w-full rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-blue-700 shadow-sm">
                                {formData.industry || "Your Industry"}
                            </span>
                        </div>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap break-words text-xs leading-6 text-slate-600">
                        {formData.description ||
                            "Your company description will appear here, helping creators understand your brand and collaboration interests."}
                    </p>

                    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                        <p className="flex items-start gap-2 text-xs text-slate-500">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                            <span className="break-words">
                                {location || "Your business location"}
                            </span>
                        </p>

                        {formData.website && (
                            <p className="flex items-start gap-2 text-xs text-slate-500">
                                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                <span className="break-all">
                                    {formData.website}
                                </span>
                            </p>
                        )}

                        {formData.businessEmail && (
                            <p className="flex items-start gap-2 text-xs text-slate-500">
                                <AtSign className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                <span className="break-all">
                                    {formData.businessEmail}
                                </span>
                            </p>
                        )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                        {socialLinks.map(({ name, label, Icon }) => {
                            const url = safeUrl(formData[name]);

                            if (!url) return null;

                            return (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    title={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-500 transition hover:border-blue-200 hover:text-blue-600"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
                    This is a preview of your brand information, not a public
                    profile or a verified company listing.
                </p>
            </div>
        </section>
    );
}
