const express = require("express");
const router = express.Router();

const creator = require("../models/Creator");

const authMiddleware = require("../middleware/authMiddleware")

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


router.post("/saveprofile", async (req, res) => {
    try {
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

        // Validation check for mandatory fields
        if (!uid || !email || !name) {
            return res.status(400).json({ error: "Missing required fields (uid, email, name)" });
        }

        const updatedCreator = await creator.findOneAndUpdate(
            { uid: uid },
            {
                accountType,
                bio,
                collabTypes,
                contentNiche,
                email,
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
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;