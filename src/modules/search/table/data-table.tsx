"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { CircleCheckBig } from "lucide-react"
import React from "react"
import { Alert, AlertTitle } from "@/components/ui/alert"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
  <>
    <div className="mb-4">
      <Alert variant="default">
        {/* <Terminal /> */}
        <CircleCheckBig />
        <AlertTitle> {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.</AlertTitle>
        {/* <AlertDescription>
          You can add components and dependencies to your app using the cli.
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </AlertDescription> */}
      </Alert>

    </div>
    <div className="rounded-md border w-full max-w-screen overflow-x-auto">
      <Table className="min-w-full table-auto whitespace-normal">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="break-words max-w-xs">
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
            table.getRowModel().rows.map((row) => {
              // const isOpen = openRow === row.id
              return (
                <Collapsible key={row.id} asChild>
                  <>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {/* <TableCell className="w-8">
                        <CollapsibleTrigger asChild>
                          <button type="button">
                            <ChevronDownIcon className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                          </button>
                        </CollapsibleTrigger>
                      </TableCell> */}
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="break-words max-w-xs">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    <CollapsibleContent asChild className="p-0 bg-sidebar-accent text-sidebar-primary-foreground">
                      <tr className="p-0 border-b">
                        <td colSpan={columns.length + 1} className="p-0 border-t-0">
                          <div className="p-4">{row.getValue("description") ?? 'No Content available'}</div>
                        </td>
                      </tr>
                    </CollapsibleContent>
                  </>
                </Collapsible>

              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </>
  )
}