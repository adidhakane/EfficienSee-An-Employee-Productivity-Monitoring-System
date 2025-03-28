const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// Example manager route
router.get("/dashboard", verifyToken, authorizeRole(["manager"]), (req, res) => {
    res.json({ message: "Welcome to the Manager's Dashboard" });
});

module.exports = router;
