import { Navigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";

export const ProtectedRoute = ({
    accountTypeLoading,
    allowedType,
    children
}) => {
    const user = useUserStore((state) => state.user);
    const accountType = useUserStore((state) => state.accountType);

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Still getting account type from MongoDB
    if (accountTypeLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf9ff]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-[#315cff]/30 border-t-[#315cff] rounded-full animate-spin" />

                    <p className="text-sm font-semibold text-[#737b8a]">
                        Loading account...
                    </p>
                </div>
            </div>
        );
    }

    if (accountType !== "brand" && accountType !== "creator") {
        return <Navigate to="/login" replace />;
    }

    // Logged-in user has a different account type
    if (accountType !== allowedType) {
        return (
            <Navigate
                to={`/${accountType}/dashboard`}
                replace
            />
        );
    }

    // Correct account type
    return children;
};