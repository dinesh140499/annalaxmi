import type { ChangeEvent } from "react";

interface InputFieldProps {
    placeholder?: string,
    id?: string,
    className?: string,
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    inputType: string |'text' | 'number' | 'radio' | 'checkbox' | 'email' | 'password' | 'tel' | 'file' | 'date' | 'time', 
    value?: string | number
}

const InputField = ({ name, onChange, id, placeholder, inputType, className, value }: InputFieldProps) => {
    return (
        <input type={inputType} placeholder={placeholder} id={id} name={name} onChange={onChange} className={`py-1 text-sm px-3 border border-[#E6E6E6] outline-[#00603A] rounded-sm ${className}`} value={value} />
    )
}

export default InputField