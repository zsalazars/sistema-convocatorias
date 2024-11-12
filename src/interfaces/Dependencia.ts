export interface Dependencia {
  id: number,
  nombreDependencia: string
}

export const defaultDependencia = {
  id: 0,
  nombreDependencia: ""
}

export type DependenciaForm = Omit<Dependencia, "id">