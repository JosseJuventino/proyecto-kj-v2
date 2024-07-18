// src/components/general/ButtonWithIcon.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonWithIconProps {
  text: string;
  link: string;
  icon: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ text, link, icon }) => {
  return (
    <Link href={link} passHref className="mt-10 border-transparent border-4 transition-colors duration-500 ease-in-out justify-center items-center bg-black-custom text-white px-6 py-2 rounded-full hover:bg-hover-black-custom hover:text-black hover:border-black-custom hover:border-4" rel="noopener noreferrer">
        <i className={icon}></i>
        <span className="ml-3">{text}</span>
    </Link>
  );
};

export default ButtonWithIcon;
