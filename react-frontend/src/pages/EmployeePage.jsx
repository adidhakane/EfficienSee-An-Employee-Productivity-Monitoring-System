import React, { useState , useEffect } from "react";
import axios from "axios";
import ElapsedTimeDisplay from "../Components/FetchingData/ElapsedTimeDisplay";
import FetchingDataPro from "../Components/FetchingData/FetchingDataPro";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [report, setReport] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const sanitizedEmail = localStorage.getItem("sanitizedEmail")

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees/fetch-data", {
          params: { employee: sanitizedEmail, range: "day" } // Replace with actual employee email
        });
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const startMonitoring = async () => {
    try {
        const response = await axios.post("http://localhost:5001/start_monitoring", {});
        console.log("Start Monitoring Response:", response.data);
        setIsMonitoring(true);
    } catch (error) {
        console.error("Error starting monitoring:", error.response ? error.response.data : error.message);
    }
  };

  const stopMonitoring = async () => {
    try {
      const email = localStorage.getItem("email"); // Retrieve email from localStorage
      if (!email) {
        console.error("Error: Email not found in localStorage");
        return;
      }
  
      const response = await axios.post("http://localhost:5001/stop_monitoring", { email });
      console.log("Stop Monitoring Response:", response.data);
      setIsMonitoring(false);
    } catch (error) {
      console.error(
        "Error stopping monitoring:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  let email = localStorage.getItem("email");
  const navigate = useNavigate();
  return (
    <div className="">
      <div style={{background : "#2176ff", height:"4.2rem"}} className="flex flex-row justify-between"><span className="translate-y-4.5" onClick={()=>navigate("/login")}> <ArrowBackIcon/> Go Back</span><h1 className="p-1.5 text-4xl font-medium -translate-x-9">Employee Dashboard</h1><div></div> </div>
      <br />
      <h1 className="flex flex-row justify-center text-2xl font-bold mb-4 mt-2.5">Displaying the Dashboard for user with email : &nbsp; <span className="text-blue-600">{email}</span> </h1>
      
      <div className="flex flex-row justify-center gap-26">
      <button
        onClick={startMonitoring}
        className={`px-4 py-2 rounded-lg ${isMonitoring ? "bg-gray-500" : "bg-green-500"} text-white`}
        disabled={isMonitoring}
      >
        {isMonitoring ? "Monitoring..." : "Start Working"}
      </button>

      <button
        onClick={stopMonitoring}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        disabled={!isMonitoring}
      >
        Stop Working
      </button>
      </div>
      

      {report && (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Work Report</h2>
          <p>Total Time: {report.elapsed_time}</p>
          <p>Tab Switches: {report.tab_switched_count}</p>
          <p>Active Time: {report.active_duration}</p>
          <p>Inactive Time: {report.inactive_duration}</p>
          <p>Break Time: {report.break_time}</p>
          <p>Breaks Taken: {report.break_counter}</p>
        </div>
      )}
          {/* record = {
        "Date": datetime.now().strftime("%Y-%m-%d"),
        "elapsed_time": convert_to_hms(elapsed_time),  # Fixed calculation for total monitoring duration
        "tab_switched_count": tab_switch_count,
        "active_duration": convert_to_hms(active_duration),
        "inactive_duration": convert_to_hms(inactive_duration),
        "break_time": convert_to_hms(total_break_time),
        "break_counter": break_counter
    } */}
          <ElapsedTimeDisplay/>
    </div>

  );
};

export default EmployeeDashboard;
