interface SelectProps {
    arrItem: {
        optVal: string;
        optValName: string;
    }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    id?: string;
    value?: string;
    className?: string
}

const SelectInput = ({ arrItem, id, name, onChange, value, className }: SelectProps) => {
    return (
        <select
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            className={`px-3 py-2 border border-gray-300 rounded-md text-sm w-full ${className}`}
        >
            <option value="">Selects</option>
            {arrItem.map((item, i) => (
                <option key={i} value={item.optVal}>
                    {item.optValName}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
