import React, {useEffect, useState} from 'react';
import {Select, MenuItem, FormControl} from '@mui/material';
import {cn, getUserId, isTeacher} from "@/utils.ts";
import {ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';
import { getClasses } from '@/api/school.tsx';
import {SchoolClass} from "@/model/SchoolClass.ts";
import {getClassesForTeacher} from "@/api/users.tsx";

interface SchoolClassSelectProps {
    selectedClass: string;
    onChange: (value: string) => void;
}

const SchoolClassSelectMui: React.FC<SchoolClassSelectProps> = ({selectedClass, onChange}) => {
    const [classes, setClasses] = useState<SchoolClass[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                let data;
                if (isTeacher()) {
                    const userId = getUserId();
                    data = await getClassesForTeacher(userId);
                } else {
                    data = await getClasses();
                }
                setClasses(data);
            } catch (error) {
            }
        };

        fetchClasses();
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

export default SchoolClassSelectMui;
