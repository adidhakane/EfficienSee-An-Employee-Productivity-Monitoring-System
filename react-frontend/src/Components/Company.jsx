import { useNavigate } from "react-router-dom";


const Company = () => {
  const navigate = useNavigate();
    return (
      <div className="relative top-0 left-0 w-full h-[639px]">
        <h1 className="translate-x-[500px] translate-y-[200px] absolute text-white z-2 text-7xl">
          EfficienSee
        </h1>
        <button onClick={()=>navigate("/login")} className="translate-x-[570px] translate-y-[300px] absolute text-white text-3xl border-2 border-white rounded-sm px-6 py-2 transition-all duration-300 ease-in-out 
          hover:bg-blue-500 hover:text-white">
          Get Started!
        </button>
        <img
          className="z-0 object-cover w-full h-full"
          src="src/Components/Assets/company.jpg"
          alt="A Company Image"
        />
      </div>
    );
  };
  
  export default Company;
  