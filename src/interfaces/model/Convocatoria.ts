import { defaultSolicitud, Solicitud } from "./Solicitud";

export enum TipoConvocatoria {
  interna = "INTERNA",
  externa = "EXTERNA"
}

export enum TipoRegion {
  regional = "REGIONAL",
  nacional = "NACIONAL"
}

export enum Estado {
  abierto = "ABIERTO",
  proceso = "PROCESO",
  cerrado = "CERRADO"
}

export interface Convocatoria {
  id: number,
  numeroConvocatoria: number,
  tipoConvocatoria: TipoConvocatoria,
  tipoRegion: TipoRegion,
  fechaPublicacion: string,
  fechaEnvioDocumentos: string,
  fechaCalificacionDocumentos: string,
  fechaPublicacionAptos: string,
  fechaHorariosEntrevistas: string,
  fechaEntrevistaPersonal: string,
  fechaPublicacionResultados: string,
  fechaInicioFunciones: string,
  estado?: Estado,
  solicitud: Solicitud;
}

export const defaultConvocatoria: Convocatoria = {
  id: 0,
  numeroConvocatoria: 0,
  tipoConvocatoria: TipoConvocatoria.interna,
  tipoRegion: TipoRegion.nacional,
  fechaPublicacion: "",
  fechaEnvioDocumentos: "",
  fechaCalificacionDocumentos: "",
  fechaPublicacionAptos: "",
  fechaHorariosEntrevistas: "",
  fechaEntrevistaPersonal: "",
  fechaPublicacionResultados: "",
  fechaInicioFunciones: "",
  estado: Estado.cerrado,
  solicitud: defaultSolicitud
}

export type ConvocatoriaForm = Omit<Convocatoria, "id">;



