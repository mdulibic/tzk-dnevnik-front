import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import EventCalendar from "@/components/features/planer/EventCalendar.tsx";
//import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Planer() {
    return (
        <div>
            <PageHeader>
                <PageHeaderHeading>Planer</PageHeaderHeading>
            </PageHeader>
            <EventCalendar/>
        </div>
    )
}
