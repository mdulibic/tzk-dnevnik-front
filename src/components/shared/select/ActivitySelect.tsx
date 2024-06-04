import React, {useEffect, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {getActivities} from "@/api/activity.tsx";

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
                                                                 onSubActivityChange
                                                             }) => {
    const [schoolActivities, setSchoolActivities] = useState<SchoolActivity[]>([]);
    const [subActivities, setSubActivities] = useState<SchoolSubActivity[]>([]);
    const [selectedSubActivity, setSelectedSubActivity] = useState<string>("");

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getActivities();
                setSchoolActivities(data);
            } catch (error) {
                console.error('Error fetching activities:', error);
                toast({
                    duration: 2000,
                    variant: "destructive",
                    title: "Greška pri dohvaćanju aktivnosti",
                    description: "Pokušajte ponovno kasnije.",
                });
            }
        };

        fetchActivities();
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
