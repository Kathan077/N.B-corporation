import React from 'react';
import nbLogo from '../../assets/nb_logo.png';

const Logo = ({ className = "", height = 76 }) => {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={nbLogo}
        alt="NB Corporation - Excellence with Experience"
        style={{ height: `${height}px`, width: 'auto', maxHeight: '90px' }}
        className="w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default Logo;
