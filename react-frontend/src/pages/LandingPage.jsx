import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Company from "../Components/Company";
import LocomotiveScroll from 'locomotive-scroll';
import CountUp from "../Components/Counter/CountUp";
import Featured from "../Components/Featured/Featured";
import Features from "../Components/Featured/Features";
import Footer from "../Components/footer/EndFooter.jsx";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const locomotiveScroll = new LocomotiveScroll();
  const navigate = useNavigate();

  return (
    <>
      <Navbar/>
      <Company/>
      <Featured/>
      <Features/>
      <Footer/>
    </>
  );
};

export default LandingPage;
