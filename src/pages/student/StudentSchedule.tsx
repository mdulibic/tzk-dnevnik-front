import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {useEffect, useState} from "react";
import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {formatDateTime, getUserId} from "@/utils.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {fetchEventsForStudent} from "@/api/schedule.tsx";
import {StudentEventCalendar} from "@/components/features/student/StudentEventCalendar.tsx";


export default function StudentSchedule() {
    const [nextEvent, setNextEvent] = useState<SchoolEvent | null>(null);
    const studentId = getUserId();

    useEffect(() => {
        const getTeacher = async () => {
            try {
                const data = await fetchEventsForStudent(studentId);

                const now = new Date();
                const upcomingEvents = data.filter(event => new Date(event.startTimestamp) > now);
                const nextEvent = upcomingEvents.sort((a, b) => new Date(a.startTimestamp).getTime() - new Date(b.startTimestamp).getTime())[0];
                setNextEvent(nextEvent);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getTeacher();
    }, [studentId]);
    return (
        <div>
            <PageHeader>
                <PageHeaderHeading>Raspored nastave</PageHeaderHeading>
                {nextEvent && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                    Nadolazeći nastavni sat
                                </CardTitle>
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
            <StudentEventCalendar/>
        </div>
    )
}
