import Link from "next/link";

interface ButtonInscribeProps {
  text: string;
  icon?: string;
  eventClick?: () => void;
}

const ButtonAdd: React.FC<ButtonInscribeProps> = ({ text, icon, eventClick }) => {
  return (
    <div className="w-full mt-5 cursor-pointer">
      <button
        className="block mx-10 text-center hover:border-black-custom hover:bg-transparent hover:text-black hover:border-4 px-4 py-2 text-lg rounded-full bg-black-custom text-white transition-colors duration-500 ease-in-out border-black-custom border-4"
        onClick={eventClick}
      >
        {text}
        {icon && <i className={`${icon} ml-3`}></i>}
      </button>
    </div>
  );
};

export default ButtonAdd;
