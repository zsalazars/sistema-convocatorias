import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'
import { Button } from "@/shared/components/ui/button";
import { CargoForm } from '@/interfaces/Cargo';
import { createCargo } from '@/modules/cargo/services/cargo.api';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const CargosForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga de datos

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CargoForm>();

  const onSubmit = async (data: CargoForm) => {
    setIsLoading(true)
    try {
      await createCargo(data)
      reset();
      toast.success('Cargo creado exitosamente.');
    } catch {
      toast.error("Algo sucedió mal, vuelva a intentarlo.");
      setIsLoading(false);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-gelion font-semibold mb-6">
          Agregar nuevo cargo
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold font-default mb-2"
              htmlFor="nombre_cargo"
            >
              Denominación del cargo
            </label>
            <input
              {...register("nombreCargo", {
                required: "Este campo es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre del cargo debe tener al menos 3 caracteres"
                }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nombreCargo ? 'border-red-500' : ''
                }`}
              id="nombre_cargo"
              type="text"
              placeholder="Ej: Técnico Administrativo"
            />
            {errors.nombreCargo && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.nombreCargo.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold font-default mb-2"
              htmlFor="requisitos_estudios"
            >
              Requisitos de educación
            </label>
            <textarea
              {...register("requisitosEstudios")}
              className="shadow appearance-none border rounded w-full text-gray-700 resize-none leading-tight focus:outline-none focus:shadow-outline mb-3 py-2 px-3"
              id="requisitos_estudios"
              placeholder="Describir los requisitos de educación en el cargo"
              rows={5}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold font-default mb-2"
              htmlFor="requisitos_experiencia"
            >
              Requisitos de experiencia
            </label>
            <textarea
              {...register("requisitosExperiencia")}
              className="shadow appearance-none border rounded w-full text-gray-700 resize-none leading-tight focus:outline-none focus:shadow-outline mb-3 py-2 px-3"
              id="requisitos_experiencia"
              placeholder="Describir los requisitos de experiencia en el cargo"
              rows={5}
            />
          </div>

          <div className="flex items-center justify-between col-span-1 md:col-span-2">
            <Button
              className="bg-uac text-white hover:bg-blue-900 transition duration-300 font-bold rounded focus:outline-none focus:shadow-outline py-2 px-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Agregar cargo"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CargosForm;