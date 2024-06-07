import React, {useEffect, useState} from 'react';
import {Select} from 'antd';
import {toast} from "@/components/ui/use-toast.ts";
import {getSchoolClasses} from "@/api/users.tsx";

interface SchoolClassesSelectProps {
    schoolId: string,
    selectedClassIds: string[];
    onChange: (value: string[]) => void;
}

const SchoolClassMultiSelect: React.FC<SchoolClassesSelectProps> = ({schoolId, selectedClassIds, onChange}) => {
    const [classOptions, setClassOptions] = useState<{ label: string; value: string }[]>([]);

    const decodeClassId = (encodedId: string) => {
        const classId = parseInt(encodedId, 10);
        const adjustedId = (classId - 1) % 8 + 1;
        return String(adjustedId);
    };


    useEffect(() => {
        const fetchClasses = async () => {
            try {

                const data = await getSchoolClasses(schoolId);
                setClassOptions(data.map((schoolClass) => ({
                    label: `${schoolClass.year}.${schoolClass.division}`,
                    value: schoolClass.id.toString(),
                })));
            } catch (error) {
                toast({
                    duration: 2000,
                    variant: "destructive",
                    title: "Došlo je do pogreške!",
                    description: "Provjerite podatke i pokušajte ponovno.",
                })
            }
        };

        fetchClasses();
    }, []);

    const handleChange = (value: string[]) => {
        onChange(value);
    };


    return (
        <Select className="w-[280px]"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                mode="tags"
                placeholder="Odaberite razrede"
                defaultValue={selectedClassIds.map(decodeClassId)}
                onChange={handleChange}
                options={classOptions}
        />
    );
};


export default SchoolClassMultiSelect;
