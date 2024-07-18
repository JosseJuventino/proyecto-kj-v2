import React from 'react';
import Link from 'next/link';

interface CommonButtonProps {
  link: string;
  text: string;
  icon?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ link, text, icon }) => {
  return (
    <div className="my-7 cursor-pointer">
      <Link href={link} passHref  className="text-center hover:border-black-custom hover:bg-transparent hover:text-black hover:border-4 px-4 py-2 text-lg rounded-full bg-black-custom text-white transition-colors duration-500 ease-in-out border-black-custom border-4"
          target="_blank">
          {text}
          {icon && <i className={`${icon} ml-3`}></i>}
      </Link>
    </div>
  );
};

export default CommonButton;
