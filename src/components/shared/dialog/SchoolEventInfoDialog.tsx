import {useState, Dispatch, SetStateAction} from "react";
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
import {Edit, Trash} from "lucide-react";

interface IProps {
    event: SchoolEvent;
    open: boolean;
    handleClose: Dispatch<SetStateAction<void>>;
    showClass: boolean;
    setOpen: (open: boolean) => void;
}

export const SchoolEventInfoDialog = ({
                                          event,
                                          open,
                                          handleClose,
                                          showClass,
                                          setOpen,
                                      }: IProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(event);

    const onClose = () => {
        handleClose();
    };

    const handleEdit = () => setIsEditing(true);

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEditedEvent({...editedEvent, [name]: value});
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    {isEditing ? (
                        <DialogTitle>Uredi nastavni sat</DialogTitle>
                    ) : (
                        <DialogTitle>Nastavni sat</DialogTitle>
                    )}
                </DialogHeader>
                <div className="gap-4 py-4 space-y-4">
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Naslov:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="title"
                                value={editedEvent.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">{event.title}</p>
                        )}
                    </div>
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Opis:</p>
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={editedEvent.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        )}
                    </div>
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Aktivnost:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="activityName"
                                value={editedEvent.activity.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">{event.activity.name} {event.subActivity && `(${event.subActivity.name})`}</p>
                        )}
                    </div>
                    {showClass && (
                        <div className="gap-4">
                            <p className="text-sm font-semibold">Razred:</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="schoolClass"
                                    value={`${editedEvent.schoolClass.year}.${editedEvent.schoolClass.division}`}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">{event.schoolClass.year}.{event.schoolClass.division}</p>
                            )}
                        </div>
                    )}
                    <div className="gap-4">
                        <p className="text-sm font-semibold">Vrijeme:</p>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <input
                                    type="datetime-local"
                                    name="startTimestamp"
                                    value={editedEvent.startTimestamp}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="datetime-local"
                                    name="endTimestamp"
                                    value={editedEvent.endTimestamp}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">{formatDateTime(event.startTimestamp)} - {formatDateTime(event.endTimestamp)}</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex w-full justify-between">
                            {isEditing ? (
                                <div className="flex w-full justify-between">
                                    <Button type="submit" variant="destructive" onClick={onClose}>Odustani</Button>
                                    <Button type="submit" onClick={handleSave}>Spremi</Button>
                                </div>
                            ) : (
                                <>
                                    <Button type="button" variant="destructive" onClick={() => {

                                    }}>
                                        <Trash className="mr-2"/>Izbriši
                                    </Button>
                                    <Button type="button" onClick={handleEdit}>
                                        <Edit className="mr-2"/> Uredi
                                    </Button>
                                </>
                            )}
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
