export interface Aplicante {
  id: number,
  nombres: string,
  apellido_paterno: string,
  apellido_materno: string,
  numero_celular: string,
  correo_electronico: string,
  requerimientos: string,
  observaciones: string,
  puntuacion: number,
  es_apto: boolean
}