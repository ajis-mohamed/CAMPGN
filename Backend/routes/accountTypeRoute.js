const express = require("express");
const router = express.Router();

const brand = require("../models/Brand");
const creator = require("../models/Creator");
const authMiddleware = require("../middleware/authMiddleware");

// GET accounttype
router.get("/", authMiddleware, async (req, res) => {
    try {
        const brandUser = await brand.findOne({ uid: req.user.uid });
        if (brandUser) {
            return res.status(200).json({
                success: true,
                accountType: brandUser.accountType || "brand"
            });
        }

        const creatorUser = await creator.findOne({ uid: req.user.uid });
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