import {ChangeEvent, Dispatch, MouseEvent, SetStateAction} from "react"
import {
    TextField,
} from "@mui/material"
import {
    Dialog,
    DialogClose,
    DialogContent, DialogDescription, DialogFooter, DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";

import {EventFormData, Tag} from "../EventCalendar.tsx"
import {Label} from "@/components/ui/label.tsx";
import SchoolClassSelect from "@/components/shared/select/SchoolClassSelect.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "../../../ui/button.tsx";
import TagSelect from "@/components/features/planer/select/TagSelect.tsx";
import ActivitySelect from "@/components/features/planer/select/ActivitySelect.tsx";

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
    todos: Tag[]
}

const AddEventDialog = ({open, handleClose, eventFormData, setEventFormData, onAddEvent, todos}: IProps) => {
    const {classId, activityId} = eventFormData
    const onClose = () => handleClose()

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEventFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const handleTagChange = (id: string) => {
        setEventFormData((prevState) => ({
            ...prevState,
            tagId: id,
        }))
    }

    const handleClassChange = (id: string) => {
        setEventFormData((prevState) => ({
            ...prevState,
            classId: id,
        }))
    }


    const handleActivityChange = (id: string) => {
        setEventFormData((prevState) => ({
            ...prevState,
            activityId: id,
        }))
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dodaj razredni sat</DialogTitle>
                    <DialogDescription>Dodaj novi razredni sat u planer.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Naslov
                        </Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            onChange={onChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="school-class" className="text-right">
                            Aktivnost
                        </Label>
                        <ActivitySelect
                            selectedActivity={activityId}
                            onChange={handleActivityChange}
                        ></ActivitySelect>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="school-class" className="text-right">
                            Razred
                        </Label>
                        <SchoolClassSelect
                            selectedClass={classId}
                            onChange={handleClassChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Opis sata
                        </Label>
                        <TextField
                            id="description"
                            multiline
                            rows={3}
                            onChange={onChange}
                            className="col-span-3"
                            variant="outlined"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="todo" className="text-right">
                            Labela
                        </Label>
                        <TagSelect tags={todos} onChange={handleTagChange}/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex w-full justify-between">
                            <Button type="submit" variant="destructive" onClick={onClose}>Odustani</Button>
                            <Button type="submit" onClick={onAddEvent}>Spremi</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddEventDialog