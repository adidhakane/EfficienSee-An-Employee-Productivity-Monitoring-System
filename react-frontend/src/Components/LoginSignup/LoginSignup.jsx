import React, { useState } from "react";
import { auth } from "../../Firebase/Firebase"; // Updated import
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";
import PasswordSharpIcon from "@mui/icons-material/PasswordSharp";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
    const [action, setAction] = useState("Sign up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const [dropdown , setdropdown] = useState("");
    const [role,setrole] = useState("");

    const navigate = useNavigate();  

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name }); 
            alert("Signup successful! You can now log in.");
            setAction("Login");
        } catch (error) {
            setError(error.message.replace("Firebase:", "")); 
        }
    };

    const handleLogin = async (event) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if(role === "Employee"){
                navigate("/employee");
            }else if(role === "Manager"){
                navigate("/manager");
            }
        } catch (error) {
            setError(error.message.replace("Firebase:", ""));
        }
    };

    const handledropdown = (event) =>{
        setdropdown(event.target.value);
        console.log(event.target.value);
        if(event.target.value === "Employee"){
            setrole("Employee")
        }else if(event.target.value === "Manager"){
            setrole("Manager");
        }
    }
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-blue-600">
            {/* Background Video */}
            <video 
                autoPlay loop muted 
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/path-to-your-video.mp4" 
            ></video>

            {/* Content Box */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-96">
                <h1 className="text-center text-2xl font-bold mb-4">Welcome!</h1>

                <div className="text-center">
                    <h2 className="text-xl font-semibold">{action}</h2>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-1"></div>
                </div>

                {/* Input Fields */}
                <div className="mt-6">
                    {action === "Sign up" && (
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <PersonIcon className="mr-2 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="flex-1 outline-none"
                            />
                        </div>
                    )}

                    <div className="flex items-center border-b border-gray-300 py-2 mt-3">
                        <AlternateEmailSharpIcon className="mr-2 text-gray-500" />
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="flex-1 outline-none"
                        />
                    </div>

                    <div className="flex items-center border-b border-gray-300 py-2 mt-3">
                        <PasswordSharpIcon className="mr-2 text-gray-500" />
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="flex-1 outline-none"
                        />
                    </div>
                    <div className="p-4">
                        <label className="block mb-2 font-semibold">Select your Role</label>
                        <select value={dropdown}
                        onChange={handledropdown}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>

                    {action === "Login" && (
                        <div className="text-right text-sm text-blue-500 mt-2 cursor-pointer">
                            Forgot Password?
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col gap-3">
                        <button 
                            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={action === "Sign up" ? handleSignup : handleLogin}
                        >
                            {action}
                        </button>

                        <button 
                            className="bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
                            onClick={() => setAction(action === "Sign up" ? "Login" : "Sign up")}
                        >
                            {action === "Sign up" ? "Switch to Login" : "Switch to Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
