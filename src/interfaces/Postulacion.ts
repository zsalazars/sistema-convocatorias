import { CalificacionDocumentos, defaultCalificacionDocumentos } from "./CalificacionDocumentos";
import { CalificacionRequisitos, defaultCalificacionRequisitos } from "./CalificacionRequisitos";
import { Convocatoria, defaultConvocatoria } from "./Convocatoria";

export interface Postulacion {
  id: number
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  numeroCelular: string
  correoElectronico: string
  documentoRuta: string
  horaFecha: string
  observaciones: string
  puntuacion: number
  esApto: boolean
  calificacionDocumentos: CalificacionDocumentos
  calificacionRequisitos: CalificacionRequisitos
  convocatoria: Convocatoria
}

export const defaultPostulacion: Postulacion = {
  id: 0,
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  numeroCelular: "",
  correoElectronico: "",
  documentoRuta: "",
  horaFecha: "",
  observaciones: "",
  puntuacion: 0.0,
  esApto: false,
  calificacionDocumentos: defaultCalificacionDocumentos,
  calificacionRequisitos: defaultCalificacionRequisitos,
  convocatoria: defaultConvocatoria
}

export type PostulacionForm = Omit<Postulacion, "id">