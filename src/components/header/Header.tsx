import React from 'react';
import './style.scss';

interface CustomInputProps {
  text: string;
}

const Header: React.FC<CustomInputProps> = ({ text }) => {
  return (
    <header className="header">
      <h3>{text}</h3>
    </header>
  );
};

export default Header;
