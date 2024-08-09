import Link from "next/link";

interface ButtonInscribeProps {
  link: string;
  text: string;
  icon?: string;
  eventClick?: () => void;
}

const ButtonInscribe: React.FC<ButtonInscribeProps> = ({ link, text, icon, eventClick }) => {
  return (
    <div className="w-full mt-5 cursor-pointer">
      <Link href={link} passHref className="block mx-10 text-center hover:border-black-custom hover:bg-transparent hover:text-black hover:border-4 px-4 py-2 text-lg rounded-full bg-black-custom text-white transition-colors duration-500 ease-in-out border-black-custom border-4"
          onClick={eventClick}>
 
          {text}
          {icon && <i className={`${icon} ml-3`}></i>}
      </Link>
    </div>
  );
};

export default ButtonInscribe;