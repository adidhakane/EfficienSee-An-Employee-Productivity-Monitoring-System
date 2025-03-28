const express = require('express');
const router = express.Router();

router.post('/start_monitoring', (req, res) => {
    res.json({ message: "Monitoring started successfully" });
});

router.post('/stop_monitoring', (req, res) => {
    console.log("Stop monitoring request received");
    res.status(200).json({ message: "Monitoring stopped" });
});


module.exports = router;
