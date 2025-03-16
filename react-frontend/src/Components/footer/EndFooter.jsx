import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer flex justify-between flex-row bg-black h-[300px] w-full rounded-t-3xl text-white mt-16 p-8">
      {/* About Us Section */}
      <div className="flex flex-col justify-center text-white">
        <h1 className="text-5xl -translate-y-[50px]">About Us</h1>
        <h3 className="text-2xl">Email us </h3><p><br /><span className="text-blue-500">bhishmadandekar@gmail.com</span><br />
        <span className="text-blue-500">adityadhakane@gmail.com</span><br />
        <span className="text-blue-500">prathamdattawade@gmail.com</span></p>
      </div>

      {/* Another Section */}
      <div className="flex flex-col justify-center text-white">
        <h2 className="text-2xl -translate-y-3.5">Address</h2>
        <p>Vishwakarma Institute of Technology, Pune, 411037</p>
      </div>
      <div className="flex flex-col justify-center translate-3 text-white">
        <h2 className="text-2xl ">Contact Us</h2>
        <p>7249621727</p>
        <p>8208888178</p>
        <p>8766903584</p>
      </div>
      <div>
        <h1> </h1>
      </div>
    </div>
  );
};

export default Footer;
