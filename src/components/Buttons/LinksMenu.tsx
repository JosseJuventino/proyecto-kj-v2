import { FC } from "react";
import Link from "next/link";

interface LinksMenuProps {
  text: string;
  link: string;
  icon?: string;
  isCssIcon?: boolean;
  clickEvent?: () => void;
}

const LinksMenu: FC<LinksMenuProps> = ({ text, link, icon, isCssIcon, clickEvent }) => {
  return (
    <Link href={link} className="flex items-center p-3 text-sm lg:text-xl text-white transition rounded-md duration-500 hover:bg-gray-700" onClick={clickEvent}>
      {isCssIcon ? (
        <img src="/images/CssIcon.svg" alt="CssIcon" className="w-5 h-5 mr-2 lg:w-8 lg:h-8" />
      ) : (
        <i className={`mr-2 lg:mr-3 ${icon} text-lg lg:text-2xl`}></i>
      )}
      <span>{text}</span>
    </Link>
  );
};

export default LinksMenu;
