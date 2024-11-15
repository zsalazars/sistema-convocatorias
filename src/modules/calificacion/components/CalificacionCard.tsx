import { Postulacion } from '@/interfaces/Postulacion';

interface CalificacionCardProps {
  postulacion: Postulacion;
}

const CalificacionCard = ({ postulacion }: CalificacionCardProps) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{postulacion.nombres + postulacion.apellidoPaterno + postulacion.apellidoMaterno}</h2>
              <p className="text-indigo-600 font-medium">{postulacion.convocatoria.solicitud.cargo.nombreCargo}</p>
            </div>
            <div className="text-sm text-gray-600">
              Convocatoria #{postulacion.convocatoria.numeroConvocatoria}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono</p>
              <p>{postulacion.numeroCelular}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
              <p>{postulacion.correoElectronico}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-colors"
            >
              <span>Calificar documentos</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-600 transition-colors"
            >
              <span>Calificar requisitos</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalificacionCard;