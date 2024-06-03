import {Dispatch, MouseEvent, SetStateAction, ChangeEvent} from "react"
import {
    TextField,
    Dialog,
    DialogContent,
} from "@mui/material"
import {Button} from "../../../../ui/button.tsx";
import {Checkbox} from "../../../../ui/checkbox.tsx";
import {LocalizationProvider, DateTimePicker} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import {DatePickerEventFormData, Tag} from "../EventCalendar.tsx"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import ActivitySelectMui from "@/components/shared/select/ActivitySelectMui.tsx";
import TagSelectMui from "@/components/features/teacher/schedule/select/TagSelectMui.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {DialogFooter, DialogHeader} from "@/components/ui/dialog.tsx";
import {Cross2Icon} from "@radix-ui/react-icons";
import SchoolClassSelect from "@/components/shared/select/SchoolClassSelect.tsx";
import SchoolClassSelectMui from "@/components/features/teacher/schedule/select/SchoolClassSelectMui.tsx";

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    datePickerEventFormData: DatePickerEventFormData
    setDatePickerEventFormData: Dispatch<SetStateAction<DatePickerEventFormData>>
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
    todos: Tag[]
}

const AddDatePickerEventDialog = ({
                                      open,
                                      handleClose,
                                      datePickerEventFormData,
                                      setDatePickerEventFormData,
                                      onAddEvent,
                                      todos,
                                  }: IProps) => {
    const {schoolClassId, description, allDay, start, end, activityId, title} = datePickerEventFormData

    const onClose = () => {
        handleClose()
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            title: event.target.value,
        }))
    }

    const handleDescriptionChange= (event: ChangeEvent<HTMLInputElement>) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            description: event.target.value,
        }))
    }

    const handleCheckboxChange = (checked: CheckedState) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            allDay: !!checked
        }))
    }

    const handleTagChange = (id: string) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            tagId: id,
        }))
    }

    const handleClassChange = (id: string) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            schoolClassId: id,
        }))
    }

    const handleActivityChange = (id: string) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            activityId: id,
        }))
    }

    const handleSubActivityChange = (id: string) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            subActivityId: id,
        }))
    }

    const isDisabled = () => {
        return schoolClassId === "" || activityId === "" || title === "" || (!allDay && start === null && end === null);
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <div
                        className={"text-lg font-semibold leading-none tracking-tight"}>
                        Dodaj nastavni sat
                    </div>
                    <div
                        className={"text-sm text-muted-foreground"}>
                        Dodaj novi nastavni sat u planer
                    </div>
                    <div onClick={onClose}
                         className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <Cross2Icon className="h-4 w-4"/>
                        <span className="sr-only">Close</span>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Naslov
                        </Label>
                        <Input
                            id="title"
                            defaultValue={description}
                            className="col-span-3"
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="activityId" className="text-right">
                            Aktivnost
                        </Label>
                        <div className="col-span-3">
                            <ActivitySelectMui
                                selectedActivity={activityId}
                                onActivityChange={handleActivityChange}
                                onSubActivityChange={handleSubActivityChange}
                            ></ActivitySelectMui>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="school-class" className="text-right">
                            Razred
                        </Label>
                        <div className="col-span-3">
                            <SchoolClassSelectMui
                                selectedClass={schoolClassId.toString()}
                                onChange={handleClassChange}
                            />
                        </div>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start-activity" className="text-right">
                                Početak događaja
                            </Label>
                            <div className="col-span-3">
                                <DateTimePicker
                                    value={start}
                                    ampm={true}
                                    minutesStep={30}
                                    onChange={(newValue) =>
                                        setDatePickerEventFormData((prevState) => ({
                                            ...prevState,
                                            start: new Date(newValue!),
                                        }))
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="end-activity" className="text-right">
                                Kraj događaja
                            </Label>
                            <div className="col-span-3">
                                <div className="mb-4">
                                    <DateTimePicker
                                        disabled={allDay}
                                        minDate={start}
                                        minutesStep={30}
                                        ampm={true}
                                        value={allDay ? null : end}
                                        onChange={(newValue) =>
                                            setDatePickerEventFormData((prevState) => ({
                                                ...prevState,
                                                end: new Date(newValue!),
                                            }))
                                        }
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        onCheckedChange={handleCheckboxChange}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Cijeli dan
                                    </label>
                                </div>
                            </div>
                        </div>
                    </LocalizationProvider>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Opis sata
                        </Label>
                        <TextField
                            id="description"
                            multiline
                            rows={3}
                            onChange={handleDescriptionChange}
                            className="col-span-3"
                            variant="outlined"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="todo" className="text-right">
                            Labela
                        </Label>
                        <div className="col-span-3">
                            <TagSelectMui tags={todos} onChange={handleTagChange}/>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex w-full justify-between">
                        <Button type="submit" variant="destructive" onClick={onClose}>Odustani</Button>
                        <Button type="submit" onClick={onAddEvent} disabled={isDisabled()}>Spremi</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddDatePickerEventDialog