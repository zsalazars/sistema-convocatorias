import { getAllPostulacion } from '@/modules/postulante/services/postulantes.api';
import DataTable from './PostulantesTable';
import { columns } from '../utils/Columns';
import { Postulacion } from '@/interfaces/Postulacion';
import { useQuery } from '@tanstack/react-query'

const PostulantesList = () => {
  const { isLoading, data: postulacionList = [], error, isError } = useQuery<Postulacion[]>({
    queryKey: ["postulacion"],
    queryFn: getAllPostulacion
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
        <DataTable columns={columns} data={postulacionList} />
      </div>
    </div>
  );
};

export default PostulantesList;
