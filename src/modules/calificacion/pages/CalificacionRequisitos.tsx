  import { useParams } from "react-router-dom";
  import { Briefcase, CheckCircle, GraduationCap, XCircle } from "lucide-react";
  import { Postulacion } from "@/interfaces/Postulacion";
  import { useQuery } from "@tanstack/react-query";
  import { getPostulacionById } from "@/modules/postulante/services/postulantes.api";
  import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
  import { useState } from "react";
  import PDFViewer from "@/shared/components/common/PDFViewer";
  import { Button } from "@/shared/components/ui/button";
  import CalificacionHeader from "../components/CalificacionHeader";

  const CalificacionRequisitosPage = () => {
    const { id } = useParams();
    const postulacionId = Number(id);

    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const [requisitosEstudiosCumplidos, setRequisitosEstudiosCumplidos] = useState<string[]>([]);
    const [requisitosEstudiosNoCumplidos, setRequisitosEstudiosNoCumplidos] = useState<string[]>([]);
    const [requisitosExperienciaCumplidos, setRequisitosExperienciaCumplidos] = useState<string[]>([]);
    const [requisitosExperienciaNoCumplidos, setRequisitosExperienciaNoCumplidos] = useState<string[]>([]);

    const { isLoading, data: postulacion, error, isError } = useQuery<Postulacion>({
      queryKey: ["postulacion", postulacionId],
      queryFn: () => getPostulacionById(postulacionId),
      enabled: !!postulacionId,
    });

    if (isLoading) {
      return <LoadingSpinner size="w-12 h-12" />;
    }

    if (isError) {
      return <div>Error: {error instanceof Error ? error.message : "Algo salió mal"}</div>;
    }

    const toggleRequisito = (
      requisito: string,
      cumplido: boolean,
      cumplidosList: string[],
      noCumplidosList: string[],
      setCumplidos: React.Dispatch<React.SetStateAction<string[]>>,
      setNoCumplidos: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      if (cumplido) {
        setCumplidos([...cumplidosList, requisito]);
        setNoCumplidos(noCumplidosList.filter((item) => item !== requisito));
      } else {
        setNoCumplidos([...noCumplidosList, requisito]);
        setCumplidos(cumplidosList.filter((item) => item !== requisito));
      }
    };

    return (
      <div>
        <CalificacionHeader postulacion={postulacion} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Calificación de requisitos</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setStatus("approved")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${status === "approved" ? "bg-green-600 text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-700"}`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Aprobado</span>
              </button>
              <button
                onClick={() => setStatus("rejected")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${status === "rejected" ? "bg-red-600 text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-700"}`}
              >
                <XCircle className="w-4 h-4" />
                <span>Rechazado</span>
              </button>
              <Button className="h-full">Siguiente</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            {/* Requisitos de Estudios */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="text-blue-600" />
                <h3 className="text-xl font-semibold">Requisitos de Estudios</h3>
              </div>
              <div className="space-y-2">
                {postulacion?.convocatoria.solicitud.cargo.requisitosEstudios?.map((requisito, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{requisito}</p>
                    <div className="flex gap-2">
                      <button
                        className={`px-2 py-1 text-sm rounded ${requisitosEstudiosCumplidos.includes(requisito) ? "bg-green-500 text-white" : "bg-gray-300"}`}
                        onClick={() =>
                          toggleRequisito(
                            requisito,
                            true,
                            requisitosEstudiosCumplidos,
                            requisitosEstudiosNoCumplidos,
                            setRequisitosEstudiosCumplidos,
                            setRequisitosEstudiosNoCumplidos
                          )
                        }
                      >
                        Cumplido
                      </button>
                      <button
                        className={`px-2 py-1 text-sm rounded ${requisitosEstudiosNoCumplidos.includes(requisito) ? "bg-red-500 text-white" : "bg-gray-300"}`}
                        onClick={() =>
                          toggleRequisito(
                            requisito,
                            false,
                            requisitosEstudiosCumplidos,
                            requisitosEstudiosNoCumplidos,
                            setRequisitosEstudiosCumplidos,
                            setRequisitosEstudiosNoCumplidos
                          )
                        }
                      >
                        No Cumplido
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Requisitos de Experiencia */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="text-blue-600" />
                <h3 className="text-xl font-semibold">Requisitos de Experiencia</h3>
              </div>
              <div className="space-y-2">
                {postulacion?.convocatoria.solicitud.cargo.requisitosExperiencia?.map((requisito, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{requisito}</p>
                    <div className="flex gap-2">
                      <button
                        className={`px-2 py-1 text-sm rounded ${requisitosExperienciaCumplidos.includes(requisito) ? "bg-green-500 text-white" : "bg-gray-300"}`}
                        onClick={() =>
                          toggleRequisito(
                            requisito,
                            true,
                            requisitosExperienciaCumplidos,
                            requisitosExperienciaNoCumplidos,
                            setRequisitosExperienciaCumplidos,
                            setRequisitosExperienciaNoCumplidos
                          )
                        }
                      >
                        Cumplido
                      </button>
                      <button
                        className={`px-2 py-1 text-sm rounded ${requisitosExperienciaNoCumplidos.includes(requisito) ? "bg-red-500 text-white" : "bg-gray-300"}`}
                        onClick={() =>
                          toggleRequisito(
                            requisito,
                            false,
                            requisitosExperienciaCumplidos,
                            requisitosExperienciaNoCumplidos,
                            setRequisitosExperienciaCumplidos,
                            setRequisitosExperienciaNoCumplidos
                          )
                        }
                      >
                        No Cumplido
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <PDFViewer pdfName={postulacion?.documentoRuta as string} />
          </div>
        </div>
      </div>
    );
  };

  export default CalificacionRequisitosPage;
