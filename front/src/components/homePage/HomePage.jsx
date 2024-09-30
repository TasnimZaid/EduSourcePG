import React from "react";
import WelcomePopup from './WelcomePopup ';
import HeroHome from "./HeroHome";
import NavBar from "../NavBar";
import IntroSection from "./IntroSection";


function HomePage() {
  // Define a common background color
  const bgColor = "#E6F3FF"; // Light blue color, you can adjust this

  return (
    <div className="" >
      <NavBar />

      <WelcomePopup />
      <HeroHome />
      <img src="https://i.pinimg.com/originals/cc/b0/1c/ccb01c058068c3e2a09c9fb751299297.gif" alt="" />

      <IntroSection  />
    </div>
  );
}

export default HomePage;