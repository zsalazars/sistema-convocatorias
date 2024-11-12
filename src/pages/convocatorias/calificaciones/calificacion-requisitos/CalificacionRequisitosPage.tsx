import { useParams } from "react-router-dom";
import { Briefcase, Calendar, CheckCircle, ExternalLink, GraduationCap, Mail, Phone, XCircle } from "lucide-react";
import { Aplicante } from "@/interfaces/model/Aplicante";
import { useQuery } from "@tanstack/react-query";
import { getAplicanteById } from "@/services/api/aplicantes.api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useState } from "react";
import PDFViewer from "../../../../components/shared/PDFViewer";
import { Button } from "@/components/ui/button";

const CalificacionRequisitosPage = () => {
  const { id } = useParams();
  const aplicanteId = Number(id);

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const { isLoading, data: aplicante, error, isError } = useQuery<Aplicante>({
    queryKey: ["aplicantes", aplicanteId],
    queryFn: () => getAplicanteById(aplicanteId),
    enabled: !!aplicanteId

  })

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  const getStatusColor = (buttonStatus: typeof status) => {
    if (status === buttonStatus) {
      switch (buttonStatus) {
        case 'approved': return 'bg-green-600 text-white';
        case 'rejected': return 'bg-red-600 text-white';
        default: return 'bg-yellow-600 text-white';
      }
    }
    return 'bg-gray-50 hover:bg-gray-100 text-gray-700';
  };

  const requisitosEstudiosArray = aplicante?.convocatoria.solicitud.cargo.requisitosEstudios.split("\n");
  const requisitosExperienciaArray = aplicante?.convocatoria.solicitud.cargo.requisitosExperiencia.split("\n");

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-uac text-white p-6">
          <h1 className="text-2xl font-bold mb-1">{aplicante?.nombres} {aplicante?.apellidoPaterno} {aplicante?.apellidoMaterno}</h1>
          <div className="flex items-center gap-2 text-blue-100">
            <Briefcase className="w-4 h-4" />
            <span>{aplicante?.convocatoria?.solicitud?.cargo?.nombreCargo}</span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Correo Electrónico</p>
              <a href={`mailto:${aplicante?.correoElectronico}`} className="hover:text-blue-600">
                {aplicante?.correoElectronico}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Número celular</p>
              <span>{aplicante?.numeroCelular}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de postulación</p>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-row space-x-5">
            <h2 className="text-2xl font-semibold text-gray-900 my-auto">Calificación de requisitos</h2>
            <a
              href={`http://localhost:8080/media/${aplicante?.documentoRuta}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white bg-uac rounded-lg hover:bg-uac-alter transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2">
              <ExternalLink />
            </a>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatus('approved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getStatusColor('approved')}`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Aprobado</span>
            </button>
            <button
              onClick={() => setStatus('rejected')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getStatusColor('rejected')}`}
            >
              <XCircle className="w-4 h-4" />
              <span>Rechazado</span>
            </button>
            <Button className="h-full">
              Siguiente
            </Button>
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
              {requisitosEstudiosArray?.map((line, index) => (
                <p key={index} className="text-sm text-gray-700">{line}</p>
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
              {requisitosExperienciaArray?.map((line, index) => (
                <p key={index} className="text-sm text-gray-700">{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <PDFViewer pdfName={aplicante?.documentoRuta as string} />
        </div>
      </div>
    </div>
  )
}

export default CalificacionRequisitosPage;