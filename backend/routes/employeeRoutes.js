const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET: Fetch `Estimate_time`
router.get("/estimate-time", async (req, res) => {
    try {
        const employees = await Employee.find({}, "Estimate_time");
        res.json(employees);
    } catch (error) {
        console.error("❌ Error Fetching Data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
