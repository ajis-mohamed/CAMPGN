
import { CheckCircle2, Edit3, Save } from "lucide-react";

export default function BrandProfileHeader({
    isEditing,
    completion,
    onEdit,
    onSubmit,
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Brand Profile
                        </h1>

                        <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {isEditing ? "Profile setup" : "Profile submitted"}
                        </span>
                    </div>

                    <p className="mt-1.5 text-sm text-slate-500">
                        Manage your brand identity and company information.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-[190px] rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5">
                        <div className="mb-1.5 flex justify-between text-xs font-medium">
                            <span className="text-slate-600">
                                Profile completion
                            </span>
                            <span className="font-semibold text-blue-600">
                                {completion}%
                            </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${completion}%` }}
                            />
                        </div>
                    </div>

                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <Save className="h-4 w-4" />
                            Submit Profile
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
