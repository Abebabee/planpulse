import React from 'react';
import Select from 'react-select';
import { MdExpandMore } from 'react-icons/md';

interface FilterDropdownProps {
    options: { label: string; value: string }[];
    title?: string;
    onFilterChange: (selectedTags: {label: string; value: string}[])=>void;
}

const TaskDropdown: React.FC<FilterDropdownProps> = ({ options, title, onFilterChange }) => {
    const handleFilteredOptions = (selectedOptions: any) =>{
        onFilterChange(selectedOptions)
    }
    return (
        <div className="relative">
            {title && <label className="block text-sm font-medium text-gray-700">{title}</label>}
            <Select
                options={options}
                isMulti
                placeholder="Filter..."
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                components={{ DropdownIndicator }}
                onChange={handleFilteredOptions}
            />
        </div>
    );
};

// Custom dropdown indicator with MdExpandMore icon
const DropdownIndicator = (props: any) => {
    return (
        <div {...props}>
            <MdExpandMore className='text-primary'/>
        </div>
    );
};

export default TaskDropdown;
