import { Handshake } from "lucide-react";

function CreatorCollabEmptyState() {
    return (
        <div className="h-56 min-w-0 overflow-hidden flex flex-col items-center justify-center rounded-xl border border-indigo-100/80 bg-white px-6 py-8 shadow-sm text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                <Handshake
                    size={28}
                    strokeWidth={1.8}
                    className="text-indigo-600"
                />
            </div>

            <h3 className="mb-1.5 max-w-full truncate text-lg font-semibold text-slate-900">
                No Collaborations Yet
            </h3>

            <p className="max-w-sm text-xs leading-5 text-slate-500">
                Your brand collaborations will appear here once
                you start working with brands.
            </p>
        </div>
    );
}

export default CreatorCollabEmptyState;