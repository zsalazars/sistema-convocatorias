import { Convocatoria, defaultConvocatoria } from "./Convocatoria";

export interface Aplicante {
  id: number,
  nombres: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  numeroCelular: string,
  correoElectronico: string,
  documentoRuta: string,
  observaciones: string,
  puntuacion: number,
  esApto: boolean,
  convocatoria: Convocatoria
}

export const defaultAplicante: Aplicante = {
  id: 0,
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  numeroCelular: "",
  correoElectronico: "",
  documentoRuta: "",
  observaciones: "",
  puntuacion: 0.0,
  esApto: false,
  convocatoria: defaultConvocatoria
}

export type aplicanteForm = Omit<Aplicante, "id">