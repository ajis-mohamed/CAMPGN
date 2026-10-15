const mongoose = require("mongoose");

const workItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    projectUrl: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    description: {
        type: String,
        required: true,
        minlength: [100, "Work description must be at least 100 characters."],
        maxlength: [300, "Work description cannot be longer than 300 characters."]
    },
    views: { type: String, default: "" },
    likes: { type: String, default: "" },
});

const creatorWorkSchema = new mongoose.Schema(
    {
        creatorUid: {
            type: String,
            required: true,
            unique: true,
        },
        works: {
            type: [workItemSchema],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CreatorWork", creatorWorkSchema);