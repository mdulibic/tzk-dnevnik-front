import {ColumnDef} from "@tanstack/react-table"
import {ResultInfo} from "@/components/features/teacher/students/results/Results.tsx";

export const columns: ColumnDef<ResultInfo>[] = [
    {
        accessorKey: "student",
        header: "Učenik",
    },
    {
        accessorKey: "activity",
        header: "Aktivnost",
    },
    {
        accessorKey: "subactivity",
        header: "Podaktivnost",
        cell: (info) => {
            const subactivity = info.getValue();
            if (subactivity !== null) {
                return `${subactivity}`;
            } else {
                return "Nema podaktivnosti";
            }
        }
    },
    {
        accessorKey: "result",
        header: "Rezultat",
    },
    {
        accessorKey: "unit",
        header: "Ocjena/Mjera",
    },
    {
        accessorKey: "timestamp",
        header: "Vrijeme",
    }
]
