import React from 'react';
import './Hero.scss';
import headphone from '../../../assets/headphone.png';


const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>100 Thousand songs , ad-free</h1>
        <h1>Over Thousand podcast episodes</h1>
      </div>
      <div className="hero-image">
        <img
          src={headphone}
          alt="Wireless Headphones"
        />
      </div>
    </div>
  );
};

export default Hero;
