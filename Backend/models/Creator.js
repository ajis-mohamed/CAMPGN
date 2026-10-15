
const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
    {
        // Basic registration details
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        uid: {
            type: String,
            required: true,
            index: true,
        },

        accountType: {
            type: String
        },

        // Creator profile details
        username: {
            type: String,
            trim: true,
            default: "",
        },

        bio: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        niche: {
            type: String,
            trim: true,
            default: "",
        },

        // Store the narrative fields edited by CreatorNarratives in MongoDB.
        contentNiche: {
            type: [String],
            default: [],
            validate: {
                validator: (items) => items.length <= 5,
                message: "You can add up to 5 content specialities."
            }
        },

        targetAudience: {
            type: String,
            trim: true,
            default: "",
        },

        collabTypes: {
            type: [String],
            default: [],
            validate: {
                validator: (items) => items.length <= 5,
                message: "You can add up to 5 preferred partnerships."
            }
        },

        location: {
            type: String,
            trim: true,
            default: "",
        },

        // Keep all fields edited by CreatorDetails in MongoDB instead of dropping them as unknown fields.
        languages: {
            type: String,
            trim: true,
            default: "",
        },

        tier: {
            type: String,
            trim: true,
            default: "",
        },

        turnaround: {
            type: String,
            trim: true,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },

        // Creator social media links
        socialLinks: {
            instagram: {
                type: String,
                default: "",
            },
            youtube: {
                type: String,
                default: "",
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Creator", creatorSchema);
