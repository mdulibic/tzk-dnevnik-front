import React, {useEffect, useState} from "react";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

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

const ActivitySelect: React.FC<SchoolActivitySelectProps> = ({
                                                                    selectedActivity,
                                                                    onActivityChange,
                                                                    onSubActivityChange}) => {
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
            }
        } else {
            setSubActivities([]);
            setSelectedSubActivity("");
        }
    }, [selectedActivity, schoolActivities]);

    return (
        <div>
            <div className="mb-4">
                <Select
                    onValueChange={onActivityChange}
                    value={String(selectedActivity)}
                >
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Odaberite labelu"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {schoolActivities.map((activity) => (
                                <SelectItem
                                    key={activity.id}
                                    value={activity.id.toString()}
                                >
                                    {activity.name}
                                </SelectItem>
                            ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {selectedActivity && subActivities.length > 0 && (
                <Select
                    onValueChange={onSubActivityChange}
                    value={String(selectedSubActivity)}
                >
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Odaberite labelu"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {subActivities.map((activity) => (
                                <SelectItem
                                    key={activity.id}
                                    value={activity.id.toString()}
                                >
                                    {activity.name}
                                </SelectItem>
                            ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </div>
    );
};

export default ActivitySelect;
