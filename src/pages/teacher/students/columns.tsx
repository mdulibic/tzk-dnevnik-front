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
import StudentUpdateDialog from "@/components/features/admin/StudentUpdateDialog.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
import {Student} from "@/model/Student.ts";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {useNavigate} from "react-router-dom";

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ime
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "surname",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Prezime
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
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
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "schoolClass",
        header: "Razred",
        cell: (info) => {
            const schoolClass = info.getValue() as SchoolClass;
            return `${schoolClass.year}.${schoolClass.division}`;
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const student = row.original
            const navigate = useNavigate();

            const handleDelete = async (id: number) => {
                try {
                    const response = await fetch(`${BASE_API_URL}/api/students/delete/${id}`, {
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
                        title: "Učenik izbrisan!",
                        description: "Podaci o učeniku uspješno izbrisani!",
                    })
                    console.log(`Student with id ${id} deleted successfully.`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error('Error deleting student:', error);

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
                                <span className="sr-only">Otvori meni</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-black-500 focus:text-black-600 focus:text-black-100"
                                              onClick={() => {
                                                  navigate('/teacher/students/details', {state: {studentId: student.id}});
                                              }}
                            >
                                Prikaži detalje učenika
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-100"
                                              onClick={() => handleDelete(student.id)}
                            >
                                Izbriši korisnika
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="text-blue-600 focus:text-blue-600 focus:bg-blue-100">
                                    Ažuriraj podatke
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <StudentUpdateDialog student={student}/>
                </Dialog>
            )
        },
    },
]
