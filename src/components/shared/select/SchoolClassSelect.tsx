import {useEffect, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {getUserId, isTeacher} from "@/utils.ts";
import {getClasses} from "@/api/school.tsx";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {getClassesById} from "@/api/users.tsx";

interface SchoolClassSelectProps {
    selectedClass: string;
    onChange: (value: string) => void;
}

const SchoolClassSelect: React.FC<SchoolClassSelectProps> = ({selectedClass, onChange}) => {
    const [classes, setClasses] = useState<SchoolClass[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                let data;
                if (isTeacher()) {
                    const userId = getUserId();
                    data = await getClassesById(userId);
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
        <Select onValueChange={onChange} value={selectedClass}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Odaberite razred"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {classes.map((schoolClass) => (
                        <SelectItem key={schoolClass.id} value={schoolClass.id.toString()}>
                            {schoolClass.year}.{schoolClass.division}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SchoolClassSelect;
