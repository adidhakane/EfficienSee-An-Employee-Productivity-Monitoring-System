import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="src/Components/Assets/company.jpg"
        alt="A Company Image"
      />
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-image bg-opacity-30 z-1"></div>
      
      {/* Content Container - centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Company Name */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
          EfficienSee
        </h1>
        
        {/* Get Started Button */}
        <button 
          onClick={() => navigate("/login")} 
          className="text-white text-xl sm:text-2xl md:text-3xl border-2 border-white rounded-sm px-6 py-2 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border-blue-500 hover:scale-105"
        >
          Get Started!
        </button>
      </div>
    </div>
  );
};

export default Company;