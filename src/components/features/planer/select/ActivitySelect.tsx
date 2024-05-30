import React, {useEffect, useState} from "react";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {FormControl, MenuItem, Select} from "@mui/material";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {cn} from "@/utils.ts";

interface SchoolActivitySelectProps {
    selectedActivity: string;
    onChange: (value: string) => void;
}

interface SchoolActivity {
    id: number;
    title: string;
    subtypes: SchoolActivity[]
}

const ActivitySelect: React.FC<SchoolActivitySelectProps> = ({selectedActivity, onChange}) => {
    const [schoolActivities, setSchoolActivities] = useState<SchoolActivity []>([]);

    useEffect(() => {
            fetch(
                BASE_API_URL + '/api/school/activities',
                {
                    method: "GET",
                    headers: {
                        Origin: origin,
                        Authorization: authHeader(),
                    }
                }
            )
                .then((response) => response.json())
                .then((data) => setSchoolActivities(data))
                .catch((error) => console.error('Error fetching classes:', error));
        },
        []
    )
    ;

    return (
        <div className="rounded-md border border-input">
            <FormControl sx={{minWidth: 120}} size="small">
                <Select
                    value={selectedActivity}
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
                    {schoolActivities.map((activity) => (
                        <MenuItem
                            className={cn(
                                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                            )}
                            key={activity.id} value={activity.id.toString()}
                        >
                            {activity.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ActivitySelect;