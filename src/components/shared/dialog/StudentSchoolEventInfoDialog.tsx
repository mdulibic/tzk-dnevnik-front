import {SchoolEvent} from "@/model/SchoolEvent.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {formatDateTime} from "@/utils.ts";

interface IProps {
    event: SchoolEvent;
    open: boolean;
    showClass: boolean;
    setOpen: (open: boolean) => void;
}

export const StudentSchoolEventInfoDialog = ({
                                                 event,
                                                 open,
                                                 showClass,
                                                 setOpen,
                                             }: IProps) => {


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nastavni sat</DialogTitle>
                </DialogHeader>
                <div className="gap-4 py-4 space-y-4">
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Naslov:</p>
                        <p className="text-sm text-muted-foreground">{event.title}</p>
                    </div>
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Opis:</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Aktivnost:</p>
                        <p className="text-sm text-muted-foreground">{event.activity.name} {event.subActivity && `(${event.subActivity.name})`}</p>
                    </div>
                    {showClass && (
                        <div className="gap-4">
                            <p className="text-sm font-semibold">Razred:</p>
                            <p className="text-sm text-muted-foreground">{event.schoolClass.year}.{event.schoolClass.division}</p>
                        </div>
                    )}
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Vrijeme:</p>
                        <p className="text-sm text-muted-foreground">{formatDateTime(event.startTimestamp)} - {formatDateTime(event.endTimestamp)}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
