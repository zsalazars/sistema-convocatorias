import { Link } from "react-router-dom";
import ConvocatoriaCard from "@/shared/components/common/ConvocatoriaCard"
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { Convocatoria } from "@/interfaces/Convocatoria";
import { PlusCircle, Search } from "lucide-react";
import { useQuery } from '@tanstack/react-query'
import { getAllConvocatorias } from "@/modules/convocatoria/services/convocatoria.api";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

const ConvocatoriasList = () => {
  const { isLoading, data: convocatoriasList, error, isError } = useQuery<Convocatoria[]>({
    queryKey: ["convocatorias"],
    queryFn: getAllConvocatorias
  })

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  const handleViewConvocatoria = (id: number) => {
    console.log('Ver convocatoria:', id);
  };

  const handleEditConvocatoria = (id: number) => {
    console.log('Editar convocatoria:', id);
  };
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-gelion font-bold text-gray-900">Convocatorias</h2>
          <p className="text-gray-600 mt-2">Gestiona todas las convocatorias disponibles</p>
        </div>
        <Link to={"/convocatorias/nueva-convocatoria"}>
          <Button><PlusCircle className="mr-2 h-4 w-4" />Nueva convocatoria</Button>
        </Link>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="pl-10"
            placeholder="Buscar convocatorias..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {convocatoriasList?.map((convocatoria) => (
          <ConvocatoriaCard
            key={convocatoria.id}
            id={convocatoria.id}
            convocatoria={convocatoria}
            onView={handleViewConvocatoria}
            onEdit={handleEditConvocatoria}
          />
        ))}
      </div>
    </div>
  )
}

export default ConvocatoriasList;