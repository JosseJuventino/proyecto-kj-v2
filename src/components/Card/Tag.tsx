interface TagProps {
    name: string;
    background: string | undefined;
}

export const Tag: React.FC<TagProps> = ({ name, background }) => {
    return (
        <>
            <div
                style={background !== undefined ? { backgroundColor: background } : {}}
                className={`tag text-white p-1 px-2 rounded-full`}
            >
                <p style={{ fontSize: "xx-small" }}>{name}</p>
            </div>
        </>
    );
};
