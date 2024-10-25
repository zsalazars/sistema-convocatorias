import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building2, Plus, Pencil } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dependencia } from '@/interfaces/model/Dependencia';
import { createDependencia, getAllDependencias, updateDependencia } from '@/services/api/dependencia.api';

const DependenciaPage = () => {
  const [dependenciasList, setDependenciasList] = useState<Dependencia[]>([]);
  const [dependencia, setDependencia] = useState<Dependencia | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Dependencia>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: Dependencia) => {
    if (dependencia) {
      handleUpdateDependencia(dependencia.id, data);
    } else {
      handleCreateDependencia(data.nombreDependencia);
    }
  };

  const handleCreateDependencia = async (nombreDependencia: string) => {
    setIsLoading(true);

    try {
      await createDependencia({ nombreDependencia });
      toast.success('Dependencia creada exitosamente.');
      fetchDependencias();
      reset();
      setIsDialogOpen(false);
    } catch {
      setIsLoading(false);
      toast.error('Error al crear la dependencia.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDependencia = async (id: number, dependencia: Dependencia) => {
    setIsLoading(true);
    try {
      await updateDependencia(id, dependencia);
      toast.success('Dependencia actualizada exitosamente.');
      fetchDependencias();
      setDependencia(null);
      reset();
      setIsDialogOpen(false);
    } catch {
      setIsLoading(false);
      toast.error('Error al actualizar la dependencia.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDependencias = async () => {
    setIsLoading(true);
    try {
      const res = await getAllDependencias();
      setDependenciasList(res);
    } catch {
      setIsLoading(false);
      toast.error('Error al cargar las dependencias.');
    } finally {
      setIsLoading(false);
    }
  };

  const openUpdateDependencia = (dependencia: Dependencia) => {
    setDependencia(dependencia);
    setValue('nombreDependencia', dependencia.nombreDependencia);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchDependencias();
  }, []);

  return (
    <>
      <Card className="w-1/2 mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-gelion flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Gestión de dependencias
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setDependencia(null);
                    reset();
                  }}
                  className="flex items-center bg-uac text-white font-mulish border border-uac hover:bg-white hover:text-black transition-all duration-300 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Nueva dependencia
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {dependencia ? 'Editar dependencia' : 'Agregar nueva dependencia'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <input
                      {...register('nombreDependencia', { required: 'El nombre de la dependencia es obligatorio.' })}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nombreDependencia ? 'border-red-500' : ''
                        }`}
                      placeholder="Ingrese el nombre de la dependencia"
                    />
                    {errors.nombreDependencia && (
                      <p className="text-red-500 text-xs italic">
                        {errors.nombreDependencia.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-uac text-white font-mulish border border-uac hover:bg-white hover:text-black transition-all duration-300"
                    disabled={isLoading}
                  >
                    {dependencia ? 'Actualizar' : 'Agregar'} dependencia
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Denominación</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dependenciasList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    Ninguna dependencia encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                dependenciasList.map((dependencia) => (
                  <TableRow key={dependencia.id}>
                    <TableCell>{dependencia.nombreDependencia}</TableCell>
                    <TableCell className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openUpdateDependencia(dependencia)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Toaster richColors position="bottom-right" />
    </>
  );
};

export default DependenciaPage;
