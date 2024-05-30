import { Typography } from "@mui/material"
import { IEventInfo } from "./EventCalendar.tsx"

interface IProps {
    event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
    return (
        <>
            <Typography>{event.description}</Typography>
        </>
    )
}

export default EventInfo