import React, { useEffect, useState } from 'react';

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
import { getAllCargos } from '@/services/api/cargo.api';
import { Cargo } from '@/interfaces/model/Cargo';
import { getAllDependencias } from '@/services/api/dependencia.api';
import { Dependencia } from '@/interfaces/model/Dependencia';
import LoadingSpinner from '../shared/ui/LoadingSpinner';

const SolicitudesForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [proveido, setProveido] = useState('');
  const [date, setDate] = useState<Date>()

  const [openDependencia, setOpenDependencia] = useState(false)
  const [openCargo, setOpenCargo] = useState(false)

  const [dependenciasList, setDependenciasList] = useState<Dependencia[]>([])
  const [cargosList, setCargosList] = useState<Cargo[]>([])

  const [selectedDependencia, setSelectedDependencia] = useState<Dependencia | null>(null);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga de datos
  const [error, setError] = useState(false); // Estado para controlar el error de datos

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', { title, proveido });
    // Reset form
    setTitle('');
    setProveido('');
  };

  const fetchDependencias = async () => {
    try {
      const res = await getAllDependencias();
      setDependenciasList(res)
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCargos = async () => {
    try {
      const res = await getAllCargos();
      setCargosList(res)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDependencias();
    fetchCargos();
  }, [])

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold font-gelion mb-6 text-gray-800">Agregar nueva solicitud</h2>
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
          <label className="block text-gray-700 text-sm font-bold font-default mb-2">
            Dependencia
          </label>
          <Popover open={openDependencia} onOpenChange={setOpenDependencia}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDependencia}
                className="w-full justify-between text-left font-normal"
              >
                {selectedDependencia ? selectedDependencia.nombreDependencia : "-- Seleccionar dependencia --"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
              <Command>
                <CommandInput placeholder="Buscar dependencia" />
                <CommandList>
                  <CommandEmpty>Ninguna dependencia encontrada.</CommandEmpty>
                  <CommandGroup>
                    {dependenciasList.map((dependencia) => (
                      <CommandItem
                        key={dependencia.id}
                        value={dependencia.nombreDependencia}
                        onSelect={() => {
                          setSelectedDependencia(dependencia);
                          setOpenDependencia(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedDependencia?.id === dependencia.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {dependencia.nombreDependencia}
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
          <label className="block text-gray-700 text-sm font-bold font-default mb-2">
            Cargo
          </label>
          <Popover open={openCargo} onOpenChange={setOpenCargo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCargo}
                className="w-full justify-between text-left font-normal"
              >
                {selectedCargo ? selectedCargo.nombreCargo : "-- Seleccionar cargo --"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
              <Command>
                <CommandInput placeholder="Buscar cargo" />
                <CommandList>
                  <CommandEmpty>Ningún cargo encontrado.</CommandEmpty>
                  <CommandGroup>
                    {cargosList.map((cargo) => (
                      <CommandItem
                        key={cargo.id}
                        value={cargo.nombreCargo}
                        onSelect={() => {
                          setSelectedCargo(cargo);
                          console.log(cargo)
                          setOpenCargo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCargo?.id === cargo.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {cargo.nombreCargo}
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
              <SelectValue placeholder="-- Seleccionar --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nuevo">NUEVO</SelectItem>
              <SelectItem value="reingreso">REINGRESO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between col-span-1 md:col-span-2"> {/* Columna que ocupa el ancho completo en pantallas pequeñas */}
          <Button
            className="bg-uac text-white font-mulish border border-uac hover:bg-white hover:text-black transition duration-300 rounded py-2 px-4"
            type="submit"
          >
            {isLoading ? <LoadingSpinner /> : "Agregar solicitud"}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default SolicitudesForm;