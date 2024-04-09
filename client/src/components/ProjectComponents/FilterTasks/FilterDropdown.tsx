import React from 'react';
import Select from 'react-select';
import { MdExpandMore } from 'react-icons/md';

interface FilterDropdownProps {
    options: { label: string; value: string }[]; // Change type to fit react-select format
    title?: string;
}

const TaskDropdown: React.FC<FilterDropdownProps> = ({ options, title }) => {
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
