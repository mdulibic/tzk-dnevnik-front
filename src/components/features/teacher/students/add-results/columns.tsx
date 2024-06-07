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
        cell: ({ row, column }) => {
            const subactivity = row.original.activity;
            const handleInputChange = (event) => {
            };
            return (
                <input
                    type="text"
                    value={subactivity !== null ? subactivity : ""}
                    placeholder="Aktivnost"
                    onChange={handleInputChange}
                />
            );
        }
    },
    {
        accessorKey: "subactivity",
        header: "Poaktivnost",
        cell: ({ row, column }) => {
            const subactivity = row.original.subactivity;
            const handleInputChange = (event) => {
            };
            return (
                <input
                    type="text"
                    placeholder="Podaktivnost"
                    onChange={handleInputChange}
                />
            );
        }
    },
    {
        accessorKey: "result",
        header: "Rezultat",
        cell: ({ row, column }) => {
            const subactivity = row.original.result;
            const handleInputChange = (event) => {
            };
            return (
                <input
                    type="text"
                    value={subactivity !== null ? subactivity : ""}
                    placeholder="Podaktivnost"
                    onChange={handleInputChange}
                />
            );
        }
    },
    {
        accessorKey: "unit",
        header: "Ocjena/Mjera",
        cell: ({ row, column }) => {
            const subactivity = row.original.unit;
            const handleInputChange = (event) => {
            };
            return (
                <input
                    type="text"
                    value={subactivity !== null ? subactivity : ""}
                    placeholder="Podaktivnost"
                    onChange={handleInputChange}
                />
            );
        }
    },
]
