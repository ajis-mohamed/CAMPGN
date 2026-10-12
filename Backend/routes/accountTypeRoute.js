const express = require("express");
const router = express.Router();

const brand = require("../models/Brand");
const creator = require("../models/Creator");

// GET /accounttype?uid=...
router.get("/", async (req, res) => {
    try {
        const { uid } = req.query;

        // 1. Validate that UID was provided
        if (!uid?.trim()) {
            return res.status(400).json({
                success: false,
                message: "UID parameter is required."
            });
        }

        const trimmedUid = uid.trim();

        // 2. Search in Brand collection
        const brandUser = await brand.findOne({ uid: trimmedUid });
        if (brandUser) {
            return res.status(200).json({
                success: true,
                accountType: brandUser.accountType || "brand"
            });
        }

        // 3. Search in Creator collection
        const creatorUser = await creator.findOne({ uid: trimmedUid });
        if (creatorUser) {
            return res.status(200).json({
                success: true,
                accountType: creatorUser.accountType || "creator"
            });
        }

        // 4. Handle user not found in either collection
        return res.status(404).json({
            success: false,
            message: "User account not found."
        });

    } catch (error) {
        console.error("Error fetching account type:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

module.exports = router;