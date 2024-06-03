import React, {useEffect, useState} from "react";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {FormControl, MenuItem, Select} from "@mui/material";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {cn} from "@/utils.ts";

interface SchoolActivity {
    id: number;
    name: string;
    subactivities: SchoolSubActivity[]
}

interface SchoolSubActivity {
    id: number;
    name: string;
}

interface SchoolActivitySelectProps {
    selectedActivity: string | null;
    onActivityChange: (id: string) => void;
    onSubActivityChange: (id: string) => void;
}

const ActivitySelectMui: React.FC<SchoolActivitySelectProps> = ({
                                                                    selectedActivity,
                                                                    onActivityChange,
                                                                    onSubActivityChange
                                                                }) => {
    const [schoolActivities, setSchoolActivities] = useState<SchoolActivity[]>([]);
    const [subActivities, setSubActivities] = useState<SchoolSubActivity[]>([]);
    const [selectedSubActivity, setSelectedSubActivity] = useState<string>("");

    useEffect(() => {
        fetch(
            BASE_API_URL + '/api/activities/all',
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
            .catch((error) => console.error('Error fetching activities:', error));
    }, []);

    useEffect(() => {
        if (selectedActivity) {
            const activity = schoolActivities.find(a => String(a.id) === selectedActivity);
            if (activity) {
                setSubActivities(activity.subactivities);
                if (activity.subactivities.length > 0) {
                    setSelectedSubActivity(String(activity.subactivities[0].id));
                }
            } else {
                setSubActivities([]);
                setSelectedSubActivity("");
                onSubActivityChange("");
            }
        } else {
            setSubActivities([]);
            setSelectedSubActivity("");
            onSubActivityChange("");
        }
    }, [selectedActivity, schoolActivities]);

    return (
        <div>
            <div className="rounded-md border border-input w-full px-2 mb-4">
                <FormControl size="small" className="w-full px-2">
                    <Select
                        value={selectedActivity}
                        onChange={(event) => onActivityChange(String(event.target.value))}
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
                                {activity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="rounded-md border border-input w-full px-2">
                {selectedActivity && subActivities.length > 0 && (
                    <FormControl size="small" className="w-full px-2 mt-2">
                        <Select
                            value={selectedSubActivity}
                            onChange={(event) => {
                                setSelectedSubActivity(event.target.value);
                                onSubActivityChange(event.target.value);
                            }}
                            placeholder="Odaberite podaktivnost"
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
                            {subActivities.map((subActivity) => (
                                <MenuItem
                                    className={cn(
                                        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                    )}
                                    key={subActivity.id} value={subActivity.id.toString()}
                                >
                                    {subActivity.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </div>
        </div>
    );
};

export default ActivitySelectMui;
