export interface CalificacionRequisitos {
  id: number
  requisitosEstudiosCumplidos: string[]
  requisitosEstudiosNoCumplidos: string[]
  requisitosExperienciaCumplidos: string[]
  requisitosExperienciaNoCumplidos: string[]
  observaciones: string
}

export const defaultCalificacionRequisitos: CalificacionRequisitos = {
  id: 0,
  requisitosEstudiosCumplidos: [],
  requisitosEstudiosNoCumplidos: [],
  requisitosExperienciaCumplidos: [],
  requisitosExperienciaNoCumplidos: [],
  observaciones: ""
}

export type calificacionRequisitosForm = Omit<CalificacionRequisitos, "id">