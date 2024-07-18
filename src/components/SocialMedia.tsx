interface SocialMediaProps {
  icon: string;
  link: string;
}
const SocialMedia: React.FC<SocialMediaProps> = ({ icon, link }) => {
  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-white md:text-3xl text-2xl text-center mt-5 pr-5 mb-10 cursor-pointer hover:text-gray-400 transition-colors duration-300 ease-in-out"
      >
        <i className={icon}></i>
      </a>
    </>
  );
}

export default SocialMedia;
