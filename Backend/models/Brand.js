const mongoose = require("mongoose");

const brand = mongoose.model("Brand", new mongoose.Schema({
    name: String,
    email: String,
    uid: String,
    accountType: { type: String, default: "brand" }
}));

module.exports = brand;