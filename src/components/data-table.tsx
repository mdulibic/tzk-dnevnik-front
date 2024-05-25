import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    getCoreRowModel, getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"

import {Button} from "@/components/ui/button"
import {useState} from "react";
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/filter-dropdown.tsx";
import {FilterPair} from "@/pages/admin/students/StudentsDashboard.tsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [checkedFilters, setCheckedFilters] = useState<string[]>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        }
    })

    const filterOptions: FilterPair[] = [
        { key: 'email', value: 'Email' },
        { key: 'name', value: 'Ime' },
        { key: 'surname', value: 'Prezime' },
    ];

    const handleFilter = (checkboxes: string[]) => {
        setCheckedFilters(checkboxes);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        checkedFilters.forEach(option => {
            table.getColumn(option)?.setFilterValue(value);
        });
    };


    return (
        <div>
            <div className="flex items-center justify-end py-4">
                <div className="flex items-center">
                    <FilterDropdown options={filterOptions} onFilter={handleFilter} />
                    <Input
                        placeholder="Filtriraj..."
                        onChange={handleInputChange}
                        className="max-w-sm ml-4 h-10" // Adjusted height and spacing
                    />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nema evidentiranih podataka.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prethodni
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Sljedeći
                </Button>
            </div>
        </div>
    )
}
