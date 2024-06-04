import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import EventCalendar from "@/components/features/teacher/schedule/EventCalendar.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {getUserId} from "@/utils.ts";
import {ArrowRight} from "lucide-react";
import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {fetchTeacherById} from "@/api/users.tsx";

function formatDateTime(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(date);
    const [datePart, timePart] = formattedDate.split(', ');

    const timePartWithH = timePart.replace(':', ':') + 'h';

    return `${datePart}, ${timePartWithH}`;
}


export default function Schedule() {
    const [nextEvent, setNextEvent] = useState<SchoolEvent | null>(null);
    const teacherId = getUserId();

    useEffect(() => {
        const getTeacher = async () => {
            try {
                const data = await fetchTeacherById(teacherId);

                const now = new Date();
                const upcomingEvents = data.events.filter(event => new Date(event.startTimestamp) > now);
                const nextEvent = upcomingEvents.sort((a, b) => new Date(a.startTimestamp).getTime() - new Date(b.startTimestamp).getTime())[0];
                setNextEvent(nextEvent);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getTeacher();
    }, [teacherId]);
    return (
        <div>
            <PageHeader>
                <PageHeaderHeading>Raspored nastave</PageHeaderHeading>
                {nextEvent && (
                    <Card
                        className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => {/* Handle card click, e.g., navigate to event details */
                        }}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                    Nadolazeći nastavni sat
                                </CardTitle>
                                <ArrowRight className="ml-2 w-4 h-4"/>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-md font-semibold text-blue-600">{nextEvent.title}</div>
                            <p className="text-xs text-muted-foreground">
                                Aktivnost: {nextEvent.activity.name} {nextEvent?.subActivity && `(${nextEvent.subActivity.name})`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {nextEvent?.schoolClass && `Razred: ${nextEvent.schoolClass.year}.${nextEvent.schoolClass.division}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Vrijeme: {formatDateTime(nextEvent.startTimestamp)} - {formatDateTime(nextEvent.endTimestamp)}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </PageHeader>
            <EventCalendar/>
        </div>
    )
}
