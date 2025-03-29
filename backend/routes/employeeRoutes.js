const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// MongoDB connection setup
const db = mongoose.connection;

// Define Schema (Not mandatory to use since collection is dynamic, but can be kept)
const employeeSchema = new mongoose.Schema({
    Estimate_time: String,
});

// Dynamic route for fetching Estimate_time
router.get("/Estimate_time/:employee", async (req, res) => {
    try {
        // Add cache-control header
        res.setHeader("Cache-Control", "no-store");//c

        const employee = req.params.employee; // Example: Employee1
        console.log(`Fetching data from: ${employee}`);

        // Dynamically access the collection
        const collection = db.collection(employee);

        // Fetch documents
        const documents = await collection.find({}).toArray();
        console.log("Fetched documents:", documents);

        // Extract Estimate_time field
        const estimateTimes = documents.map((doc) => doc.Estimate_time);
        console.log("Estimate Times:", estimateTimes);

        // Send response
        res.json(estimateTimes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving Estimate_time");
    }
});

module.exports = router;
