import {useEffect, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {getSchools} from "@/api/school.tsx";
import {School} from "@/model/School.ts";

interface SchoolSelectProps {
    selectedSchool: string;
    onChange: (value: string) => void;
}

const SchoolSelect: React.FC<SchoolSelectProps> = ({selectedSchool, onChange}) => {
    const [schools, setSchools] = useState<School[]>([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const data = await getSchools();
                setSchools(data);
            } catch (error) {
            }
        };

        fetchSchools();
    }, []);

    return (
        <Select onValueChange={onChange} value={selectedSchool}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Odaberite razred"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id.toString()}>
                            {school.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SchoolSelect;
