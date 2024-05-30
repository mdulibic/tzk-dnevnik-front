import {Dispatch, MouseEvent, SetStateAction, ChangeEvent} from "react"
import {
    TextField,
    Dialog,
    DialogContent,
} from "@mui/material"
import {Button} from "../../../ui/button.tsx";
import {Checkbox} from "../../../ui/checkbox.tsx";
import {LocalizationProvider, DateTimePicker} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import {DatePickerEventFormData, Tag} from "../EventCalendar.tsx"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import ActivitySelect from "@/components/features/planer/select/ActivitySelect.tsx";
import TagSelect from "@/components/features/planer/select/TagSelect.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {DialogFooter, DialogHeader} from "@/components/ui/dialog.tsx";
import {Cross2Icon} from "@radix-ui/react-icons";
import SchoolClassSelect from "@/components/features/planer/select/SchoolClassSelect.tsx";

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
    const {classId, description, allDay, start, end} = datePickerEventFormData

    const onClose = () => {
        handleClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
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
            classId: id,
        }))
    }

    const handleActivityChange = (id: string) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            activityId: id,
        }))
    }

    // const isDisabled = () => {
    //     const checkend = () => {
    //         if (!allDay && end === null) {
    //             return true
    //         }
    //     }
    //     if (description === "" || start === null || checkend()) {
    //         return true
    //     }
    //     return false
    // }

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <div
                        className={"text-lg font-semibold leading-none tracking-tight"}>
                        Dodaj razredni sat
                    </div>
                    <div
                        className={"text-sm text-muted-foreground"}>
                        Dodaj novi razredni sat u planer
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
                            onChange={onChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="activityId" className="text-right">
                            Aktivnost
                        </Label>
                        <ActivitySelect onChange={handleActivityChange}></ActivitySelect>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="school-class" className="text-right">
                            Razred
                        </Label>
                        <SchoolClassSelect
                            selectedClass={classId.toString()}
                            onChange={handleClassChange}
                        />
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
                    <div className="flex w-full justify-between">
                        <Button type="submit" variant="destructive" onClick={onClose}>Odustani</Button>
                        <Button type="submit" onClick={onAddEvent}>Spremi</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddDatePickerEventDialog