
const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const brand = require("../models/Brand");
const authMiddleware = require("../middleware/authMiddleware");

// MULTER TO STORE IMAGE IN MEMORY
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and WebP images are allowed."));
        }
    },
});

// BRAND REGISTRATION
router.post("/", async (req, res) => {
    try {
        const { name, email, accountType, uid } = req.body;

        if (
            !name?.trim() ||
            !email?.trim() ||
            !accountType?.trim() ||
            !uid?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, accountType, and uid are required.",
            });
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedUid = uid.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        if (accountType !== "brand") {
            return res.status(400).json({
                success: false,
                message: "Invalid account type.",
            });
        }

        const existingBrand = await brand.findOne({
            $or: [
                { email: trimmedEmail },
                { uid: trimmedUid },
            ],
        });

        if (existingBrand) {
            return res.status(409).json({
                success: false,
                message: "An account with this email or UID already exists.",
            });
        }

        const newBrand = await brand.create({
            name: trimmedName,
            email: trimmedEmail,
            uid: trimmedUid,
            accountType,
        });

        return res.status(201).json({
            success: true,
            message: "Brand account created successfully.",
            data: newBrand,
        });
    } catch (error) {
        console.error("Error creating brand:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create brand account.",
        });
    }
});

// GET BRAND PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const brandProfile = await brand.findOne({
            uid: req.user.uid,
            accountType: "brand",
        });

        if (!brandProfile) {
            return res.status(404).json({
                success: false,
                message: "Brand profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: brandProfile,
        });
    } catch (error) {
        console.error("Error fetching brand profile:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch brand profile.",
        });
    }
});

// SAVE BRAND PROFILE
router.post("/saveprofile", authMiddleware, async (req, res) => {
    try {
        const {
            brandName,
            industry,
            description,
            website,
            companySize,
            yearEstablished,
            instagram,
            youtube,
            linkedin,
            otherLink,
            country,
            state,
            city,
            businessEmail,
            contactNumber,
        } = req.body;

        const updates = {
            brandName,
            industry,
            description,
            website,
            companySize,
            yearEstablished,
            instagram,
            youtube,
            linkedin,
            otherLink,
            country,
            state,
            city,
            businessEmail,
            contactNumber,
        };

        // Only update fields supplied as strings.
        for (const key of Object.keys(updates)) {
            if (updates[key] === undefined) {
                delete updates[key];
            } else if (typeof updates[key] !== "string") {
                return res.status(400).json({
                    success: false,
                    message: `${key} must be a string.`,
                });
            } else {
                updates[key] = updates[key].trim();
            }
        }

        const updatedBrand = await brand.findOneAndUpdate(
            {
                uid: req.user.uid,
                accountType: "brand",
            },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedBrand) {
            return res.status(404).json({
                success: false,
                message: "Brand account not found. Register first.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Brand profile saved successfully.",
            data: updatedBrand,
        });
    } catch (error) {
        console.error("Error saving brand profile:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to save brand profile.",
        });
    }
});

// BRAND LOGO UPLOAD
router.post(
    "/upload-logo",
    authMiddleware,
    upload.single("brandLogo"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Please select a brand logo.",
                });
            }

            const brandProfile = await brand.findOne({
                uid: req.user.uid,
                accountType: "brand",
            });

            if (!brandProfile) {
                return res.status(404).json({
                    success: false,
                    message: "Brand profile not found.",
                });
            }

            const imageUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "campgn/brand-logos",
                        resource_type: "image",
                        transformation: [
                            { width: 500, height: 500, crop: "limit" },
                        ],
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );

                stream.end(req.file.buffer);
            });

            brandProfile.logoUrl = imageUrl;
            await brandProfile.save();

            return res.status(200).json({
                success: true,
                message: "Brand logo uploaded successfully.",
                logoUrl: imageUrl,
            });
        } catch (error) {
            console.error("Brand logo upload failed:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to upload brand logo.",
            });
        }
    }
);

module.exports = router;
