import {ColumnDef} from "@tanstack/react-table"
import {StudentResult} from "@/model/StudentResult.ts";

export const columns: ColumnDef<StudentResult>[] = [
    {
        accessorKey: "student",
        header: "Učenik",
    },
    {
        accessorKey: "averageResult",
        header: "Prosječni rezultat",
    },
    {
        accessorKey: "unit",
        header: "Mjera",
    },
]
