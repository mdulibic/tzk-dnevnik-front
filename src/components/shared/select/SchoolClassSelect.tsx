import {useEffect, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {getUserId, isTeacher} from "@/utils.ts";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {getClassesForTeacher, getSchoolClasses} from "@/api/users.tsx";

interface SchoolClassSelectProps {
    schoolId: string,
    selectedClass: string | undefined;
    onChange: (value: string) => void;
}

const SchoolClassSelect: React.FC<SchoolClassSelectProps> = ({schoolId, selectedClass, onChange}) => {
    const [classes, setClasses] = useState<SchoolClass[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                let data;
                if (isTeacher()) {
                    const userId = getUserId();
                    data = await getClassesForTeacher(userId);
                } else {
                    data = await getSchoolClasses(schoolId);
                }
                setClasses(data);
                if (data && data.length > 0) {
                    setClasses(data);
                    onChange(String(data[0].id));
                }
            } catch (error) {
            }
        };

        fetchClasses();
    }, [schoolId]);

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
