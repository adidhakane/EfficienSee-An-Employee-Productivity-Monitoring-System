import React, { useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSignup = async () => {
    try {
      setError("");

      if (!name || !email || !password || !role) {
        throw new Error("All fields are required");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: role.toLowerCase(),
        createdAt: new Date(),
      });

      const sanitizedEmail = sanitizeEmail(email); 
      localStorage.setItem("email", email);
      localStorage.setItem("sanitizedEmail", sanitizedEmail);

      if (role.toLowerCase() === "employee") {
        try {
          const response = await fetch("http://localhost:5000/api/employees/create-collection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || "Failed to create collection");
          }

          console.log("MongoDB Response:", result);
          if (result.collection) {
            localStorage.setItem("sanitizedCollectionName", result.collection);
          }
        } catch (err) {
          console.error("Collection error:", err);
          throw new Error("Failed to initialize employee storage");
        }
      }

      alert(`Successfully signed up as ${role}!`);
      setAction("Login");
      setEmail("");
      setPassword("");
      setName("");

      // Navigate to the login page after successful signup
      navigate("/login?mode=login");

    } catch (error) {
      let message = error.message;
      if (error.code === "auth/email-already-in-use") {
        message = "Email is already registered. Please login instead.";
      }
      setError(message.replace("Firebase:", ""));
    }
  };
  
  const sanitizeEmail = (email) => {
    return email.toLowerCase().replace(/@/g, '_at_').replace(/\./g, '_dot_');
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) throw new Error("User data not found");

      const userRole = userDoc.data().role.toLowerCase();
      const sanitizedEmail = sanitizeEmail(email);

      localStorage.setItem('email', email);
      localStorage.setItem('sanitizedEmail', sanitizedEmail);
      
      navigate(userRole === "manager" ? "/manager" : "/employee");

    } catch (error) {
      setError(error.message.replace("Firebase:", ""));
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 relative">
      {/* Back Button - Top Left */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 z-20 text-white hover:text-gray-200 transition"
      >
        <ArrowBackIcon className="mr-1" /> Go Back
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Responsive Card */}
        <div className="relative ml-80 bg-white p-6 sm:p-8 rounded-lg shadow-lg z-10 w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-4">Welcome!</h1>

          <div className="text-center">
            <h2 className="text-xl font-semibold">{action}</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-1"></div>
          </div>

          {/* Input Fields */}
          <div className="mt-6">
            {action === "Sign up" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Select Role</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <button 
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={action === "Sign up" ? handleSignup : handleLogin}
              >
                {action}
              </button>

              <button 
                className="bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setAction(action === "Sign up" ? "Login" : "Sign up")}
              >
                {action === "Sign up" ? "Switch to Login" : "Switch to Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
