
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("../serviceAccountKey.json");

// Initialize Firebase Admin only once
if (getApps().length === 0) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required.",
            });
        }

        const idToken = authHeader.split(" ")[1];
        

        // Verify the Firebase ID token
        const decodedToken = await getAuth().verifyIdToken(idToken);

        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email || null,
        };

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token.",
        });
    }
};

module.exports = authMiddleware;
