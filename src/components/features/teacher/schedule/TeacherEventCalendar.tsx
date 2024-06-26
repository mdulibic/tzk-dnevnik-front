import {useState, MouseEvent, useEffect} from "react"
import {Divider} from "@mui/material"
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

import {Calendar, type Event, dateFnsLocalizer} from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import hr from 'date-fns/locale/hr';

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventCard from "./EventCard.tsx"
import AddEventDialog from "@/components/features/teacher/schedule/dialog/AddEventDialog.tsx"
import {AddTagDialog} from "@/components/features/teacher/schedule/dialog/AddTagDialog.tsx"
import AddDatePickerEventDialog from "@/components/features/teacher/schedule/dialog/AddDatePickerEventDialog.tsx"
import {getUserId, getUserSchool} from "@/utils.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {SchoolEvent, Tag} from "@/model/SchoolEvent.ts";
import {addEvent, fetchEvents, fetchTags} from "@/api/schedule.tsx";
import {messages} from "@/constants.tsx";
import {SchoolEventInfoDialog} from "@/components/shared/dialog/SchoolEventInfoDialog.tsx";


const locales = {
    'hr': hr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export interface EventInfo extends Event {
    title: string
    description: string
    activityId: string
    subActivityId?: string
    schoolClassId: string
    tagId?: string
    teacherId: number
}

export interface EventFormData {
    title: string
    activityId: string
    subActivityId?: string
    schoolClassId: string
    description: string
    tagId?: string
}

export interface DatePickerEventFormData {
    title: string
    activityId: string
    subActivityId?: string
    schoolClassId: string
    description: string
    tagId?: string
    allDay: boolean
    start?: Date
    end?: Date
}

const initialEventFormState: EventFormData = {
    title: "",
    activityId: "1",
    subActivityId: "1",
    description: "",
    schoolClassId: "1",
    tagId: undefined,
}

const initialDatePickerEventFormData: DatePickerEventFormData = {
    title: "",
    activityId: "1",
    subActivityId: "1",
    description: "",
    schoolClassId: "1",
    tagId: undefined,
    allDay: false,
    start: undefined,
    end: undefined,
}

const TeacherEventCalendar = () => {
    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    const [openTodoModal, setOpenTodoModal] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<SchoolEvent | null>(null)
    const [openEventInfo, setOpenEventInfo] = useState<boolean>(false)


    const [events, setEvents] = useState<SchoolEvent[]>([])
    const [tags, setTags] = useState<Tag[]>([])

    const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

    const [datePickerEventFormData, setDatePickerEventFormData] =
        useState<DatePickerEventFormData>(initialDatePickerEventFormData)

    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents();
                const tagsData = await fetchTags();
                setTags(tagsData);
                setEvents(eventsData);
            } catch (error) {
            }
        };

        getEvents();
    }, []);

    const handleSelectSlot = (event: Event) => {
        setOpenSlot(true)
        setEventFormData((prevState) => ({
            ...prevState,
            start: event.start,
            end: event.end,
            allDay: event.allDay
        }))
    }

    const handleSelectEvent = (event: SchoolEvent) => {
        setOpenEventInfo(true);
        setCurrentEvent(event)
    }

    const handleClose = () => {
        setEventFormData(initialEventFormState)
        setOpenSlot(false)
    }

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData)
        setOpenDatepickerModal(false)
    }

    const onAddEvent = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const teacherId = getUserId();

        const data: EventInfo = {
            ...eventFormData,
            teacherId: teacherId,
        }

        try {
            const newEvents = await addEvent(data);
            toast({
                title: "Dodavanje nastavnog sata uspješno!",
                description: "Novi nastavni sat je dodan u sustav.",
            })
            setEvents(newEvents);
        } catch (error) {
            console.error('Error adding event:', error);
            toast({
                duration: 2000,
                variant: "destructive",
                title: "Dodavanje sata neuspješno!",
                description: "Provjerite vezu i pokušajte ponovno.",
            })
        }

        handleClose()
    }

    const onAddEventFromDatePicker = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const addHours = (date: Date | undefined, hours: number) => {
            return date ? date.setHours(date.getHours() + hours) : undefined
        }
        const setMinToZero = (date: any) => {
            date.setSeconds(0)

            return date
        }
        const teacherId = getUserId();

        const data: EventInfo = {
            ...datePickerEventFormData,
            teacherId: teacherId,
            start: setMinToZero(datePickerEventFormData.start),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start, 12)
                : setMinToZero(datePickerEventFormData.end),
        }

        try {
            const newEvents = await addEvent(data);
            setEvents(newEvents);
            toast({
                title: "Dodavanje nastavnog sata uspješno!",
                description: "Novi nastavni je dodan u sustav.",
            })
        } catch (error) {
            console.error('Error adding event:', error);
            toast({
                duration: 2000,
                variant: "destructive",
                title: "Dodavanje sata neuspješno!",
                description: "Provjerite vezu i pokušajte ponovno.",
            })
        }

        setDatePickerEventFormData(initialDatePickerEventFormData)
        handleDatePickerClose()
    }

    const handleCloseInfo = () => {
        setOpenEventInfo(false);
        setCurrentEvent(null);
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
                        Dodaj nastavni sat
                    </Button>
                    <Button
                        type="submit"
                        className="ml-2 py-2 px-4 bg-black text-white rounded shadow-md hover:bg-gray-800 focus:bg-gray-800"
                        onClick={() => setOpenTodoModal(true)}
                    >
                        Dodaj labelu
                    </Button>
                </div>
                <Divider sx={{my: 2}}/>
                {currentEvent &&
                    <SchoolEventInfoDialog
                        showClass={true}
                        event={currentEvent}
                        handleClose={handleCloseInfo}
                        setOpen={setOpenEventInfo}
                        open={openEventInfo}/>
                }
                <AddEventDialog
                    schoolId={String(getUserSchool()?.id)}
                    open={openSlot}
                    handleClose={handleClose}
                    eventFormData={eventFormData}
                    setEventFormData={setEventFormData}
                    onAddEvent={onAddEvent}
                    tags={tags}
                />
                <AddDatePickerEventDialog
                    open={openDatepickerModal}
                    handleClose={handleDatePickerClose}
                    datePickerEventFormData={datePickerEventFormData}
                    setDatePickerEventFormData={setDatePickerEventFormData}
                    onAddEvent={onAddEventFromDatePicker}
                    tags={tags}
                />
                <AddTagDialog
                    open={openTodoModal}
                    handleClose={() => setOpenTodoModal(false)}
                />
                <Calendar
                    messages={messages}
                    culture="hr"
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    startAccessor={(event) => {
                        return new Date(event.startTimestamp)
                    }}
                    endAccessor={(event) => {
                        return new Date(event.endTimestamp)
                    }}
                    defaultView="week"
                    components={{event: EventCard}}
                    eventPropGetter={(event) => {
                        const tag = tags.find((tag) => tag.id === event.tag?.id);
                        return {
                            style: {
                                backgroundColor: tag ? tag.color : "#2563EB",
                                borderColor: tag ? tag.color : "#2563EB",
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

export default TeacherEventCalendar