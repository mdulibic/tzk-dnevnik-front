import {IEvent} from "./EventCalendar.tsx"
import {Typography} from "@mui/material";

interface IProps {
    event: IEvent
}

const EventInfo = ({event}: IProps) => {
    return (
        <>
            <Typography>{event.title} </Typography>
        </>
    )
}

export default EventInfo