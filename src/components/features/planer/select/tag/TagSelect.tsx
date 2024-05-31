import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Tag} from "@/components/features/planer/EventCalendar.tsx";

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
