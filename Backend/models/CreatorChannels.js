const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    platform: { type: String, required: true }, // "Instagram" or "YouTube"
    handle: { type: String, required: true },
    metrics: { type: String, required: true },
    url: { type: String, required: true },
    bgColor: { type: String, default: "bg-slate-50/60" },
    borderColor: { type: String, default: "border-slate-200/60" }
}, { timestamps: true });

const creatorChannelsSchema = new mongoose.Schema({
    creatorUid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    channels: [channelSchema]
}, { timestamps: true });

const CreatorChannelsModel = mongoose.model('CreatorChannels', creatorChannelsSchema);

module.exports = CreatorChannelsModel;