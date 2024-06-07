import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Calendar, dateFnsLocalizer} from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import hr from 'date-fns/locale/hr';

import "react-big-calendar/lib/css/react-big-calendar.css"

import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {messages} from "@/constants.tsx";
import {fetchEventsForStudent} from "@/api/schedule.tsx";
import {getUserId} from "@/utils.ts";
import EventCard from "../teacher/schedule/EventCard";
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

export const StudentEventCalendar = () => {
    const [events, setEvents] = useState<SchoolEvent[]>([])
    const [openEventInfo, setOpenEventInfo] = useState<boolean>(false)
    const [currentEvent, setCurrentEvent] = useState<SchoolEvent | null>(null)

    useEffect(() => {
        const getEvents = async () => {
            try {
                const studentId = getUserId();
                const eventsData = await fetchEventsForStudent(studentId);
                setEvents(eventsData);
            } catch (error) {
            }
        };

        getEvents();
    }, []);

    const handleSelectEvent = (event: SchoolEvent) => {
        setOpenEventInfo(true);
        setCurrentEvent(event);
    }

    const handleCloseInfo = () => {
        setOpenEventInfo(false);
        setCurrentEvent(null);
    }

    return (
        <Card>
            <CardContent>
                {currentEvent &&
                    <SchoolEventInfoDialog
                        showClass={false}
                        event={currentEvent}
                        handleClose={handleCloseInfo}
                        open={openEventInfo}/>
                }
                <Calendar
                    className="p-8"
                    messages={messages}
                    culture="hr"
                    localizer={localizer}
                    onSelectEvent={handleSelectEvent}
                    events={events}
                    startAccessor={(event) => {
                        return new Date(event.startTimestamp)
                    }}
                    endAccessor={(event) => {
                        return new Date(event.endTimestamp)
                    }}
                    defaultView="week"
                    components={{event: EventCard}}
                    eventPropGetter={(_) => {
                        return {
                            style: {
                                backgroundColor: "#2563EB",
                                borderColor: "#2563EB",
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