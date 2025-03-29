    const jwt = require("jsonwebtoken");
    const User = require("../models/User");

    const verifyToken = async (req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id); // Fresh DB check
            if (!user) throw new Error("User not found");
            req.user = user;
            next();
        } catch (error) {
            res.status(403).json({ message: "Invalid Token" });
        }
    };

    const authorizeRole = (allowedRoles) => {
        return (req, res, next) => {
            if (!req.user || !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
            }
            next();
        };
    };

    module.exports = { verifyToken, authorizeRole };
