
import { AtSign, BriefcaseBusiness, Globe, Play } from "lucide-react";

const fields = [
    {
        name: "instagram",
        label: "Instagram URL",
        placeholder: "https://instagram.com/yourbrand",
        Icon: AtSign,
    },
    {
        name: "youtube",
        label: "YouTube URL",
        placeholder: "https://youtube.com/@yourbrand",
        Icon: Play,
    },
    {
        name: "linkedin",
        label: "LinkedIn URL",
        placeholder: "https://linkedin.com/company/yourbrand",
        Icon: BriefcaseBusiness,
    },
    {
        name: "otherLink",
        label: "Other Website / Social Link",
        placeholder: "https://example.com",
        Icon: Globe,
    },
];

const inputClass =
    "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function safeUrl(value) {
    if (!value) return "";
    try {
        const url = new URL(value);
        return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

export default function BrandProfileSocials({
    formData,
    updateField,
    isEditing,
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Social Media &amp; Links
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Help creators learn more about your brand.
                </p>
            </div>

            {isEditing ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {fields.map(({ name, label, placeholder, Icon }) => (
                        <label
                            key={name}
                            className="block text-xs font-semibold text-slate-700"
                        >
                            {label}
                            <span className="relative block">
                                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData[name]}
                                    onChange={(event) =>
                                        updateField(name, event.target.value)
                                    }
                                    placeholder={placeholder}
                                    className={inputClass}
                                />
                            </span>
                        </label>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {fields.map(({ name, label, Icon }) => {
                        const url = safeUrl(formData[name]);

                        return (
                            <div
                                key={name}
                                className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                            >
                                <span className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
                                    <Icon className="h-4 w-4" />
                                </span>

                                <div className="min-w-0">
                                    <p className="text-xs text-slate-500">
                                        {label}
                                    </p>
                                    {url ? (
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 block truncate text-sm font-semibold text-blue-600 hover:underline"
                                        >
                                            Open link
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-sm text-slate-400">
                                            Not provided
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
