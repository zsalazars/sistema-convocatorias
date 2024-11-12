

import { Convocatoria, Estado } from "@/interfaces/Convocatoria";

import { Calendar, FileText, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import Badge from "./Badge";
import { Link } from "react-router-dom";

interface ConvocatoriaCardProps {
  id: number
  convocatoria: Convocatoria;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
}

const ConvocatoriaCard = ({ convocatoria, onEdit }: ConvocatoriaCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">
            Convocatoria N° {convocatoria.numeroConvocatoria}
          </CardTitle>
          <Badge text={convocatoria.estado || "Pendiente"} color={convocatoria.estado === Estado.abierto ? "green" : "gray"} />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-5">{convocatoria.solicitud.nombreDocumento}</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="h-4 w-4 mr-2" />
            {convocatoria.solicitud.cargo.nombreCargo}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {convocatoria.solicitud.cargo.nombreCargo}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Publicación: {convocatoria.fechaPublicacion}
          </div>
        </div>

        <Link to={`/convocatorias/${convocatoria.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            Ver postulantes
          </Button>
        </Link>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(convocatoria.id)}
          >
            Ver detalles
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(convocatoria.id)}
          >
            Editar
          </Button>
        </div>
      </CardContent>
    </Card >
  );
}

export default ConvocatoriaCard;