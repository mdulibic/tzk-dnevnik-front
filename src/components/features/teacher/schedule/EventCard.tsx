import { SchoolEvent } from "@/model/SchoolEvent";
import {Typography} from "@mui/material";

interface IProps {
    event: SchoolEvent
}

const EventCard = ({event}: IProps) => {
    return (
        <>
            <Typography>{event.title} </Typography>
        </>
    )
}

export default EventCard