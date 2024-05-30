import React, {useEffect, useState} from 'react';
import {Select, Space} from 'antd';
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {SchoolClass} from "@/pages/admin/students/columns.tsx";

interface SchoolClassesSelectProps {
    selectedClassIds: string[];
    onChange: (value: string[]) => void;
}

const SchoolClassMultiSelect: React.FC<SchoolClassesSelectProps> = ({selectedClassIds, onChange}) => {
    const [classOptions, setClassOptions] = useState<{ label: string; value: string }[]>([]);

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
                .then((data: SchoolClass[]) => {
                    setClassOptions(data.map((schoolClass) => ({
                        label: `${schoolClass.year}.${schoolClass.division}`,
                        value: schoolClass.id.toString(),
                    })));
                })
                .catch((error) => console.error('Error fetching classes:', error));
        },
        []
    )
    ;

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
