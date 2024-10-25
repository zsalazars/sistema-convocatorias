import React, { useState } from 'react';

import DatePicker from '../shared/ui/DatePicker';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from "@/libs/utils"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator';

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

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [fechaPublicacion1, setFechaPublicacion1] = useState<Date | null>(null);
  const [fechaPublicacion2, setFechaPublicacion2] = useState<Date | null>(null);
  const [fechaPublicacion3, setFechaPublicacion3] = useState<Date | null>(null);

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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-4">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2">
            Solicitud
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
                  : "-- Seleccionar solicitud -- "}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
              <Command>
                <CommandInput placeholder="-- Seleccionar solicitud --" />
                <CommandList>
                  <CommandEmpty>Ninguna solicitud encontrada.</CommandEmpty>
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

        <div className="col-span-1 md:col-span-4 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2">
            Tipo de la convocatoria
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Seleccionar --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INTERNA">INTERNA</SelectItem>
              <SelectItem value="EXTERNA">EXTERNA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-4 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2">
            Modalidad de la convocatoria
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Seleccionar --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="REGIONAL">REGIONAL</SelectItem>
              <SelectItem value="NACIONAL">NACIONAL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-12 my-5">
          <Separator />
        </div>

        <div className="col-span-1 md:col-span-12">
          <h3 className="text-xl font-semibold font-gelion">Fechas de la convocatoria</h3>
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Publicación de la convocatoria
          </label>
          <DatePicker
            selectedDate={fechaPublicacion1}
            onDateSelect={setFechaPublicacion1}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Presentación de documentos
          </label>
          <DatePicker
            selectedDate={fechaPublicacion1}
            onDateSelect={setFechaPublicacion1}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Calificación de documentos
          </label>
          <DatePicker
            selectedDate={fechaPublicacion2}
            onDateSelect={setFechaPublicacion2}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Publicación de aptos
          </label>
          <DatePicker
            selectedDate={fechaPublicacion3}
            onDateSelect={setFechaPublicacion3}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Publicación de horarios de entrevista
          </label>
          <DatePicker
            selectedDate={fechaPublicacion3}
            onDateSelect={setFechaPublicacion3}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Entrevista personal
          </label>
          <DatePicker
            selectedDate={fechaPublicacion3}
            onDateSelect={setFechaPublicacion3}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Publicación de resultados
          </label>
          <DatePicker
            selectedDate={fechaPublicacion3}
            onDateSelect={setFechaPublicacion3}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Inicio de funciones
          </label>
          <DatePicker
            selectedDate={fechaPublicacion3}
            onDateSelect={setFechaPublicacion3}
          />
        </div>

        <div className="col-span-1 md:col-span-2 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Estado
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Seleccionar --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ABIERTO">ABIERTO</SelectItem>
              <SelectItem value="CERRADO">CERRADO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between col-span-1 md:col-span-2"> {/* Columna que ocupa el ancho completo en pantallas pequeñas */}
          <Button
            className="bg-uac text-white hover:bg-blue-900 transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Publicar nueva convocatoria
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConvocatoriasForm;