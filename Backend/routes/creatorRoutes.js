const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const creator = require("../models/Creator");
const creatorWork = require("../models/CreatorWork")
const creatorCollab = require("../models/CreatorCollab")
const CreatorChannels = require("../models/CreatorChannels")

const authMiddleware = require("../middleware/authMiddleware")

// MULTER TO STORE IMAGE
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB maximum
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and WebP images are allowed."));
        }
    },
});

router.post("/", async (req, res) => {
    try {
        const { name, email, accountType, uid } = req.body;

        // 1. Check missing fields
        if (
            !name?.trim() ||
            !email?.trim() ||
            !accountType?.trim() ||
            !uid?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, accountType, and uid are required fields."
            });
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedUid = uid.trim();

        // 2. Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        // 3. Validate account type
        if (accountType !== "creator") {
            return res.status(400).json({
                success: false,
                message: "Invalid account type provided."
            });
        }

        // 4. Check existing creator
        const existingCreator = await creator.findOne({
            $or: [
                { email: trimmedEmail },
                { uid: trimmedUid }
            ]
        });

        if (existingCreator) {
            return res.status(409).json({
                success: false,
                message: "An account with this email or UID already exists."
            });
        }

        // 5. Create creator
        const newCreator = await creator.create({
            name: trimmedName,
            email: trimmedEmail,
            uid: trimmedUid,
            accountType
        });

        return res.status(201).json({
            success: true,
            message: "Creator account created successfully",
            data: newCreator
        });

    } catch (error) {
        console.error("Error creating creator:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
});
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const creatorProfile = await creator.findOne({ uid: req.user.uid })

        if (!creatorProfile) {
            return res.status(404).json({
                success: false,
                message: "Creator profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: creatorProfile,
        });
    } catch (error) {
        console.error("Error fetching creator profile:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch creator profile.",
        });
    }
});

// IMAGE UPLOAD
router.post("/upload-profile-image", authMiddleware, upload.single("profileImage"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Please select a profile picture.",
                });
            }

            const creatorProfile = await creator.findOne({
                uid: req.user.uid,
            });

            if (!creatorProfile) {
                return res.status(404).json({
                    success: false,
                    message: "Creator profile not found.",
                });
            }

            // Upload the image buffer to Cloudinary.
            const imageUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "capgn/profile-images",
                        resource_type: "image",
                        transformation: [
                            { width: 500, height: 500, crop: "limit" },
                        ],
                    },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }

                        resolve(result.secure_url);
                    }
                );

                stream.end(req.file.buffer);
            });

            // Save the image URL in the existing creator document.
            creatorProfile.profileImage = imageUrl;
            await creatorProfile.save();

            return res.status(200).json({
                success: true,
                message: "Profile picture uploaded successfully.",
                profileImage: imageUrl,
            });
        } catch (error) {
            console.error("Profile image upload failed:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to upload profile picture. Please try again.",
            });
        }
    }
);

router.post("/work-thumbnail-signature", authMiddleware, async (req, res) => {
    try {
        const config = cloudinary.config();

        if (!config.cloud_name || !config.api_key || !config.api_secret) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary configuration is incomplete.",
            });
        }

        const timestamp = Math.round(Date.now() / 1000);
        const folder = "campgn/work-thumbnails";

        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder,
            },
            config.api_secret
        );

        return res.status(200).json({
            success: true,
            timestamp,
            signature,
            apiKey: config.api_key,
            cloudName: config.cloud_name,
            folder,
        });
    } catch (error) {
        console.error("Thumbnail signature generation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Could not prepare thumbnail upload.",
        });
    }
});


//CREATOR DETAILS SAVING IN DATABASES
router.post("/saveprofile", authMiddleware, async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Profile data is required." });
        }
        const {
            accountType, bio, collabTypes,
            contentNiche,
            email, languages,
            location, name,
            niche, profileImage,
            socialLinks, tier,
            targetAudience, turnaround, uid,
            username
        } = req.body;

        if (typeof bio === "string" && bio.length > 500) {
            return res.status(400).json({ success: false, message: "Bio cannot be longer than 500 characters." });
        }
        if (contentNiche !== undefined && (!Array.isArray(contentNiche) || contentNiche.length > 5)) {
            return res.status(400).json({ success: false, message: "You can add up to 5 content specialities." });
        }
        if (collabTypes !== undefined && (!Array.isArray(collabTypes) || collabTypes.length > 5)) {
            return res.status(400).json({ success: false, message: "You can add up to 5 preferred partnerships." });
        }

        // Validation check for mandatory fields
        if (!name?.trim()) {
            return res.status(400).json({ error: "Missing required fields (uid, email, name)" });
        }

        if (email !== req.user.email) {
            return res.status(403).json({ success: false, message: "You can only update your own profile." });
        }

        const updatedCreator = await creator.findOneAndUpdate(
            { uid: req.user.uid },
            {
                accountType,
                bio,
                collabTypes,
                contentNiche,
                email: req.user.email,
                languages,
                location,
                name,
                niche,
                profileImage,
                socialLinks,
                tier,
                targetAudience,
                turnaround,
                username
            },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Profile saved successfully",
            updatedCreator
        });

    } catch (error) {
        console.error("Error saving profile:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// SAVING WORKS AND RESPONDING ADDED WORKS
router.post("/saveworks", authMiddleware, async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Work data is required." });
        }
        const { works } = req.body;

        if (!Array.isArray(works)) {
            return res.status(400).json({ success: false, message: "Work items must be provided as a list." });
        }

        for (const work of works) {
            if (!work || typeof work.title !== "string" || !work.title.trim() ||
                typeof work.category !== "string" || !work.category.trim() ||
                typeof work.projectUrl !== "string" || !work.projectUrl.trim()) {
                return res.status(400).json({ success: false, message: "Each work item needs a title, category, and project link." });
            }
            const descriptionLength = typeof work.description === "string" ? work.description.trim().length : 0;
            if (descriptionLength < 100 || descriptionLength > 300) {
                return res.status(400).json({ success: false, message: "Each work description must be between 100 and 300 characters." });
            }
            try {
                const url = new URL(work.projectUrl);
                if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid protocol");
            } catch {
                return res.status(400).json({ success: false, message: "Enter a valid project link starting with http:// or https://." });
            }
            if (work.thumbnailUrl) {
                try {
                    const thumbnailUrl = new URL(work.thumbnailUrl);
                    if (!["http:", "https:"].includes(thumbnailUrl.protocol)) throw new Error("Invalid protocol");
                } catch {
                    return res.status(400).json({ success: false, message: "Enter a valid thumbnail image link." });
                }
            }
        }

        const updatedRecord = await creatorWork.findOneAndUpdate(
            { creatorUid: req.user.uid },
            { $set: { works } },
            { new: true, upsert: true, runValidators: true }
        );

        console.log("Successfully saved works for creator:", req.user.uid);

        return res.status(200).json({
            success: true,
            message: "Works saved successfully!",
            data: updatedRecord
        });

    } catch (error) {
        console.error("Error saving works:", error);
        return res.status(error.name === "ValidationError" ? 400 : 500).json({
            success: false,
            message: error.name === "ValidationError" ? error.message : "Server error while saving works.",
            error: error.message
        });
    }
});
router.get("/getworks/:creatorUid", authMiddleware, async (req, res) => {
    try {
        const { creatorUid } = req.params;

        if (creatorUid !== req.user.uid) {
            return res.status(403).json({ success: false, message: "You can only view your own work." });
        }
        if (!creatorUid) {
            return res.status(400).json({ success: false, message: "creatorUid is required." });
        }

        // Find the record matching the creator's UID
        const record = await creatorWork.findOne({ creatorUid: creatorUid });

        if (!record) {
            return res.status(200).json({ success: true, message: "No works added yet.", data: { works: [] } });
        }

        return res.status(200).json({
            success: true,
            message: "Works fetched successfully!",
            data: record
        });

    } catch (error) {
        console.error("Error fetching works:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching works.",
            error: error.message
        });
    }
});



// SAVING COLLAB AND RESPONDING ADDED WORKS
router.post("/savecollab", authMiddleware, async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Collaboration data is required." });
        }
        const { collaborations } = req.body;

        if (!Array.isArray(collaborations)) {
            return res.status(400).json({
                success: false,
                message: "Collaborations must be provided as a list."
            });
        }

        for (const item of collaborations) {
            if (!item || typeof item.brand !== "string" || !item.brand.trim() ||
                typeof item.campaign !== "string" || !item.campaign.trim() ||
                typeof item.fromDate !== "string" || !item.fromDate ||
                typeof item.toDate !== "string" || !item.toDate ||
                typeof item.contentCount !== "string" || !item.contentCount.trim()) {
                return res.status(400).json({ success: false, message: "Fill in the brand, campaign, dates, and content count." });
            }
            const fromDate = new Date(item.fromDate);
            const toDate = new Date(item.toDate);
            if (!Number.isFinite(fromDate.getTime()) || !Number.isFinite(toDate.getTime())) {
                return res.status(400).json({ success: false, message: "Enter valid collaboration dates." });
            }
            if (toDate < fromDate) {
                return res.status(400).json({ success: false, message: "The end date must be on or after the start date." });
            }
        }

        const updatedDoc = await creatorCollab.findOneAndUpdate(
            { creatorUid: req.user.uid },
            { $set: { collaborations } },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Collaboration saved successfully",
            data: updatedDoc
        });

    } catch (error) {
        console.error("Error saving collaboration:", error);
        res.status(error.name === "ValidationError" ? 400 : 500).json({
            success: false,
            message: error.name === "ValidationError" ? error.message : "Server error while saving collaborations.",
            error: error.message
        });
    }
});
router.get("/getcollab/:creatorUid", authMiddleware, async (req, res) => {
    try {
        const { creatorUid } = req.params;

        if (creatorUid !== req.user.uid) {
            return res.status(403).json({ success: false, message: "You can only view your own collaborations." });
        }

        const record = await creatorCollab.findOne({ creatorUid: req.user.uid });

        res.status(200).json({
            success: true,
            collaborations: record ? record.collaborations : []
        });

    } catch (error) {
        console.error("Error fetching collaborations:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// SAVING CHANNELS AND RESPONDING ADDED CHANNELS
router.post("/savechannels", authMiddleware, async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Channel data is required." });
        }
        const { channels } = req.body;

        if (!Array.isArray(channels)) {
            return res.status(400).json({ success: false, message: "Channels must be provided as a list." });
        }

        for (const channel of channels) {
            if (!channel || typeof channel !== "object") {
                return res.status(400).json({ success: false, message: "Each channel must include a platform, handle, and valid profile link." });
            }
            let host;
            try {
                const url = new URL(channel.url);
                if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid protocol");
                host = url.hostname.toLowerCase().replace(/^www\./, "");
            } catch {
                return res.status(400).json({ success: false, message: "Enter a valid social profile link." });
            }

            const isInstagram = channel.platform === "Instagram" && host === "instagram.com";
            const isYoutube = channel.platform === "YouTube" && ["youtube.com", "m.youtube.com", "youtu.be"].includes(host);
            if ((!isInstagram && !isYoutube) || typeof channel.handle !== "string" || !channel.handle.trim()) {
                return res.status(400).json({
                    success: false,
                    message: channel.platform === "Instagram"
                        ? "Enter a valid Instagram profile link (instagram.com)."
                        : "Enter a valid YouTube channel link (youtube.com or youtu.be)."
                });
            }
        }

        const updatedDoc = await CreatorChannels.findOneAndUpdate(
            { creatorUid: req.user.uid },
            { $set: { channels } },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Channels saved successfully",
            data: updatedDoc
        });
    } catch (error) {
        console.error("Error saving channels:", error);
        res.status(error.name === "ValidationError" ? 400 : 500).json({
            success: false,
            message: error.name === "ValidationError" ? error.message : "Server error while saving channels.",
            error: error.message
        });
    }
});
router.get("/getchannels/:creatorUid", authMiddleware, async (req, res) => {
    try {
        const { creatorUid } = req.params;
        if (creatorUid !== req.user.uid) {
            return res.status(403).json({ success: false, message: "You can only view your own channels." });
        }
        const record = await CreatorChannels.findOne({ creatorUid: req.user.uid });

        res.status(200).json({
            success: true,
            channels: record ? record.channels : []
        });
    } catch (error) {
        console.error("Error fetching channels:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;