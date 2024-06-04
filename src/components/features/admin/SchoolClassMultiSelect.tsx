import React, {useEffect, useState} from 'react';
import {Select, Space} from 'antd';
import {getClasses} from "@/api/school.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {SchoolClass} from "@/model/SchoolClass.ts";

interface SchoolClassesSelectProps {
    selectedClassIds: string[];
    onChange: (value: string[]) => void;
}

const SchoolClassMultiSelect: React.FC<SchoolClassesSelectProps> = ({selectedClassIds, onChange}) => {
    const [classOptions, setClassOptions] = useState<SchoolClass[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {

                const data = await getClasses();
                setClassOptions(data);
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
        <Space style={{width: '100%'}} direction="vertical">
            <Select
                getPopupContainer={triggerNode => triggerNode.parentElement}
                mode="tags"
                style={{width: '100%'}}
                placeholder="Odaberite razrede"
                defaultValue={selectedClassIds}
                onChange={handleChange}
                options={classOptions}
            />
        </Space>
    );
};


export default SchoolClassMultiSelect;
