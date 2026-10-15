
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        // Registration details — preserve existing fields
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        uid: {
            type: String,
            required: true,
            unique: true
        },
        accountType: {
            type: String,
            default: "brand"
        },

        // Brand profile details
        brandName: {
            type: String,
            default: ""
        },
        industry: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        companySize: {
            type: String,
            default: ""
        },
        yearEstablished: {
            type: String,
            default: ""
        },

        // Social media links
        instagram: {
            type: String,
            default: ""
        },
        youtube: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        otherLink: {
            type: String,
            default: ""
        },

        // Business address and contact
        country: {
            type: String,
            default: "India"
        },
        state: {
            type: String,
            default: "Tamil Nadu"
        },
        city: {
            type: String,
            default: ""
        },
        businessEmail: {
            type: String,
            default: ""
        },
        contactNumber: {
            type: String,
            default: ""
        },

        // Persistent brand logo URL (Cloudinary)
        logoUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Brand ||
    mongoose.model("Brand", brandSchema);
