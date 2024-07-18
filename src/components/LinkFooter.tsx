interface LinkFooterProps {
  icon: string;
  text: string;
}

const LinkFooter: React.FC<LinkFooterProps> = ({ icon, text }) => {
  return (
    <p className="md:text-lg">
      <i className={`${icon} pr-3 pt-5`}></i>
      {text}
    </p>
  );
};

export default LinkFooter;
