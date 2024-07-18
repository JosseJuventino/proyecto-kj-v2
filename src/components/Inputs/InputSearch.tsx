interface InputSearchProps{
    changeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    placeholder: string;
}

export const InputSearch: React.FC<InputSearchProps> = ({changeFunction, title, placeholder}) => {
    return (
        <div className="w-full">
            <h1 className="mt-10 mx-5 text-3xl font-bold my-8">{title}</h1>
            <input
                placeholder={placeholder}
                type="text"
                onChange={changeFunction}
                className="w-full px-5 py-3 border-none outline-none bg-bg-inputs rounded-3xl"
            />
        </div>
    );
}