import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/shared/Navbar";
import Sidebar from "../../components/shared/Sidebar";

import { auth } from "../../config/firebaseConfig";
import { logoutUser } from "../../services/authService";

import BrandProfileHeader from "../../components/brand/profile/BrandProfileHeader";
import BrandProfileDetails from "../../components/brand/profile/BrandProfileDetails";
import BrandProfileLogo from "../../components/brand/profile/BrandProfileLogo";
import BrandProfileSocials from "../../components/brand/profile/BrandProfileSocials";
import BrandProfileAddress from "../../components/brand/profile/BrandProfileAddress";
import BrandProfilePreview from "../../components/brand/profile/BrandProfilePreview";

const API_URL = "http://localhost:5000/brand";

const initialFormData = {
    brandName: "",
    industry: "",
    description: "",
    website: "",
    companySize: "",
    yearEstablished: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    otherLink: "",
    country: "India",
    state: "Tamil Nadu",
    city: "",
    businessEmail: "",
    contactNumber: "",
};

const getProfileFormData = (brandData = {}) => ({
    brandName: brandData.brandName || "",
    industry: brandData.industry || "",
    description: brandData.description || "",
    website: brandData.website || "",
    companySize: brandData.companySize || "",
    yearEstablished: brandData.yearEstablished || "",
    instagram: brandData.instagram || "",
    youtube: brandData.youtube || "",
    linkedin: brandData.linkedin || "",
    otherLink: brandData.otherLink || "",
    country: brandData.country || "India",
    state: brandData.state || "Tamil Nadu",
    city: brandData.city || "",
    businessEmail: brandData.businessEmail || "",
    contactNumber: brandData.contactNumber || "",
});

const isProfileSubmitted = (brandData = {}) =>
    Boolean(
        brandData.brandName?.trim() &&
        brandData.industry?.trim() &&
        brandData.description?.trim() &&
        brandData.businessEmail?.trim()
    );

export default function BrandProfile() {
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [isEditing, setIsEditing] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [logoPreview, setLogoPreview] = useState("");
    const [selectedLogoFile, setSelectedLogoFile] = useState(null);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const getAuthHeaders = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error("Please log in to continue.");
        }

        const token = await currentUser.getIdToken();

        return {
            Authorization: `Bearer ${token}`,
        };
    };

    // Load the saved profile from MongoDB.
    const loadBrandProfile = async () => {
        const headers = await getAuthHeaders();

        const response = await axios.get(
            `${API_URL}/profile`,
            { headers }
        );

        const brandData = response.data.data;

        setFormData(getProfileFormData(brandData));
        setLogoPreview(brandData.logoUrl || "");
        setSelectedLogoFile(null);
        setIsEditing(!isProfileSubmitted(brandData));
    };

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const headers = await getAuthHeaders();

                const response = await axios.get(
                    `${API_URL}/profile`,
                    { headers }
                );

                if (!isMounted) return;

                const brandData = response.data.data;

                setFormData(getProfileFormData(brandData));
                setLogoPreview(brandData.logoUrl || "");
                setIsEditing(!isProfileSubmitted(brandData));
            } catch (err) {
                if (!isMounted) return;

                if (err.response?.status === 404) {
                    setFormData(initialFormData);
                    setLogoPreview("");
                    setIsEditing(true);
                } else {
                    console.error("Failed to load brand profile:", err);

                    setError(
                        err.response?.data?.message ||
                        err.message ||
                        "Unable to load your brand profile."
                    );
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    // Clean up temporary image preview URLs.
    useEffect(() => {
        return () => {
            if (logoPreview.startsWith("blob:")) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    const updateField = (field, value) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));

        setError("");
        setSuccessMessage("");
    };

    const handleLogoChange = (file) => {
        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please select a JPG, PNG, or WEBP image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Logo size must be 5 MB or less.");
            return;
        }

        setSelectedLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
        setError("");
        setSuccessMessage("");
    };

    const handleRemoveLogo = () => {
        setSelectedLogoFile(null);
        setLogoPreview("");
        setError("");
        setSuccessMessage("");
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError("");
        setSuccessMessage("");
    };

    const handleCancelEdit = async () => {
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            await loadBrandProfile();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to reload your saved profile."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event?.preventDefault?.();

        if (isSaving) return;

        setError("");
        setSuccessMessage("");

        if (
            !formData.brandName.trim() ||
            !formData.industry.trim() ||
            !formData.description.trim() ||
            !formData.businessEmail.trim()
        ) {
            setError(
                "Please fill in Brand Name, Industry, Description, and Business Email."
            );
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.businessEmail.trim())) {
            setError("Please enter a valid business email address.");
            return;
        }

        if (formData.website.trim()) {
            try {
                const website = formData.website.trim();
                const normalizedWebsite = /^https?:\/\//i.test(website)
                    ? website
                    : `https://${website}`;

                new URL(normalizedWebsite);
            } catch {
                setError("Please enter a valid website URL.");
                return;
            }
        }

        if (formData.yearEstablished.trim()) {
            const year = Number(formData.yearEstablished);
            const currentYear = new Date().getFullYear();

            if (
                !Number.isInteger(year) ||
                year < 1800 ||
                year > currentYear
            ) {
                setError(
                    `Year established must be between 1800 and ${currentYear}.`
                );
                return;
            }
        }

        setIsSaving(true);

        try {
            const headers = await getAuthHeaders();

            // Save the text fields first.
            await axios.post(
                `${API_URL}/saveprofile`,
                formData,
                { headers }
            );

            // Upload the logo if a new file was selected.
            if (selectedLogoFile) {
                const imageData = new FormData();

                imageData.append("brandLogo", selectedLogoFile);

                const uploadResponse = await axios.post(
                    `${API_URL}/upload-logo`,
                    imageData,
                    { headers }
                );

                if (uploadResponse.data.logoUrl) {
                    setLogoPreview(uploadResponse.data.logoUrl);
                }

                setSelectedLogoFile(null);
            }

            // Fetch the final saved profile, including its logo URL.
            await loadBrandProfile();

            setIsEditing(false);
            setSuccessMessage(
                "Your brand profile has been saved successfully."
            );
        } catch (err) {
            console.error(
                "Failed to save brand profile:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to save your brand profile."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogOut = async () => {
        try {
            await logoutUser();
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Logout failed:", err);
            setError("Unable to log out. Please try again.");
        }
    };

    const profileFields = [
        ...Object.values(formData),
        logoPreview,
    ];

    const completion = Math.round(
        (profileFields.filter((value) =>
            String(value).trim() !== ""
        ).length / profileFields.length) * 100
    );

    return (
        <div className="min-h-screen overflow-x-clip bg-slate-50">
            {/* Pass hover handlers to control sidebar expand/collapse state dynamically */}
            <div
                onMouseEnter={() => setIsSidebarOpen(true)}
                onMouseLeave={() => setIsSidebarOpen(false)}
            >
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onLogout={handleLogOut}
                />
            </div>

            {/* Dynamically adjust left padding based on hover state */}
            <div
                className={`min-h-screen min-w-0 transition-[padding] duration-300 ease-in-out ${
                    isSidebarOpen ? "lg:pl-64" : "lg:pl-16"
                }`}
            >
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    onMenuToggle={() =>
                        setIsSidebarOpen((previous) => !previous)
                    }
                />

                <main className="min-w-0 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6">
                        <BrandProfileHeader
                            isEditing={isEditing}
                            completion={completion}
                            onEdit={handleEdit}
                            onSubmit={handleSubmit}
                        />

                        {error && (
                            <div
                                role="alert"
                                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                            >
                                {error}
                            </div>
                        )}

                        {successMessage && !isEditing && (
                            <div
                                role="status"
                                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                            >
                                {successMessage}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                                <p className="text-sm text-slate-500">
                                    Loading your brand profile...
                                </p>
                            </div>
                        ) : (
                            <>
                                {isEditing ? (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"
                                    >
                                        <div className="min-w-0 space-y-6">
                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Brand Details
                                                </h2>

                                                <BrandProfileDetails
                                                    formData={formData}
                                                    updateField={updateField}
                                                    isEditing={true}
                                                />
                                            </section>

                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Brand Logo
                                                </h2>

                                                <BrandProfileLogo
                                                    logoPreview={logoPreview}
                                                    onLogoChange={handleLogoChange}
                                                    onRemoveLogo={handleRemoveLogo}
                                                    isEditing={true}
                                                    brandName={formData.brandName}
                                                />
                                            </section>

                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Social Media
                                                </h2>

                                                <BrandProfileSocials
                                                    formData={formData}
                                                    updateField={updateField}
                                                    isEditing={true}
                                                />
                                            </section>

                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Business Address & Contact
                                                </h2>

                                                <BrandProfileAddress
                                                    formData={formData}
                                                    updateField={updateField}
                                                    isEditing={true}
                                                />
                                            </section>

                                            <div className="flex flex-wrap justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={handleCancelEdit}
                                                    disabled={isSaving}
                                                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    type="submit"
                                                    disabled={isSaving}
                                                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {isSaving
                                                        ? "Saving..."
                                                        : "Submit Profile"}
                                                </button>
                                            </div>
                                        </div>

                                        <aside className="min-w-0 xl:sticky xl:top-6">
                                            <BrandProfilePreview
                                                formData={formData}
                                                logoPreview={logoPreview}
                                            />
                                        </aside>
                                    </form>
                                ) : (
                                    <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                                        <div className="min-w-0 space-y-6">
                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                                    <h2 className="text-lg font-semibold text-slate-900">
                                                        Your Brand Profile
                                                    </h2>

                                                    <button
                                                        type="button"
                                                        onClick={handleEdit}
                                                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                                                    >
                                                        Edit Profile
                                                    </button>
                                                </div>

                                                <BrandProfileDetails
                                                    formData={formData}
                                                    updateField={updateField}
                                                    isEditing={false}
                                                />
                                            </section>

                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Brand Logo
                                                </h2>

                                                <BrandProfileLogo
                                                    logoPreview={logoPreview}
                                                    onLogoChange={handleLogoChange}
                                                    onRemoveLogo={handleRemoveLogo}
                                                    isEditing={false}
                                                    brandName={formData.brandName}
                                                />
                                            </section>

                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Social Media
                                                </h2>

                                                <BrandProfileSocials
                                                    formData={formData}
                                                    updateField={updateField}
                                                    isEditing={false}
                                                />
                                            </section>

                                            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                                    Business Address & Contact
                                                </h2>

                                                <BrandProfileAddress
                                                    formData={formData}
                                                    updateField={updateField}
                                                    isEditing={false}
                                                />
                                            </section>
                                        </div>

                                        <aside className="min-w-0 xl:sticky xl:top-6">
                                            <BrandProfilePreview
                                                formData={formData}
                                                logoPreview={logoPreview}
                                            />
                                        </aside>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}