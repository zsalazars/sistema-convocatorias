import { useParams } from "react-router-dom";
import FileDropzone from "../components/FileDropzone";
import { useGetConvocatoriaById } from "../hooks/useGetConvocatoriaById";
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";

const PostulacionDetalle = () => {
  const { id } = useParams();
  const convocatoriaId = Number(id);

  const { data: convocatoria, isLoading, isError, error } = useGetConvocatoriaById({
    convocatoriaId: convocatoriaId!,
  });

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <div>
      <div className="flex flex-col container xl:w-1/3 mx-auto my-10 px-5">

        <h2 className="text-3xl font-gelion">{convocatoria?.solicitud.cargo.nombreCargo}</h2>
        <FileDropzone />

      </div>
    </div>
  )
}

export default PostulacionDetalle;