import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Company from "../Components/Company";
import LocomotiveScroll from "locomotive-scroll";
import Featured from "../Components/Featured/Featured";
import Features from "../Components/Featured/Features";
import Footer from "../Components/footer/EndFooter.jsx";

const LandingPage = () => {
  useEffect(() => {
    new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });
  }, []);

  return (
    <div data-scroll-container>
      <Navbar />
      <section id="home">
        <Company />
      </section>
      <section id="features">
        <Featured />
        <Features />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
