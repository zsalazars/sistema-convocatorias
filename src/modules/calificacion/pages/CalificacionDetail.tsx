import { useParams } from "react-router-dom";
import { Postulacion } from "@/interfaces/Postulacion";
import { useQuery } from "@tanstack/react-query";
import { getPostulacionById } from "@/modules/postulante/services/postulantes.api";
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { Link } from "react-router-dom";
import CalificacionHeader from "../components/CalificacionHeader";

const CalificacionDetail = () => {
  const { id } = useParams();
  const postulacionId = Number(id);

  const { isLoading, data: postulacion, error, isError } = useQuery<Postulacion>({
    queryKey: ["postulacion", postulacionId],
    queryFn: () => getPostulacionById(postulacionId),
    enabled: !!postulacionId

  })

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <div>
      <CalificacionHeader postulacion={postulacion} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-12 p-10">
        <h2 className="text-2xl font-semibold mb-5">Calificaciones pendientes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col">
                <span className="text-uac font-semibold">Calificación de Documentos</span>
                <p className="text-sm text-gray-500">Revisa la calificación de los documentos del postulante.</p>
              </div>
              <Link to={`/calificaciones/documentos/${postulacion?.id}`} className="text-blue-600 hover:underline my-auto">
                Revisar
              </Link>
            </div>

            <div className="flex flex-col">
              {postulacion?.calificacionDocumentos && (
                <div className="space-y-2 mt-4">
                  {Object.entries(postulacion?.calificacionDocumentos)
                    .filter(entry => typeof entry[1] === 'boolean')  // Filtramos solo las propiedades booleanas
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                        <span className={value ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                          {value ? "Cumple" : "No cumple"}
                        </span>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>

          <div className="w-full items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col">
                <span className="text-uac font-semibold">Calificacion de Requisitos</span>
                <p className="text-sm text-gray-500">Revisa la calificación de los requisitos del postulante.</p>
              </div>
              <Link to={`/calificaciones/requisitos/${postulacion?.id}`} className="text-blue-600 hover:underline my-auto">
                Revisar
              </Link>
            </div>

            <div className="flex flex-col">
              {postulacion?.calificacionRequisitos && (
                <div className="space-y-4 mt-4">
                  {/* Sección de Estudios */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Estudios</h3>
                    <div className="space-y-2 mt-2">
                      {postulacion?.calificacionRequisitos.requisitosEstudiosCumplidos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Cumplidos</h4>
                          <ul className="list-disc pl-5">
                            {postulacion.calificacionRequisitos.requisitosEstudiosCumplidos.map((requisito, index) => (
                              <li key={index} className="text-green-600">{requisito} - Cumplido</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {postulacion?.calificacionRequisitos.requisitosEstudiosNoCumplidos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">No cumplidos</h4>
                          <ul className="list-disc pl-5">
                            {postulacion.calificacionRequisitos.requisitosEstudiosNoCumplidos.map((requisito, index) => (
                              <li key={index} className="text-red-600">{requisito} - No cumple</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sección de Experiencia */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Experiencia</h3>
                    <div className="space-y-2 mt-2">
                      {postulacion?.calificacionRequisitos.requisitosExperienciaCumplidos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Cumplidos</h4>
                          <ul className="list-disc pl-5">
                            {postulacion.calificacionRequisitos.requisitosExperienciaCumplidos.map((requisito, index) => (
                              <li key={index} className="text-green-600">{requisito} - Cumplido</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {postulacion?.calificacionRequisitos.requisitosExperienciaNoCumplidos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">No cumplidos</h4>
                          <ul className="list-disc pl-5">
                            {postulacion.calificacionRequisitos.requisitosExperienciaNoCumplidos.map((requisito, index) => (
                              <li key={index} className="text-red-600">{requisito} - No cumple</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Observaciones */}
                  {postulacion?.calificacionRequisitos.observaciones && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-600">Observaciones</h4>
                      <p className="text-gray-700">{postulacion.calificacionRequisitos.observaciones}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default CalificacionDetail;