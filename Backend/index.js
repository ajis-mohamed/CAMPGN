const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const brand = require("./models/Brand")
const creator = require("./models/Creator")

const brandRoutes = require("./routes/brandRoutes");
const creatorRoutes = require("./routes/creatorRoutes");
const accountType = require("./routes/accountTypeRoute")

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// BRAND REGISTRATION ROUTE
app.use('/brand', brandRoutes)

// CREATOR REGISTRATION ROUTE
app.use("/creator", creatorRoutes);

//  BRAND & CREATOR LOGIN CHECK 
app.use("/accounttype", accountType)

// START SERVER
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});