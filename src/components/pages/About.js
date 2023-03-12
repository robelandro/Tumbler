import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';
import InfoLand from '../InfoLand';
import React, { useEffect } from "react";

const About = () => {
	useEffect(() => {
		document.title = "About";
	  }, []);
  return (
	<>
	  <HeroSection />
	  <InfoLand />
	  <Cards />
	  <Footer />
	</>
  );
}
 
export default About;
