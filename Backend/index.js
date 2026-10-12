const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const brand = require("./models/Brand")
const creator = require("./models/Creator")

const brandRoutes = require("./routes/brandRoutes");
const creatorRoutes = require("./routes/creatorRoutes");
const accountType = require("./routes/accountTypeRoute")

dotenv.config();

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