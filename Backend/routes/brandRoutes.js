const express = require("express");

const router = express.Router();

const brand = require("../models/Brand");

// BRAND REGISTRATION
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
        if (accountType !== "brand") {
            return res.status(400).json({
                success: false,
                message: "Invalid account type provided."
            });
        }

        // 4. Check existing brand
        const existingBrand = await brand.findOne({
            $or: [
                { email: trimmedEmail },
                { uid: trimmedUid }
            ]
        });

        if (existingBrand) {
            return res.status(409).json({
                success: false,
                message: "An account with this email or UID already exists."
            });
        }

        // 5. Create brand
        const newBrand = await brand.create({
            name: trimmedName,
            email: trimmedEmail,
            uid: trimmedUid,
            accountType
        });

        return res.status(201).json({
            success: true,
            message: "Brand account created successfully",
            data: newBrand
        });

    } catch (error) {
        console.error("Error creating brand:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
});

module.exports = router;