import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const tags: string[] = [
    'Unpolished',
    'High Protein',
    'Gluten-Free',
    'Cold-Pressed',
    'Stone Ground',
    'Native Grains',
    'Zero Chemicals',
    'Organic Millets',
    'Direct Farm',
    'Immunity Boost'
];

type Tags = {
    isOpen: boolean;
    onToggle: () => void;
};

const PopularTag: React.FC<Tags> = ({ isOpen, onToggle }) => {
    const [tagActive, setTagActive] = useState<string>('Unpolished');

    return (
        <div className="py-2">
            <div 
                className="flex items-center justify-between cursor-pointer py-1 text-sm font-bold text-slate-900 select-none"
                onClick={onToggle}
            >
                <span className="text-emerald-950 font-heading">Popular Tags</span>
                <RiArrowDropDownLine
                    className={`text-2xl transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-800" : "text-slate-400"
                    }`}
                />
            </div>
            {isOpen && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {tags.map((tag, i) => (
                        <button 
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium cursor-pointer transition ${
                                tagActive === tag 
                                    ? 'bg-emerald-800 text-amber-300 shadow-xs' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            }`}
                            onClick={() => setTagActive(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularTag;