import {useEffect, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {getUserId} from "@/utils.ts";
import {getSchoolYearsForStudent} from "@/api/users.tsx";

interface SchoolYearSelectProps {
    selectedYear: string | undefined;
    onChange: (value: string) => void;
}

export const SchoolYearSelect: React.FC<SchoolYearSelectProps> = ({selectedYear, onChange}) => {
    const [years, setYears] = useState<string[]>([]);

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const data = await getSchoolYearsForStudent(getUserId());
                setYears(data);
            } catch (error) {
            }
        };
        fetchYears();
    }, []);

    return (
        <Select onValueChange={onChange} value={selectedYear}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Odaberite školsku godinu"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {years.map((year) => (
                        <SelectItem key={year} value={year}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
