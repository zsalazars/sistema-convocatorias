import { useParams } from 'react-router-dom';

import { Aplicante } from '@/interfaces/model/Aplicante';
import { getAplicantesByConvocatoriaId } from '@/services/api/convocatoria.api';
import { useQuery } from '@tanstack/react-query'
import { columns } from './Columns';
import { DataTable } from '@/pages/aplicantes/AplicantesTable';

const ConvocatoriasAplicantes = () => {
  const { id } = useParams();
  const convocatoriaId = Number(id);

  const { isLoading, data: aplicantesList = [], error, isError } = useQuery<Aplicante[]>({
    queryKey: ["aplicantes", convocatoriaId],
    queryFn: () => getAplicantesByConvocatoriaId(convocatoriaId),
    enabled: !!convocatoriaId
  })

  if (isLoading) {
    return <div>Loading...</div>;
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
  )
}

export default ConvocatoriasAplicantes;