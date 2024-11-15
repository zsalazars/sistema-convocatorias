import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { useGetConvocatorias } from "../hooks/useConvocatoria";
import PostulacionCard from "../components/PostulacionCard";

const PostulacionesList = () => {
  const { data: convocatoriasList, isLoading, isError, error } = useGetConvocatorias()

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {
        convocatoriasList?.map((convocatoria) => (
          <PostulacionCard
            title={convocatoria.solicitud.cargo.nombreCargo}
            tipoConvocatoria={convocatoria.tipoConvocatoria}
            tipoRegion={convocatoria.tipoRegion}
            fechaPublicacion={convocatoria.fechaPublicacion}
            fechaEnvioDocumentos={convocatoria.fechaEnvioDocumentos}
            to={`postulaciones/${convocatoria.id}`}
          />
        ))
      }

    </div>
  )
}

export default PostulacionesList;