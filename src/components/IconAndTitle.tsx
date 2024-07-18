interface IconAndTitleProps{
    title: string;
    icon: string;
    description: string;
}

export const IconAndTitle: React.FC<IconAndTitleProps> = ({icon, title, description}) => {
    return (
    <div className="flex flex-row gap-2 mb-5 lg:ml-2 items-center">
      <p className="mt-2">
      <i className={icon} style={{ fontSize: '22px' }}></i>
          </p>

        <h3 className="pt-1 font-bold font-primary">{title}</h3>
        <p className="pt-1 font-primary">{description}</p>
    </div>
  );
}