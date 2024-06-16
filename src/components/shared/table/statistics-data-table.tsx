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
import {ArrowBack, ArrowForward} from "@mui/icons-material";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function StatisticsDataTable<TData, TValue>({
                                                       columns,
                                                       data,
                                                   }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
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

    const getPaginationRange = () => {
        const range = [];
        const dots = '...';
        const rangeSize = 4;

        if (totalPages <= rangeSize + 1) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            if (currentPage <= rangeSize) {
                for (let i = 1; i <= rangeSize + 1; i++) {
                    range.push(i);
                }
                range.push(dots);
                range.push(totalPages);
            } else if (currentPage > totalPages - rangeSize) {
                range.push(1);
                range.push(dots);
                for (let i = totalPages - rangeSize; i <= totalPages; i++) {
                    range.push(i);
                }
            } else {
                range.push(1);
                range.push(dots);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    range.push(i);
                }
                range.push(dots);
                range.push(totalPages);
            }
        }
        return range;
    };

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="flex justify-end  items-center space-x-2 py-4">
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
                        {getPaginationRange().map((page, index) => (
                            <li key={index}>
                                {page === '...' ? (
                                    <span className="px-4 py-2">...</span>
                                ) : (
                                    <Button
                                        className={`px-4 py-2 border rounded focus:outline-none ${
                                            currentPage === page
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                        }`}
                                        onClick={() => {
                                            changePage(page)
                                            table.setPageIndex(page - 1)
                                        }}
                                    >
                                        {page}
                                    </Button>
                                )}
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
