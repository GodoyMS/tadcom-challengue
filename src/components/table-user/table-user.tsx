import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@components/ui/button";

import { Input } from "@components/ui/input";
import { ColumnsUser } from "./table-cols";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import TableSelectColumns from "./table-select-columns";
import TableFilters from "./table-filters";
import { IFilters, UserTable } from "@/interfaces/table";
import Edituser from "./edit-user";
import { toast } from "sonner";

interface TableProps {
  data: UserTable[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  loading: boolean;
}

export default function TableUser({
  filters,
  setFilters,
  data,
  page,
  setPage,
  loading,
}: TableProps) {
  const [usersData, setUsersData] = React.useState<UserTable[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedRow, setSelectedRow] = React.useState<UserTable | null>(null);
  const handleEditClick = (row: UserTable) => {
    setSelectedRow(row);
  };
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    setUsersData(data);
  }, [data]);

  const table = useReactTable({
    data: usersData,
    columns: ColumnsUser(handleEditClick),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const deleteSelectedRows = () => {
    const indicesToDelete = table
      .getSelectedRowModel()
      .rows.map((e) => e.index);
      const indicesToDeleteLength=indicesToDelete.length;
    const newArray = usersData.filter(
      (_, index) => !indicesToDelete.includes(index)
    );
    setUsersData(newArray);
    
    table.resetRowSelection();

    toast.success(`${indicesToDeleteLength} filas han sido eliminados`)
  };

  return (
    <div className="w-full">
      <Edituser usersData={usersData} setUsersData={setUsersData} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
      <div className="flex flex-col justify-between md:flex-row items-center gap-4 py-4">
        <div className="flex flex-col w-full md:flex-row gap-4">
          <Input
            placeholder="Buscar por nombres.."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className=" w-full md:max-w-sm"
          />

          <TableFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex w-full md:max-w-md justify-end  flex-row gap-4">
          <div className="flex-1 md:flex-none ">
            <TableSelectColumns table={table} />
          </div>
          {table.getSelectedRowModel().rows.length > 0 && (
            <Button
              className="flex-1 md:flex-none"
              onClick={deleteSelectedRows}
              variant={"destructive"}
            >
              Eliminar
            </Button>
          )}
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" max-h-[400px] ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ColumnsUser.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || loading}
          >
            Atrás
          </Button>
          <Button
            className=" hover:bg-none hover:fill-none text-xs font-normal"
            variant="ghost"
          >
            Pag {page}
          </Button>

          <Button
            disabled={loading}
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
