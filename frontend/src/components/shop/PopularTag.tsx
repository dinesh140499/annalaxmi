import React, { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

const tags: string[] = ['Healthy', 'Low Fat', 'Vegetarian', 'Kid Foods', 'Vitamins', 'Bread', 'Bread', 'Meat', 'Snacks', 'Tiffin', 'Launch', 'Dinner', 'Breakfast', 'Fruit']

type Tags = {
    isOpen: boolean;
    onToggle: () => void;
};


const PopularTag: React.FC<Tags> = ({ isOpen, onToggle }) => {
    const [tagActive, setTagActive] = useState<string>('')
    return (
        <div>
            <h1 className="text-sm font-bold text-green flex items-center justify-between mb-3">
                Popular Tag
                <RiArrowDropDownLine
                    className={`text-2xl cursor-pointer duration-200 ease-in-out transform ${isOpen ? "rotate-180" : ""
                        }`}
                    onClick={onToggle}
                />
            </h1>
            {isOpen &&
                <div className="flex flex-wrap gap-3">
                    {tags?.map((tag, i) =>
                        <button className={`${tagActive === tag ? 'bg-[#00603A] text-white' : 'bg-[#F2F2F2]'} text-sm  rounded-md p-1 cursor-pointer duration-75 hover:bg-[#00603A] hover:text-white`} key={i} onClick={() => setTagActive(tag)}>{tag}</button>
                    )}
                </div>}
        </div>
    )
}

export default PopularTag