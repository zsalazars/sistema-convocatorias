import React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form';

import { Solicitud } from '@/interfaces/model/Solicitud';
import { ConvocatoriaForm, TipoConvocatoria, TipoRegion } from '@/interfaces/model/Convocatoria';
import { getAllSolicitudes } from '@/services/api/solicitud.api';
import DatePicker from '../../components/shared/DatePicker';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

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
import DatePickerWithRange from '../../components/shared/DatePickerWithRange';
import { formatDate } from '@/libs/formatter';
import { createConvocatoria } from '@/services/api/convocatoria.api';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ConvocatoriasForm: React.FC = () => {

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<ConvocatoriaForm>();

  const [open, setOpen] = React.useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = React.useState("")

  const { isLoading, data: solicitudesList, error, isError } = useQuery<Solicitud[]>({
    queryKey: ["solicitudes"],
    queryFn: getAllSolicitudes
  })

  const addConvocatoriaMutation = useMutation({
    mutationFn: createConvocatoria,
    onSuccess: () => {
      toast.success('Convocatoria creada exitosamente.');
      reset();
    },
    onError: () => {
      toast.error("Algo sucedió mal, vuelva a intentarlo.");
    }
  })

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }


  const onSubmit: SubmitHandler<ConvocatoriaForm> = (data) => {
    const formattedData = format(new Date(data.solicitud.fechaSolicitud), 'dd-MM-yyyy', { locale: es });
    setValue("solicitud.fechaSolicitud", formattedData)
    addConvocatoriaMutation.mutate(data);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Nueva convocatoria</h2>
          <p className="text-gray-600 mt-2">Crea nuevas convocatorias</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-4">
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
                {selectedSolicitud
                  ? solicitudesList?.find((solicitud) => solicitud.nombreDocumento === selectedSolicitud)?.nombreDocumento
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
                    {solicitudesList?.map((solicitud) => (
                      <CommandItem
                        key={solicitud.id}
                        value={solicitud.nombreDocumento}
                        onSelect={(currentValue) => {
                          setSelectedSolicitud(currentValue === selectedSolicitud ? "" : currentValue)
                          setValue("solicitud", solicitud)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSolicitud === solicitud.nombreDocumento ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {solicitud.nombreDocumento}
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
          <Select onValueChange={(value) => {
            setValue("tipoConvocatoria", value as TipoConvocatoria)
          }}>
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
          <Select onValueChange={(value) => {
            setValue("tipoRegion", value as TipoRegion)
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Seleccionar --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="REGIONAL">REGIONAL</SelectItem>
              <SelectItem value="NACIONAL">NACIONAL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-12 mb-5">
          <Separator />
        </div>

        <div className="col-span-1 md:col-span-12">
          <h3 className="text-xl font-semibold font-gelion">Fechas de la convocatoria</h3>
        </div>

        <div className="col-span-1 md:col-span-6 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaPublicacion">
            Publicación de la convocatoria
          </label>
          <DatePickerWithRange onDateChange={(range) => {
            const formattedFrom = range?.from ? formatDate(range?.from) : null;
            const formattedTo = range?.to ? formatDate(range?.to) : null;

            setValue("fechaPublicacion", formattedFrom as string + ' - ' + formattedTo as string)
          }} />
        </div>

        <div className="col-span-1 md:col-span-6 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaEnvioDocumentos">
            Presentación de documentos
          </label>
          <DatePickerWithRange onDateChange={(range) => {
            const formattedFrom = range?.from ? formatDate(range?.from) : null;
            const formattedTo = range?.to ? formatDate(range?.to) : null;

            setValue("fechaEnvioDocumentos", formattedFrom as string + ' - ' + formattedTo as string)
          }} />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaCalificacionDocumentos">
            Calificación de documentos
          </label>
          <DatePicker
            onDateSelect={(date) => {
              setValue("fechaCalificacionDocumentos", formatDate(date) || '');
            }}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaPublicacionAptos">
            Publicación de aptos
          </label>
          <DatePicker
            onDateSelect={(date) => {
              setValue("fechaPublicacionAptos", formatDate(date) || '')
            }}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaHorariosEntrevistas">
            Publicación de horarios de entrevista
          </label>
          <DatePicker
            onDateSelect={(date) => {
              setValue("fechaHorariosEntrevistas", formatDate(date) || '')
            }}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaEntrevistaPersonal">
            Entrevista personal
          </label>
          <DatePicker
            onDateSelect={(date) => {
              setValue("fechaEntrevistaPersonal", formatDate(date) || '')
            }}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaPublicacionResultados">
            Publicación de resultados
          </label>
          <DatePicker
            onDateSelect={(date) => {
              setValue("fechaPublicacionResultados", formatDate(date) || '')
            }}
          />
        </div>

        <div className="col-span-1 md:col-span-3 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="fechaInicioFunciones">
            Inicio de funciones
          </label>
          <DatePicker
            onDateSelect={(date) => {
              setValue("fechaInicioFunciones", formatDate(date) || '')
            }}
          />
        </div>

        <div className="flex items-center justify-between col-span-1 md:col-span-2">
          <Button
            className="bg-uac text-white font-bold hover:bg-blue-900 transition duration-300 rounded focus:outline-none focus:shadow-outline py-2 px-4"
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