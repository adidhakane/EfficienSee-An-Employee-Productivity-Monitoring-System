import "./Footer.css";
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <div className="footer flex justify-between flex-row bg-black h-[300px] w-full rounded-t-3xl text-white mt-16 p-8">
      {/* About Us Section */}
      <div className="flex flex-col justify-center text-white">
        <h1 className="text-5xl -translate-y-[50px]">About Us</h1>
        <h3 className="text-2xl"><EmailIcon style={{scale : "1.3"}} fontSize="medium"/> Email us </h3><p><br /><span className="text-blue-500">bhishmadandekar@gmail.com</span><br />
        <span className="text-blue-500">adityadhakane@gmail.com</span><br />
        <span className="text-blue-500">prathamdattawade@gmail.com</span></p>
      </div>

      {/* Another Section */}
      <div className="flex flex-col justify-center text-white">
        <h2 className="text-2xl -translate-y-3.5"><BusinessIcon/> Address</h2>
        <p>Vishwakarma Institute of Technology, Pune, 411037</p>
      </div>
      <div className="flex flex-col justify-center translate-3 text-white">
        <h2 className="text-2xl "><PhoneIcon/> Contact Us</h2>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; 7249621727</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; 8208888178</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; 8766903584</p>
      </div>
      <div>
        <h1> </h1>
      </div>
    </div>
  );
};

export default Footer;
