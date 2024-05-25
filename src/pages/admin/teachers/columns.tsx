import {ColumnDef} from "@tanstack/react-table"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {SchoolClass} from "@/pages/admin/students/columns.tsx";
import TeacherUpdateDialog from "@/pages/admin/teachers/TeacherUpdateDialog.tsx";

export type Teacher = {
    id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    role: string;
    classesTeaching: SchoolClass[];
};


export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ime
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "surname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Prezime
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "username",
        header: "Korisničko ime",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "classesTeaching",
        header: "Razredi",
        cell: (info) => {
            const schoolClasses = info.getValue() as SchoolClass[];
            return schoolClasses.map(schoolClass => `${schoolClass.year}.${schoolClass.division}`).join(", ");
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const teacher = row.original

            const handleDelete = async (id: number) => {
                try {
                    const response = await fetch(`${BASE_API_URL}/api/teachers/delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authHeader(),
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    // Optionally, refresh the student list or handle the UI update
                    toast({
                        title: "Nastavnik izbrisan!",
                        description: "Podaci o nastavniku uspješno izbrisani!",
                    })
                    console.log(`Teachert with id ${id} deleted successfully.`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error('Error deleting teacher:', error);

                    toast({
                        duration: 2000,
                        variant: "destructive",
                        title: "Brisanje neuspješno!",
                        description: "Provjerite vezu i pokušajte ponovno.",
                    })
                }
            };

            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-100"
                                              onClick={() => handleDelete(teacher.id)}
                            >
                                Izbriši
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="text-blue-600 focus:text-blue-600 focus:bg-blue-100">
                                    Ažuriraj podatke
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <TeacherUpdateDialog teacher={teacher} />
                </Dialog>
            )
        },
    },
]
