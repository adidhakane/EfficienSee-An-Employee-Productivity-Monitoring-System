const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    Estimate_time: String, 
}, { collection: "Employee1" });

const Employee = mongoose.model("Employee1", employeeSchema);
module.exports = Employee;
