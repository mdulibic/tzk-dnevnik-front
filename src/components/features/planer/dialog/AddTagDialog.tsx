import {useState, Dispatch, SetStateAction} from "react"
import {
    Box,
} from "@mui/material"
import {
    Dialog, DialogClose,
    DialogContent, DialogFooter, DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "../../../ui/button.tsx";

import {HexColorPicker} from "react-colorful"
import {Tag} from "../EventCalendar.tsx"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    tags: Tag[]
    setTags: Dispatch<SetStateAction<Tag[]>>
}

export const AddTagDialog = ({open, handleClose, tags, setTags}: IProps) => {
    const [color, setColor] = useState("#b32aa9")
    const [title, setTitle] = useState("")

    const onAddTag = () => {
        setTitle("")
        setTags([
            ...tags,
            {
                id: "",
                color,
                title,
            },
        ])
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