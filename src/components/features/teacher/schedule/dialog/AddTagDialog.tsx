import {useState, Dispatch, SetStateAction} from "react"
import {
    Box,
} from "@mui/material"
import {
    Dialog, DialogClose,
    DialogContent, DialogFooter, DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "../../../../ui/button.tsx";

import {HexColorPicker} from "react-colorful"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {toast} from "@/components/ui/use-toast.ts";

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
}

export const AddTagDialog = ({open, handleClose}: IProps) => {
    const [color, setColor] = useState("#b32aa9")
    const [title, setTitle] = useState("")

    const onAddTag = async () => {

        const newTag = {
            color,
            title,
        };

        try {
            const response = await fetch(`${BASE_API_URL}/api/events/tags/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader(),
                },
                body: JSON.stringify(newTag),
            });

            if (response.ok) {
                setTitle("");
                setColor("");
                toast({
                    title: "Dodana labela!",
                    description: "Novi labela je dodana u sustav.",
                })

                onClose();
            } else {
                console.error('Failed to add tag');
                toast({
                    duration: 2000,
                    variant: "destructive",
                    title: "Dodavanje labele neuspješno!",
                    description: "Provjerite vezu i pokušajte ponovno.",
                })
            }
        } catch (error) {
            console.error('Failed to add tag', error);
            toast({
                duration: 2000,
                variant: "destructive",
                title: "Dodavanje labele neuspješno!",
                description: "Provjerite vezu i pokušajte ponovno.",
            })
        }
        setTitle("")
        onClose()
    }

    const onClose = () => handleClose()

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dodaj labelu</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Naslov
                        </Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            value={title}
                        />
                    </div>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Label htmlFor="title" className="text-right gap-4 px-4">
                            Boje labele
                        </Label>
                        <HexColorPicker color={color} onChange={setColor}/>
                        <Box
                            sx={{height: 80, width: 80, borderRadius: 4}}
                            className="value"
                            style={{backgroundColor: color}}>
                        </Box>
                    </Box>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex w-full justify-between">
                            <Button type="submit" variant="destructive" onClick={onClose}>Odustani</Button>
                            <Button
                                type="submit"
                                onClick={() => onAddTag()}
                                disabled={title === "" || color === ""}>Spremi</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}