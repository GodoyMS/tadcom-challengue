import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { countries } from "@/constants/countries";
import { FilterIcon } from "lucide-react";
import { IFilters } from "@/interfaces/table";

interface TableFilterProps {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}
const TableFilters = ({ filters, setFilters }: TableFilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon size={18} className=" mr-2" /> Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filtros</h4>
            <p className="text-sm text-muted-foreground">
              Filtrar por nacionalidad y género
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Género</Label>
              <Select
                value={filters.gender}
                onValueChange={(val: string) =>
                  setFilters((prev) => ({ ...prev, gender: val }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escoge una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="male">Hombre</SelectItem>
                  <SelectItem value="female">Mujer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Nacionalidad</Label>
              <Select  value={filters.nat}
                onValueChange={(val: string) =>
                  setFilters((prev) => ({ ...prev, nat: val }))
                }>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escoge una opción" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TableFilters;
