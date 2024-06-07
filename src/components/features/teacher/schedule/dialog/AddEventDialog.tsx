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

import {EventFormData} from "../TeacherEventCalendar.tsx"
import {Label} from "@/components/ui/label.tsx";
import SchoolClassSelect from "@/components/shared/select/SchoolClassSelect.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "../../../../ui/button.tsx";
import TagSelect from "@/components/features/teacher/schedule/select/TagSelect.tsx";
import ActivitySelect from "../../../../shared/select/ActivitySelect.tsx";
import {Tag} from "@/model/SchoolEvent.ts";

interface IProps {
    schoolId: string,
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
    tags: Tag[]
}

const AddEventDialog = ({schoolId, open, handleClose, eventFormData, setEventFormData, onAddEvent, tags}: IProps) => {
    const {schoolClassId, activityId, title} = eventFormData
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
            schoolClassId: id,
        }))
    }


    const handleActivityChange = (id: string) => {
        setEventFormData((prevState) => ({
            ...prevState,
            activityId: id,
        }))
    }

    const handleSubActivityChange = (id: string) => {
        setEventFormData((prevState) => ({
            ...prevState,
            subActivityId: id,
        }))
    }

    const isDisabled = () => {
        return schoolClassId === "" || activityId === "" || title === "";
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dodaj nastavni sat</DialogTitle>
                    <DialogDescription>Dodaj nastavni razredni sat u planer.</DialogDescription>
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
                        <div className="col-span-3">
                            <ActivitySelect
                                selectedActivity={activityId}
                                onActivityChange={handleActivityChange}
                                onSubActivityChange={handleSubActivityChange}
                            ></ActivitySelect>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="school-class" className="text-right">
                            Razred
                        </Label>
                        <div className="col-span-3">
                            <SchoolClassSelect
                                schoolId={schoolId}
                                selectedClass={schoolClassId}
                                onChange={handleClassChange}
                            />
                        </div>
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
                        <TagSelect tags={tags} onChange={handleTagChange}/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex w-full justify-between">
                            <Button type="submit" variant="destructive" onClick={onClose}>Odustani</Button>
                            <Button type="submit" onClick={onAddEvent} disabled={isDisabled()}>Spremi</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
        ;
}

export default AddEventDialog