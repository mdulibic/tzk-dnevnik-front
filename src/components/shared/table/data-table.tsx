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

import {Button} from "@/components/ui/button.tsx"
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import FilterDropdown from "@/components/shared/table/filter-dropdown.tsx";
import {FilterPair} from "@/pages/admin/students/StudentsDashboard.tsx";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

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
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(data.length / 10);

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
        {key: 'email', value: 'Email'},
        {key: 'name', value: 'Ime'},
        {key: 'surname', value: 'Prezime'},
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
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                    <FilterDropdown options={filterOptions} onFilter={handleFilter}/>
                    <Input
                        placeholder="Filtriraj..."
                        onChange={handleInputChange}
                        className="max-w-sm ml-4 h-10" // Adjusted height and spacing
                    />
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <ul className="flex space-x-2">
                        {currentPage > 1 && (
                            <li>
                                <Button
                                    className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                                    onClick={() => {
                                        changePage(currentPage - 1)
                                        table.setPageIndex(currentPage - 1)
                                    }}
                                >
                                    <ArrowBack className="w-24 h-24"/>
                                </Button>
                            </li>
                        )}
                        {Array.from({length: totalPages}, (_, i) => (
                            <li key={i + 1}>
                                <Button
                                    className={`px-4 py-2 border rounded focus:outline-none ${
                                        currentPage === i + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                    }`}
                                    onClick={() => {
                                        changePage(i + 1)
                                        table.setPageIndex(i)
                                    }}
                                >
                                    {i + 1}
                                </Button>
                            </li>
                        ))}
                        {currentPage < totalPages && (
                            <li>
                                <Button
                                    className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                                    onClick={() => {
                                        changePage(currentPage + 1)
                                        table.setPageIndex(currentPage + 1)
                                    }}
                                >
                                    <ArrowForward className="w-24 h-24"/>
                                </Button>
                            </li>
                        )}
                    </ul>
                    <p className="text-s text-muted-foreground">({data.length} rezultat/a)</p>
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
        </div>
    )
}
