interface TagProjectProps {
  name: string;
  background: string;
}

export const TagProject: React.FC<TagProjectProps> = ({ name, background }) => {
  return (
    <div
      style={{ background: background }}
      className="tag text-white mx-2 p-1 px-4 mt-4 rounded-full"
    >
      <p style={{ fontSize: "xl" }}>{name}</p>
    </div>
  );
};