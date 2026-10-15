
import { Mail, MapPin, Phone } from "lucide-react";

const fields = [
    { name: "country", label: "Country", placeholder: "India" },
    { name: "state", label: "State", placeholder: "Tamil Nadu" },
    { name: "city", label: "City", placeholder: "Chennai", Icon: MapPin },
    {
        name: "businessEmail",
        label: "Business Email *",
        placeholder: "hello@example.com",
        Icon: Mail,
        type: "email",
    },
    {
        name: "contactNumber",
        label: "Contact Number",
        placeholder: "+91 98765 43210",
        Icon: Phone,
        type: "tel",
    },
];

const inputClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function BrandProfileAddress({
    formData,
    updateField,
    isEditing,
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                    Location &amp; Contact
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Help suitable creators identify where your business is based.
                </p>
            </div>

            {isEditing ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {fields.map(({ name, label, placeholder, Icon, type }) => (
                        <label
                            key={name}
                            className="block text-xs font-semibold text-slate-700"
                        >
                            {label}

                            <span className="relative mt-1.5 block">
                                {Icon && (
                                    <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                )}

                                <input
                                    type={type || "text"}
                                    value={formData[name]}
                                    onChange={(event) =>
                                        updateField(name, event.target.value)
                                    }
                                    placeholder={placeholder}
                                    className={`${inputClass} ${Icon ? "pl-9" : "px-3"}`}
                                />
                            </span>
                        </label>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {fields.map(({ name, label, Icon }) => (
                        <div
                            key={name}
                            className="min-w-0 rounded-xl bg-slate-50 p-3.5"
                        >
                            <p className="text-xs font-medium text-slate-500">
                                {label.replace(" *", "")}
                            </p>

                            <div className="mt-1.5 flex items-start gap-2">
                                {Icon && (
                                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                )}
                                <p className="break-words text-sm font-semibold text-slate-800">
                                    {formData[name] || "Not provided"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
