import React from "react";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <img src="/images/Page 1.png" className="img1" alt="bakground" />
      <dev className="new-container">
        <p1>
          Revive Your Broken Items Locally with Tumbler - Get Anything Fixed!
        </p1>
        <p3>
          Revive Anything in Minutes - Join 1M+ Satisfied Customers on Tumbler
          Now!
        </p3>
        <p2>What are you waiting for?</p2>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      </dev>
      <img src="/images/key.png" className="img2" alt="demo"/>
    </div>
  );
}

export default HeroSection;
