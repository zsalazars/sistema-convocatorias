export interface CalificacionDocumentos {
  id: number
  datosGenerales: boolean
  titulosCertificados: boolean
  reporteSunedu: boolean
  cursosEspecializacion: boolean
  experienciaLaboral: boolean
  declaracionJuradaHorario: boolean
  declaracionJuradaParentesco: boolean
  declaracionJuradaAntecedentes: boolean
  certiadulto: boolean
  carnetVacunacion: boolean
  voucherPago: boolean
  observaciones: string
}

export const defaultCalificacionDocumentos: CalificacionDocumentos = {
  id: 0,
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
  observaciones: ""
}

export type calificacionDocumentosForm = Omit<CalificacionDocumentos, "id">