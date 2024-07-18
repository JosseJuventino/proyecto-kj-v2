interface OptionsToShow {
  title: string;
  options: string[];
}

interface DropdownProps {
  optionsToShow: OptionsToShow;
  eventHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ optionsToShow, eventHandler }) => {
  return (
    <div className="flex flex-col justify-start mb-2 text-lg">
      <label className="ml-2" htmlFor="selection">
        {optionsToShow.title}:
      </label>
      <select
        name="selection"
        className="px-4 py-2 bg-right border-2 outline-none border-bg-inputs bg-hover-black-custom text-md rounded-3xl"
        defaultValue=""
        onChange={eventHandler}
      >
        <option value="">Todos</option>
        {optionsToShow.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
