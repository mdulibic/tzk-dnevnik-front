import {Tag} from "@/components/features/planer/EventCalendar.tsx";
import {FormControl, MenuItem, Select} from "@mui/material";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {cn} from "@/utils.ts";
import React from "react";

interface TagSelectProps {
    tags: Tag[],
    onChange: (value: string) => void;
}

const TagSelect: React.FC<TagSelectProps> = ({tags, onChange}) => {

    return (
        <div className="rounded-md border border-input">
            <FormControl sx={{minWidth: 120}} size="small">
                <Select
                    onChange={(event) => onChange(String(event.target.value))}
                    placeholder="Odaberite razred"
                    sx={{
                        borderRadius: 0,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: 0
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        }
                    }}
                    IconComponent={() => (
                        <div className="px-2">
                            <ChevronUpIcon className={cn(
                                "py-0.5 cursor-default",
                            )}/>
                            <ChevronDownIcon className={cn(
                                "py-0.5 cursor-default",
                            )}/>
                        </div>
                    )}
                >
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <MenuItem
                                className={cn(
                                    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                )}
                                key={tag.id}
                                value={tag.id.toString()}
                            >
                                {tag.title}
                            </MenuItem>
                        ))
                    ) : (
                        <div className="px-2 text-black-100">Nema opcija.</div>
                    )}
                </Select>
            </FormControl>
        </div>
    );
};

export default TagSelect;