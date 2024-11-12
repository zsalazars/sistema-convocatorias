import { Cargo, defaultCargo } from "./Cargo";
import { defaultDependencia, Dependencia } from "./Dependencia";

export interface Solicitud {
  id: number,
  nombreDocumento: string,
  proveido: string,
  fechaSolicitud: string,
  estado: string,
  cargo: Cargo,
  dependencia: Dependencia
}

export const defaultSolicitud: Solicitud = {
  id: 0,
  nombreDocumento: "",
  proveido: "",
  fechaSolicitud: "",
  estado: "NUEVO",
  cargo: defaultCargo,
  dependencia: defaultDependencia
}

export type SolicitudForm = Omit<Solicitud, "id">;