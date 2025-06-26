"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "./table/data-table";
import { columns, type Article } from "./table/columns";

import { useEffect, useState } from "react";
import { GetArticles } from "./GetArticles";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function renderSkeletonTable() {
    return (
        <div className="rounded-md border w-full max-w-screen overflow-x-auto">
            <Table className="min-w-full table-auto whitespace-normal">
                <TableHeader>
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableHead key={col.id || idx} className="break-words max-w-xs">
                                {typeof col.header === 'string' ? col.header : null}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, rowIdx) => (
                        <TableRow key={rowIdx}>
                            {columns.map((col, colIdx) => (
                                <TableCell key={col.id || colIdx} className="break-words max-w-xs">
                                    <Skeleton className="h-6 w-full rounded" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default function Search() {
    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchData = async (pageNum = page, size = pageSize) => {
        setLoading(true);
        const result = await GetArticles({ page: pageNum, pageSize: size });
        setData(result.data);
        setTotal(result.total);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(page, pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="grid grid-flow-row p-8 max-w-full overflow-x-auto gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <Textarea className="flex-[2] min-h-[56px]" />
                <div className="flex-1 flex justify-center">
                  <Button onClick={() => fetchData(page, pageSize)} className="w-auto px-8">Submit</Button>
                </div>
            </div>
            <div className="">
                {loading ? 
                    renderSkeletonTable()
                    :
                    <div>
                        <DataTable columns={columns} data={data} />
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <label htmlFor="page-size" className="mr-2">Page Size:</label>
                                <select
                                    id="page-size"
                                    className="border rounded px-2 py-1"
                                    value={pageSize}
                                    onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
                                >
                                    {[5, 10, 20, 50].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={e => { e.preventDefault(); if(page > 1) setPage(page - 1); }} />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <PaginationItem key={idx}>
                                            <PaginationLink
                                                href="#"
                                                isActive={page === idx + 1}
                                                onClick={e => { e.preventDefault(); setPage(idx + 1); }}
                                            >
                                                {idx + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext href="#" onClick={e => { e.preventDefault(); if(page < totalPages) setPage(page + 1); }} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}