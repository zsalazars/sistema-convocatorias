import React, { useState } from 'react';

import { format } from "date-fns"
import { es } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';

import { cn } from "@/libs/utils"
import { Button } from "@/components/ui/button"

import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const cargos = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const ConvocatoriasForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [proveido, setProveido] = useState('');
  const [date, setDate] = React.useState<Date>()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', { title, proveido });
    // Reset form
    setTitle('');
    setProveido('');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold font-gelion mb-6 text-gray-800">Nueva convocatoria</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Documento
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Ej: OFICIO N° xxx-20xx-UNIDAD-UAC"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Dependencia
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between text-left font-normal"
              >
                {value
                  ? cargos.find((framework) => framework.value === value)?.label
                  : "-- Seleccionar dependencia -- "}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[1000px] p-0">
              <Command>
                <CommandInput placeholder="-- Seleccionar dependencia --" />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {cargos.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="proveido">
            Proveido
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="proveido"
            type="text"
            value={proveido}
            onChange={(e) => setProveido(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Cargo
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between text-left font-normal"
              >
                {value
                  ? cargos.find((framework) => framework.value === value)?.label
                  : "-- Seleccionar cargo --"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[1000px] p-0">
              <Command>
                <CommandInput placeholder="-- Seleccionar cargo --" />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {cargos.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Fecha
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP", { locale: es }) : <span>Elegir fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Estado
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nuevo">NUEVO</SelectItem>
              <SelectItem value="reingreso">REINGRESO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between col-span-1 md:col-span-2"> {/* Columna que ocupa el ancho completo en pantallas pequeñas */}
          <Button
            className="bg-uac text-white hover:bg-blue-900 transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Agregar solicitud
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConvocatoriasForm;