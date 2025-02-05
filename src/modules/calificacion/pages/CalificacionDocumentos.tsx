import { useParams } from "react-router-dom";
import { CheckCircle, CircleX, ExternalLink, XCircle } from "lucide-react";
import { Postulacion } from "@/interfaces/Postulacion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostulacionById } from "@/modules/postulante/services/postulantes.api";
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { useEffect, useState } from "react";
import PDFViewer from "@/shared/components/common/PDFViewer";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import CalificacionHeader from "../components/CalificacionHeader";
import { updateCalificacionDocumentos } from "../services/calificacion-documentos.api";
import { toast } from "sonner";


const CalificacionDocumentosPage = () => {
  const { id } = useParams();
  const postulacionId = Number(id);

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const { isLoading, data: postulacion, error, isError } = useQuery<Postulacion>({
    queryKey: ["postulacion", postulacionId],
    queryFn: () => getPostulacionById(postulacionId),
    enabled: !!postulacionId
  })

  const [formData, setFormData] = useState({
    datosGenerales: false,
    titulosCertificados: false,
    reporteSunedu: false,
    cursosEspecializacion: false,
    experienciaLaboral: false,
    declaracionJuradaHorario: false,
    declaracionJuradaParentesco: false,
    declaracionJuradaAntecedentes: false,
    certiadulto: false,
    carnetVacunacion: false,
    voucherPago: false,
    observaciones: ''
  });

  useEffect(() => {
    if (postulacion) {
      setFormData(postulacion.calificacionDocumentos);
    }
  }, [postulacion]);

  const mutation = useMutation({
    mutationFn: (updatedData: typeof formData) => updateCalificacionDocumentos(postulacionId, updatedData),
    onSuccess: () => {
      toast.success('Convocatoria creada exitosamente.');
    },
    onError: (error) => {
      console.error("Error al actualizar los datos:", error);
    },
  });

  const handleDocumentStatus = (field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const getButtonStyle = (field: keyof typeof formData) => {
    return formData[field]
      ? 'bg-green-600 hover:bg-green-500 text-white'
      : 'bg-red-200 hover:bg-red-300 text-red-700';
  };

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

  return (
    <div>
      <CalificacionHeader postulacion={postulacion} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-row space-x-5">
            <h2 className="text-2xl font-semibold text-gray-900 my-auto">Calificación de documento</h2>
            <a
              href={`http://localhost:8080/media/${postulacion?.documentoRuta}`}
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
          </div>
        </div>

        <div className="space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleDocumentStatus('datosGenerales')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('datosGenerales')}`}
            >
              <span>Datos Generales</span>
              {formData.datosGenerales ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('titulosCertificados')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('titulosCertificados')}`}
            >
              <span>Títulos Certificados</span>
              {formData.titulosCertificados ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('reporteSunedu')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('reporteSunedu')}`}
            >
              <span>Reporte SUNEDU</span>
              {formData.reporteSunedu ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('cursosEspecializacion')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('cursosEspecializacion')}`}
            >
              <span>Cursos de Especialización</span>
              {formData.cursosEspecializacion ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('experienciaLaboral')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('experienciaLaboral')}`}
            >
              <span>Experiencia Laboral</span>
              {formData.experienciaLaboral ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('declaracionJuradaHorario')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('declaracionJuradaHorario')}`}
            >
              <span>Declaración Jurada de Horario</span>
              {formData.declaracionJuradaHorario ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('declaracionJuradaParentesco')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('declaracionJuradaParentesco')}`}
            >
              <span>Declaración Jurada de Parentesco</span>
              {formData.declaracionJuradaParentesco ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('declaracionJuradaAntecedentes')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('declaracionJuradaAntecedentes')}`}
            >
              <span>Declaración Jurada de Antecedentes</span>
              {formData.declaracionJuradaAntecedentes ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('certiadulto')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('certiadulto')}`}
            >
              <span>Certificado Adulto</span>
              {formData.certiadulto ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('carnetVacunacion')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('carnetVacunacion')}`}
            >
              <span>Carnet de Vacunación</span>
              {formData.carnetVacunacion ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => handleDocumentStatus('voucherPago')}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${getButtonStyle('voucherPago')}`}
            >
              <span>Voucher de Pago</span>
              {formData.voucherPago ? <CheckCircle className="w-5 h-5" /> : <CircleX className="w-5 h-5" />}
            </Button>
            <button
              onClick={() => mutation.mutate(formData)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Guardar
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600">Observaciones</label>
            <textarea
              name="observaciones"
              className="w-full p-2 border rounded-md resize-none"
              rows={4}
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
            ></textarea>
          </div>

          <PDFViewer pdfName={postulacion?.documentoRuta as string} />

          <Button>
            <Link to={`/calificaciones/requisitos/${id}`}>
              Siguiente
            </Link>
          </Button>
        </div>
      </div>

    </div>
  )
}

export default CalificacionDocumentosPage;