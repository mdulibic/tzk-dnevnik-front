import {useState} from 'react';
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter} from "lucide-react";
import {FilterPair} from "@/pages/admin/students/StudentsDashboard.tsx";

interface FilterDropdownProps {
    options: FilterPair[];
    onFilter: (checkedFilters: string[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({options, onFilter}) => {
    const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>(
        options.reduce((acc, option) => {
            acc[option.key] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );

    const handleCheckboxChange = (key: string) => {
        const updatedCheckboxes = {
            ...checkboxes,
            [key]: !checkboxes[key]
        };
        setCheckboxes(updatedCheckboxes);
        applyFilter(updatedCheckboxes);
    };

    const applyFilter = (checkboxes: Record<string, boolean>) => {
        const checkedFilters = Object.entries(checkboxes)
            .filter(([_, checked]) => checked)
            .map(([key]) => key);
        onFilter(checkedFilters);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filteri
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtriraj po</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {options.map(({key, value}) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        checked={checkboxes[key]}
                        onClick={() => handleCheckboxChange(key)}
                    >
                        {value}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FilterDropdown;

