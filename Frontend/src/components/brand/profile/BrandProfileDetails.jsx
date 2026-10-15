
import { Building2, Globe, Users, CalendarDays } from "lucide-react";

const inputClass =
    "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "block text-xs font-semibold text-slate-700";

const industries = [
    "Fashion & Apparel",
    "Beauty & Wellness",
    "Food & Beverage",
    "Technology",
    "Travel & Hospitality",
    "Home & Lifestyle",
    "Health & Fitness",
    "Education",
    "Other",
];

function ReadOnlyItem({ label, value, Icon }) {
    return (
        <div className="min-w-0 rounded-xl bg-slate-50 p-3.5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <div className="mt-1.5 flex items-start gap-2">
                {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />}
                <p className="break-words text-sm font-semibold text-slate-800">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );
}

export default function BrandProfileDetails({
    formData,
    updateField,
    isEditing,
}) {
    const field = (name) => ({
        value: formData[name],
        onChange: (event) => updateField(name, event.target.value),
    });

    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Company Information
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Share the essentials that help creators understand your brand.
                </p>
            </div>

            {isEditing ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                        Brand / Company Name *
                        <input
                            {...field("brandName")}
                            className={inputClass}
                            placeholder="e.g. Aster & Co."
                        />
                    </label>

                    <label className={labelClass}>
                        Industry *
                        <select {...field("industry")} className={inputClass}>
                            <option value="">Select an industry</option>
                            {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                    {industry}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={`${labelClass} sm:col-span-2`}>
                        Company Description *
                        <textarea
                            {...field("description")}
                            rows={4}
                            className={`${inputClass} h-28 resize-y py-3`}
                            placeholder="Tell creators about your brand, products, and the collaborations you value."
                        />
                    </label>

                    <label className={labelClass}>
                        Company Website
                        <input
                            {...field("website")}
                            type="url"
                            className={inputClass}
                            placeholder="https://www.example.com"
                        />
                    </label>

                    <label className={labelClass}>
                        Company Size
                        <select {...field("companySize")} className={inputClass}>
                            <option value="">Select company size</option>
                            <option>1–10 employees</option>
                            <option>11–50 employees</option>
                            <option>51–200 employees</option>
                            <option>201–500 employees</option>
                            <option>500+ employees</option>
                        </select>
                    </label>

                    <label className={labelClass}>
                        Year Established
                        <input
                            {...field("yearEstablished")}
                            type="number"
                            min="1800"
                            max={new Date().getFullYear()}
                            className={inputClass}
                            placeholder="e.g. 2018"
                        />
                    </label>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="break-words text-lg font-bold text-slate-900">
                                {formData.brandName}
                            </h3>
                            <p className="mt-1 text-sm text-blue-700">
                                {formData.industry}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            About the brand
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                            {formData.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <ReadOnlyItem
                            label="Company Website"
                            value={formData.website}
                            Icon={Globe}
                        />
                        <ReadOnlyItem
                            label="Company Size"
                            value={formData.companySize}
                            Icon={Users}
                        />
                        <ReadOnlyItem
                            label="Year Established"
                            value={formData.yearEstablished}
                            Icon={CalendarDays}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
