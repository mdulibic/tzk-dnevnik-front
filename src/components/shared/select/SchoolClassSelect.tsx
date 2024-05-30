import {useEffect, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import authHeader from '@/auth-header.tsx';
import {BASE_API_URL} from "@/constants.tsx";

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
                BASE_API_URL + '/api/school/classes',
                {
                    method: "GET",
                    headers: {
                        Origin: origin,
                        Authorization: authHeader(),
                    }
                }
            )
                .then((response) => response.json())
                .then((data) => setClasses(data))
                .catch((error) => console.error('Error fetching classes:', error));
        },
        []
    )
    ;

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
