const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    campaign: {
        type: String,
        required: true,
        trim: true
    },
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    dateRange: {
        type: String,
        required: true
    },
    contentCount: {
        type: String,
        required: true
    },
    logoBg: {
        type: String,
        default: "bg-indigo-600"
    },
    logoText: {
        type: String,
        required: true
    }
}, { timestamps: true });

const creatorCollabSchema = new mongoose.Schema({
    creatorUid: {
        type: String,
        required: true,
        unique: true, // Ensures one document per user UID
        index: true
    },
    collaborations: [collaborationSchema] // Array to hold multiple collaborations under that single UID
}, { timestamps: true });

const CreatorCollab = mongoose.model('CreatorCollab', creatorCollabSchema);

module.exports = CreatorCollab;