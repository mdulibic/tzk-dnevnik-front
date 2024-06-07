import {Dispatch, SetStateAction} from "react";
import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {formatDateTime} from "@/utils";

interface IProps {
    event: SchoolEvent
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    showClass: boolean
}

export const SchoolEventInfoDialog = ({event, open, handleClose, showClass}: IProps) => {
    const onClose = () => handleClose()

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nastavni sat</DialogTitle>
                </DialogHeader>
                <div className="gap-4 py-4 space-y-4">
                    <div className="gap-4">
                        <p className="text-sm font-semibold">
                            Naslov:
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {event.title}
                        </p>
                    </div>
                    <div className="gap-4">
                        <p className="text-sm font-semibold">
                            Opis:
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {event.description}
                        </p>
                    </div>
                    <div className="gap-4">
                        <p className="text-sm font-semibold">
                            Aktivnost:
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {event.activity.name} {event.subActivity && `(${event.subActivity.name})`}
                        </p>
                    </div>
                    {showClass && <div className="gap-4">
                        <p className="text-sm font-semibold">
                            Razred:
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {event.schoolClass.year}.{event.schoolClass.division}
                        </p>
                    </div>
                    }
                    <div className="gap-4">
                        <p className="text-sm font-semibold">
                            Vrijeme:
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatDateTime(event.startTimestamp)} - {formatDateTime(event.endTimestamp)}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex">
                            <Button type="button" variant="destructive" onClick={onClose}>Zatvori</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}