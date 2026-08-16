import { useState } from 'react';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import useDebounce from '../../hooks/useDebounce';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { searchManager } from '../../utils/searchManager';
import { useNavigate } from 'react-router-dom';

const SearchFilter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debounceQuery = useDebounce(searchQuery, 300);
    const navigate = useNavigate();

    const { items, getLabelKey } = useSelector(
        (state: RootState) => state.common.searchConfig
    );

    const onSelect = searchManager.getOnSelect();

    const filteredItems = items.filter(item =>
        debounceQuery &&
        item?.[getLabelKey]?.toLowerCase().includes(debounceQuery.toLowerCase())
    );

    const handleItemClick = (item: any) => {
        setSearchQuery('');
        if (onSelect) {
            onSelect(item);
        } else if (item?.id) {
            navigate(`/product/${item.id}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <div className="relative w-full">
            <div className="relative flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-700/50 border border-slate-200/80 rounded-2xl py-2 px-3.5 gap-2.5 transition duration-150 shadow-inner">
                <IoIosSearch className="text-xl text-emerald-800 shrink-0" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search unpolished dals, heirloom grains, pure spices... (Press Enter)"
                    className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-medium"
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition"
                        aria-label="Clear search"
                    >
                        <IoIosClose className="text-xl" />
                    </button>
                )}
            </div>

            {debounceQuery && (
                <div className="absolute top-full left-0 mt-1.5 w-full z-50 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-1">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, i) => (
                            <div
                                key={i}
                                className="py-2.5 px-4 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer transition flex items-center justify-between"
                                onClick={() => handleItemClick(item)}
                            >
                                <span className="font-medium">{item?.[getLabelKey]}</span>
                                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-md">View</span>
                            </div>
                        ))
                    ) : (
                        <p className="py-3 px-4 text-xs text-slate-400 text-center">No organic products matching "{debounceQuery}"</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
