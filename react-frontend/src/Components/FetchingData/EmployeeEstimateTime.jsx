import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeEstimateTime = () => {
    const [estimateTimes, setEstimateTimes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/employees/estimate-time")
            .then(response => {
                setEstimateTimes(response.data);
            })
            .catch(error => {
                console.error("❌ Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <h2>Employee Estimate Times</h2>
            <ul>
                {estimateTimes.length > 0 ? (
                    estimateTimes.map((employee, index) => (
                        <li key={index}>Estimate Time: {employee.Estimate_time} hours</li>
                    ))
                ) : (
                    <p>No data found</p>
                )}
            </ul>
        </div>
    );
};

export default EmployeeEstimateTime;
