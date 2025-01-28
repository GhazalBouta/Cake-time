import React from 'react';
import '../CSS/About.css'; // Create this CSS file for styles

const About = () => {
	
  return (
    <section className="about" id="about">
      <div className="img">
      <img src={`${process.env.PUBLIC_URL}/images/cake logo.ico`} alt="cake logo" />
      </div>
      <div className="home">
        <h3>❣️made with love and passion♥️</h3>
        <p>Welcome to world, where every confection tells
				a story of dedication. 
				creativity, and customer satisfaction. From
				the finest ingredients sourced locally to the meticulous
				attention
				to detail in every recipe, i take pride
				in delivering indulgent experiences that
				delight taste buds and
				warm
				hearts. With each cake, pastry, and dessert,
				i strive to create moments of joy and celebration, making
				every
				occasion a little sweeter.
        </p>
        <p>     For me , baking isn't just a profession; it's a labor
				of love that fuels our imagination and drives my
				pursuit of perfection. With
				a flair for innovation,
				traditional techniques and modern flavors to create
				signature delicacies that are as visually stunning
				as they
				are delicious. Whether it's a custom-designed wedding
				cake, a batch of freshly baked cookies, or a
				tempting
				assortment of pastries for a special event, i pour our
				passion into every creation, ensuring that each
				bite is
				a testament to our dedication to excellence.</p>
      </div>
    </section>
  );
};

export default About;