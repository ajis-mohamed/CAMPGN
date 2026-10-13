const mongoose = require("mongoose");

const workItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    projectUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    description: { type: String, default: "" },
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