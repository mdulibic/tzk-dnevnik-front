import React, {useEffect, useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import authHeader from '@/auth-header.tsx';
import {BASE_API_URL} from "@/constants.tsx";
import {Tag} from "@/components/features/planer/EventCalendar.tsx";
import {FormControl, MenuItem} from "@mui/material";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {cn} from "@/utils.ts";

interface TagSelectProps {
    tags: Tag[],
    onChange: (value: string) => void;
}

const TagSelect: React.FC<TagSelectProps> = ({tags, onChange}) => {

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Odaberite labelu"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <SelectItem
                                key={tag.id}
                                value={tag.id.toString()}
                            >
                                {tag.title}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectLabel>Nema opcija.</SelectLabel>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TagSelect;
