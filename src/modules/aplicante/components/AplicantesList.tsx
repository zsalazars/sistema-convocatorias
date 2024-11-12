import { getAllAplicantes } from '@/modules/aplicante/services/aplicantes.api';
import { DataTable } from './AplicantesTable';
import { columns } from '../utils/Columns';
import { Aplicante } from '@/interfaces/Aplicante';
import { useQuery } from '@tanstack/react-query'

const AplicantesList = () => {
  const { isLoading, data: aplicantesList = [], error, isError } = useQuery<Aplicante[]>({
    queryKey: ["aplicantes"],
    queryFn: getAllAplicantes
  })

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Ver postulantes</h2>
      </div>
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={aplicantesList} />
      </div>
    </div>
  );
};

export default AplicantesList;
