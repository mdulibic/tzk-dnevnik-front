import {useState, MouseEvent} from "react"
import {Box, Divider} from "@mui/material"
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

import {Calendar, type Event, dateFnsLocalizer} from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfo from "./EventInfo.tsx"
import AddEventDialog from "@/components/features/planer/dialog/AddEventDialog.tsx"
import EventInfoDialog from "@/components/features/planer/dialog/EventInfoDialog.tsx"
import {AddTagDialog} from "@/components/features/planer/dialog/AddTagDialog.tsx"
import AddDatePickerEventDialog from "@/components/features/planer/dialog/AddDatePickerEventDialog.tsx"

const locales = {
    "en-US": enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export interface Tag {
    id: string
    title: string
    color?: string
}

export interface IEventInfo extends Event {
    id: string
    title: string
    description: string
    activityId: string
    subActivityId?: string
    classId: string
    tagId?: string
}

export interface EventFormData {
    title: string
    activityId: string
    subActivityId?: string
    classId: string
    description: string
    tagId?: string
}

export interface DatePickerEventFormData {
    title: string
    activityId: string
    subActivityId?: string
    classId: string
    description: string
    tagId?: string
    allDay: boolean
    start?: Date
    end?: Date
}

export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString()

const initialEventFormState: EventFormData = {
    title: "",
    activityId: "",
    subActivityId: "",
    description: "",
    classId: "",
    tagId: undefined,
}

const initialDatePickerEventFormData: DatePickerEventFormData = {
    title: "",
    activityId: "",
    subActivityId: "",
    description: "",
    classId: "1",
    tagId: undefined,
    allDay: false,
    start: undefined,
    end: undefined,
}

const EventCalendar = () => {
    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    const [openTodoModal, setOpenTodoModal] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<IEventInfo | null>(null)

    const [eventInfoModal, setEventInfoModal] = useState(false)

    const [events, setEvents] = useState<IEventInfo[]>([])
    const [tags, setTags] = useState<Tag[]>([])

    const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

    const [datePickerEventFormData, setDatePickerEventFormData] =
        useState<DatePickerEventFormData>(initialDatePickerEventFormData)

    const handleSelectSlot = (event: Event) => {
        setOpenSlot(true)
        //setCurrentEvent(event)
    }

    const handleSelectEvent = (event: IEventInfo) => {
        setCurrentEvent(event)
        setEventInfoModal(true)
    }

    const handleClose = () => {
        setEventFormData(initialEventFormState)
        setOpenSlot(false)
    }

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData)
        setOpenDatepickerModal(false)
    }

    const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const data: IEventInfo = {
            ...eventFormData,
            id: generateId(),
            start: currentEvent?.start,
            end: currentEvent?.end,
        }

        const newEvents = [...events, data]

        const dataString = JSON.stringify(data, null, 2);

// Display the JSON string in an alert
        alert(dataString);

        setEvents(newEvents)
        handleClose()
    }

    const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const addHours = (date: Date | undefined, hours: number) => {
            return date ? date.setHours(date.getHours() + hours) : undefined
        }

        const setMinToZero = (date: any) => {
            date.setSeconds(0)

            return date
        }

        const data: IEventInfo = {
            ...datePickerEventFormData,
            id: generateId(),
            start: setMinToZero(datePickerEventFormData.start),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start, 12)
                : setMinToZero(datePickerEventFormData.end),
        }

        const dataString = JSON.stringify(data, null, 2);

// Display the JSON string in an alert
        alert(dataString);

        const newEvents = [...events, data]

        setEvents(newEvents)
        setDatePickerEventFormData(initialDatePickerEventFormData)

        handleDatePickerClose()
    }

    const onDeleteEvent = () => {
        setEvents(() => [...events].filter((e) => e.id !== (currentEvent as IEventInfo).id!))
        setEventInfoModal(false)
    }

    return (
        <Card>
            <CardContent>
                <div className="flex mt-4">
                    <Button
                        type="submit"
                        className="ml-2 py-2 px-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 focus:bg-blue-700"
                        onClick={() => setOpenDatepickerModal(true)}
                    >
                        Dodaj razredni sat
                    </Button>
                    <Button
                        type="submit"
                        className="ml-2 py-2 px-4 bg-black text-white rounded shadow-md hover:bg-gray-800 focus:bg-gray-800"
                        onClick={() => setOpenTodoModal(true)}
                    >
                        Kreiraj labelu
                    </Button>
                </div>
                <Divider sx={{my: 2}}/>
                <AddEventDialog
                    open={openSlot}
                    handleClose={handleClose}
                    eventFormData={eventFormData}
                    setEventFormData={setEventFormData}
                    onAddEvent={onAddEvent}
                    todos={tags}
                />
                <AddDatePickerEventDialog
                    open={openDatepickerModal}
                    handleClose={handleDatePickerClose}
                    datePickerEventFormData={datePickerEventFormData}
                    setDatePickerEventFormData={setDatePickerEventFormData}
                    onAddEvent={onAddEventFromDatePicker}
                    todos={tags}
                />
                <EventInfoDialog
                    open={eventInfoModal}
                    handleClose={() => setEventInfoModal(false)}
                    onDeleteEvent={onDeleteEvent}
                    currentEvent={currentEvent as IEventInfo}
                />
                <AddTagDialog
                    open={openTodoModal}
                    handleClose={() => setOpenTodoModal(false)}
                    tags={tags}
                    setTags={setTags}
                />
                <Calendar
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    components={{event: EventInfo}}
                    eventPropGetter={(event) => {
                        const hasTodo = tags.find((tag) => tag.id === event.tagId);
                        return {
                            style: {
                                backgroundColor: hasTodo ? hasTodo.color : "#2563EB",
                                borderColor: hasTodo ? hasTodo.color : "#2563EB",
                            },
                        };
                    }}
                    style={{
                        height: 500,
                    }}
                />
            </CardContent>
        </Card>
    );
}

export default EventCalendar