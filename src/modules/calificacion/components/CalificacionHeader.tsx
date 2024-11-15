import { Postulacion } from "@/interfaces/Postulacion"
import { Briefcase, Calendar, Mail, Phone } from "lucide-react"

interface CalificacionHeaderProps {
  postulacion?: Postulacion | null
}

const CalificacionHeader = ({ postulacion }: CalificacionHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 bg-uac text-white p-6">
        <h1 className="text-2xl font-bold mb-1">{postulacion?.nombres} {postulacion?.apellidoPaterno} {postulacion?.apellidoMaterno}</h1>
        <div className="flex items-center gap-2 text-blue-100">
          <Briefcase className="w-4 h-4" />
          <span>{postulacion?.convocatoria?.solicitud?.cargo?.nombreCargo}</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Correo Electrónico</p>
            <a href={`mailto:${postulacion?.correoElectronico}`} className="hover:text-blue-600">
              {postulacion?.correoElectronico}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Número celular</p>
            <span>{postulacion?.numeroCelular}</span>
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
  )
}

export default  CalificacionHeader;