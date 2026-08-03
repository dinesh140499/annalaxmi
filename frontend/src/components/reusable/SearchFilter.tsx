import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import useDebounce from '../../hooks/useDebounce';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { searchManager } from '../../utils/searchManager';

const SearchFilter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debounceQuery = useDebounce(searchQuery, 300);

    const { items, getLabelKey } = useSelector(
        (state: RootState) => state.common.searchConfig
    );

    const onSelect = searchManager.getOnSelect();

    // console.log("what is in my on select",onSelect)

    const filteredItems = items.filter(item =>
        debounceQuery &&
        item?.[getLabelKey]?.toLowerCase().includes(debounceQuery.toLowerCase())
    );

    return (
        <div className='relative flex items-center text-sm bg-[#F3F9FB] py-3 px-3 gap-3 w-full rounded-sm'>
            <IoIosSearch className='text-2xl text-green' />
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search essentials, groceries and more...'
                className='w-full outline-none text-[#666666] text-lg lg:text-sm'
            />
            {debounceQuery && (
                <div className='absolute top-13 left-0 w-full z-[99] bg-white shadow rounded-sm'>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, i) => (
                            <p
                                key={i}
                                className='py-2 px-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100'
                                onClick={() => onSelect?.(item)}
                            >
                                {item?.[getLabelKey]}
                            </p>
                        ))
                    ) : (
                        <p className='py-2 px-2 text-gray-500'>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
