import { useParams } from "react-router-dom";
import { Briefcase, CheckCircle, CircleX, GraduationCap, XCircle } from "lucide-react";
import { Postulacion } from "@/interfaces/Postulacion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostulacionById } from "@/modules/postulante/services/postulantes.api";
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { useEffect, useState } from "react";
import PDFViewer from "@/shared/components/common/PDFViewer";
import { Button } from "@/shared/components/ui/button";
import CalificacionHeader from "../components/CalificacionHeader";
import { CalificacionRequisitos, defaultCalificacionRequisitos } from "@/interfaces/CalificacionRequisitos";
import { toast } from "sonner";
import { updateCalificacionRequisitos } from "../services/calificacion-requisitos.api";

interface RequisitoItem {
  id: string;
  descripcion: string;
  cumple: boolean;
}

type RequisitoCardProps = {
  icon: React.ReactNode;
  title: string;
  requisitos: RequisitoItem[];
  onStatusChange: (id: string) => void;
};

const RequisitoCard = ({ icon, title, requisitos, onStatusChange }: RequisitoCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
    <div className="flex items-center space-x-2">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="space-y-2">
      {requisitos.map((requisito) => (
        <div key={requisito.id} className="flex items-center justify-between">
          <p className="text-sm text-gray-700">{requisito.descripcion}</p>
          <div className="flex gap-2">
            <Button
              onClick={() => onStatusChange(requisito.id)}
              variant={requisito.cumple ? "default" : "secondary"}
              className="flex items-center justify-between gap-2"
            >
              <span>Cumple</span>
              {requisito.cumple ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <CircleX className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CalificacionRequisitosPage = () => {
  const { id } = useParams();
  const postulacionId = Number(id);

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [observaciones, setObservaciones] = useState("");
  const [requisitosEstudio, setRequisitosEstudio] = useState<RequisitoItem[]>([]);
  const [requisitosExperiencia, setRequisitosExperiencia] = useState<RequisitoItem[]>([]);
  const [calificacion, setCalificacion] = useState<CalificacionRequisitos>(defaultCalificacionRequisitos);

  const { isLoading, data: postulacion, error, isError } = useQuery<Postulacion>({
    queryKey: ["postulacion", postulacionId],
    queryFn: () => getPostulacionById(postulacionId),
    enabled: !!postulacionId,
  });

  useEffect(() => {
    if (postulacion) {
      // Inicializar requisitos de estudio
      const estudios = postulacion.convocatoria.solicitud.cargo.requisitosEstudios?.map((req, index) => ({
        id: `estudio_${index}`,
        descripcion: req,
        cumple: false
      })) || [];
      
      // Inicializar requisitos de experiencia
      const experiencia = postulacion.convocatoria.solicitud.cargo.requisitosExperiencia?.map((req, index) => ({
        id: `experiencia_${index}`,
        descripcion: req,
        cumple: false
      })) || [];

      setRequisitosEstudio(estudios);
      setRequisitosExperiencia(experiencia);

      if (postulacion.calificacionRequisitos) {
        setCalificacion(postulacion.calificacionRequisitos);
        
        // Actualizar estado de los requisitos según la calificación existente
        const updatedEstudios = estudios.map(req => ({
          ...req,
          cumple: postulacion.calificacionRequisitos.requisitosEstudiosCumplidos.includes(req.descripcion)
        }));
        
        const updatedExperiencia = experiencia.map(req => ({
          ...req,
          cumple: postulacion.calificacionRequisitos.requisitosExperienciaCumplidos.includes(req.descripcion)
        }));

        setRequisitosEstudio(updatedEstudios);
        setRequisitosExperiencia(updatedExperiencia);
      }
    }
  }, [postulacion]);

  const mutation = useMutation({
    mutationFn: async () => {
      const requisitosEstudiosCumplidos = requisitosEstudio
        .filter(req => req.cumple)
        .map(req => req.descripcion);
      
      const requisitosEstudiosNoCumplidos = requisitosEstudio
        .filter(req => !req.cumple)
        .map(req => req.descripcion);
      
      const requisitosExperienciaCumplidos = requisitosExperiencia
        .filter(req => req.cumple)
        .map(req => req.descripcion);
      
      const requisitosExperienciaNoCumplidos = requisitosExperiencia
        .filter(req => !req.cumple)
        .map(req => req.descripcion);

      const dataToSubmit: CalificacionRequisitos = {
        ...calificacion,
        requisitosEstudiosCumplidos,
        requisitosEstudiosNoCumplidos,
        requisitosExperienciaCumplidos,
        requisitosExperienciaNoCumplidos,
        observaciones,
      };

      return updateCalificacionRequisitos(postulacionId, dataToSubmit);
    },
    onSuccess: () => {
      toast.success('Calificación guardada exitosamente');
    },
    onError: (error) => {
      toast.error('Error al guardar la calificación');
      console.error("Error al actualizar los datos:", error);
    },
  });

  const handleEstudioStatus = (id: string) => {
    setRequisitosEstudio(prevRequisitos => 
      prevRequisitos.map(req => 
        req.id === id ? { ...req, cumple: !req.cumple } : req
      )
    );
  };

  const handleExperienciaStatus = (id: string) => {
    setRequisitosExperiencia(prevRequisitos => 
      prevRequisitos.map(req => 
        req.id === id ? { ...req, cumple: !req.cumple } : req
      )
    );
  };

  const handleSubmit = () => {
    if (status === 'pending') {
      toast.error('Debe seleccionar un estado (Aprobado/Rechazado)');
      return;
    }
    mutation.mutate();
  };

  if (isLoading) return <LoadingSpinner size="w-12 h-12" />;
  if (isError) return <div>Error: {error instanceof Error ? error.message : "Algo salió mal"}</div>;
  if (!postulacion) return null;

  return (
    <div>
      <CalificacionHeader postulacion={postulacion} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-12 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Calificación de requisitos</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setStatus("approved")}
              variant={status === "approved" ? "default" : "secondary"}
              className={status === "approved" ? "bg-green-600" : ""}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobado
            </Button>
            <Button
              onClick={() => setStatus("rejected")}
              variant={status === "rejected" ? "destructive" : "secondary"}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Rechazado
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <RequisitoCard
            icon={<GraduationCap className="text-blue-600" />}
            title="Requisitos de Estudios"
            requisitos={requisitosEstudio}
            onStatusChange={handleEstudioStatus}
          />
          <RequisitoCard
            icon={<Briefcase className="text-blue-600" />}
            title="Requisitos de Experiencia"
            requisitos={requisitosExperiencia}
            onStatusChange={handleExperienciaStatus}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600">Observaciones</label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full p-2 border rounded-md resize-none"
            rows={4}
            placeholder="Ingrese sus observaciones aquí..."
          />
        </div>

        <Button
          className="my-5"
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </Button>

        <div className="space-y-10">
          <PDFViewer pdfName={postulacion.documentoRuta} />
        </div>
      </div>
    </div>
  );
};

export default CalificacionRequisitosPage;