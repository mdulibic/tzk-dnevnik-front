import React, {useEffect, useState} from 'react';
import {Select, MenuItem, FormControl} from '@mui/material';
import authHeader from '@/auth-header.tsx';
import {BASE_API_URL} from '@/constants.tsx';
import {cn} from "@/utils.ts";
import {ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';

interface SchoolClassSelectProps {
    selectedClass: string;
    onChange: (value: string) => void;
}

interface SchoolClass {
    id: number;
    year: number;
    division: string;
}

const SchoolClassSelect: React.FC<SchoolClassSelectProps> = ({selectedClass, onChange}) => {
    const [classes, setClasses] = useState<SchoolClass[]>([]);

    useEffect(() => {
        fetch(
            `${BASE_API_URL}/api/school/classes`,
            {
                method: "GET",
                headers: {
                    Origin: window.location.origin,
                    Authorization: authHeader(),
                }
            }
        )
            .then((response) => response.json())
            .then((data) => setClasses(data))
            .catch((error) => console.error('Error fetching classes:', error));
    }, []);

    return (
        <div className="rounded-md border border-input w-full px-2">
            <FormControl size="small" className=" w-full px-2">
                <Select
                    labelId="school-class-select-label"
                    value={selectedClass}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="Odaberite razred"
                    sx={{
                        borderRadius: 0,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: 0
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        }
                    }}
                    IconComponent={() => (
                        <div className="px-2">
                            <ChevronUpIcon className={cn(
                                "py-0.5 cursor-default",
                            )}/>
                            <ChevronDownIcon className={cn(
                                "py-0.5 cursor-default",
                            )}/>
                        </div>
                    )}
                >
                    {classes.map((schoolClass) => (
                        <MenuItem
                            className={cn(
                                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                            )}
                            key={schoolClass.id}
                            value={schoolClass.id.toString()}
                        >
                            {schoolClass.year}.{schoolClass.division}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SchoolClassSelect;
