import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate(); // Initialize useNavigate inside the component

    return (
        <div className="Navbar flex justify-between items-center px-5 py-3 bg-gray-800 text-white">
            <div className="pl-5">
                <h1 className="text-xl font-bold">EfficienSee</h1>
            </div>
            <div className="navButtons flex gap-4">
                <button className="button">Home</button>
                <button className="button">Featured</button>
                <button className="button">Contact Us</button>
                <button onClick={() => navigate("/login")} className="button">Login</button>
                <button onClick={()=>navigate("/login")} className="button">Signup</button>
            </div>
        </div>
    );
};

export default Navbar;
