import Badge from "@/shared/components/common/Badge";
import { Separator } from "@/shared/components/ui/separator";
import { Link } from "react-router-dom";

interface PostulacionCardProps {
  title: string,
  tipoConvocatoria: string,
  tipoRegion: string,
  fechaPublicacion: string,
  fechaEnvioDocumentos: string
  to: string
}

const PostulacionCard = ({
  title,
  tipoConvocatoria,
  tipoRegion,
  fechaPublicacion,
  fechaEnvioDocumentos,
  to
}: PostulacionCardProps) => {
  return (
    <Link to={to} className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition space-y-2  p-6">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl text-gray-800 font-bold">{title}</h3>
        <div className="flex flex-row space-x-2">
          <Badge text={tipoConvocatoria} color="green" />
          <Badge text={tipoRegion} color="blue" />
        </div>
      </div>

      <Separator />

      <div className="flex flex-row justify-between">
        <span>Fecha publicación:</span>
        <span className="font-semibold">{fechaPublicacion}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span>Fecha límite:</span>
        <span className="font-semibold">{fechaEnvioDocumentos}</span>
      </div>
    </Link>
  )
}

export default PostulacionCard;