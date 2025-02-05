import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/libs/utils';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { getAllCargos } from '@/modules/cargo/services/cargo.api';
import { Cargo } from '@/interfaces/Cargo';
import { getAllDependencias } from '@/modules/dependencia/services/dependencia.api';
import { Dependencia } from '@/interfaces/Dependencia';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';
import { SolicitudForm } from '@/interfaces/Solicitud';
import { createSolicitud } from '@/modules/solicitud/services/solicitud.api';
import { toast, Toaster } from 'sonner';

const SolicitudesForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch
  } = useForm<SolicitudForm>();

  const [dependenciasList, setDependenciasList] = useState<Dependencia[]>([]);
  const [cargosList, setCargosList] = useState<Cargo[]>([]);
  const [openDependencia, setOpenDependencia] = useState(false);
  const [openCargo, setOpenCargo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDependencias = async () => {
    setIsLoading(true);
    try {
      const res = await getAllDependencias();
      setDependenciasList(res);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCargos = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCargos();
      setCargosList(res);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: SolicitudForm) => {
    setIsLoading(true);

    // Formatear la fecha antes de enviar los datos
    const formattedData = {
      ...data,
      fechaSolicitud: data.fechaSolicitud
        ? format(new Date(data.fechaSolicitud), 'dd-MM-yyyy', { locale: es })
        : '',
      estado: 'NUEVO'
    };

    try {
      await createSolicitud(formattedData);
      reset();
      toast.success('Solicitud creada exitosamente.');
    } catch {
      toast.error("Algo sucedió mal, vuelva a intentarlo.");
    } finally {
      setIsLoading(false);
    }
  };


  const selectedDependencia = watch("dependencia");
  const selectedCargo = watch("cargo");

  useEffect(() => {
    fetchDependencias();
    fetchCargos();
  }, []);

  return (
    <>
      <div className="px-4 py-4 mb-2 bg-white rounded shadow-md md:px-8">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 font-gelion">Nueva solicitud</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Documento */}
          <div className="col-span-1 mb-5 md:col-span-2">
            <label className="block mb-2 text-sm font-bold text-gray-700 font-default" htmlFor="nombreDocumento">
              Documento
            </label>
            <input
              {...register("nombreDocumento", { required: true })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="nombreDocumento"
              type="text"
              placeholder="Ej: OFICIO N° xxx-20xx-UNIDAD-UAC"
            />
          </div>

          {/* Cargo */}
          <div className="col-span-1 mb-5 md:col-span-2">
            <label className="block mb-2 text-sm font-bold text-gray-700 font-default">
              Cargo
            </label>
            <Popover open={openCargo} onOpenChange={setOpenCargo}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCargo}
                  className="justify-between w-full font-normal text-left"
                >
                  {selectedCargo ? selectedCargo.nombreCargo : "-- Seleccionar cargo --"}
                  <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[700px] p-0">
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
                            setValue("cargo", cargo);
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

          {/* Proveido */}
          <div className="col-span-1 mb-5 md:col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700 font-default" htmlFor="proveido">
              Proveido
            </label>
            <input
              {...register("proveido", { required: true })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="proveido"
              type="text"
            />
          </div>

          {/* Dependencia */}
          <div className="col-span-1 mb-5 md:col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700 font-default">
              Dependencia
            </label>
            <Popover open={openDependencia} onOpenChange={setOpenDependencia}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDependencia}
                  className="justify-between w-full font-normal text-left"
                >
                  {selectedDependencia ? selectedDependencia.nombreDependencia : "-- Seleccionar dependencia --"}
                  <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
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
                            setValue("dependencia", dependencia);
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

          {/* Fecha */}
          <div className="col-span-1 mb-5 md:col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700 font-default">
              Fecha
            </label>
            <Controller
              name="fechaSolicitud"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      <CalendarIcon />
                      {field.value ? format(new Date(field.value), "PPP", { locale: es }) : <span>Elegir fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => field.onChange(date)} initialFocus locale={es} />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end w-full col-span-1 my-auto md:col-span-1">
            <Button className="w-full mt-auto" type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
      <Toaster richColors position="bottom-right" />
    </>
  );
};

export default SolicitudesForm;
