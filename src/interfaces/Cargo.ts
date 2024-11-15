export interface Cargo {
  id: number,
  nombreCargo: string,
  requisitosEstudios: string[],
  requisitosExperiencia: string[]
}

export const defaultCargo: Cargo = {
  id: 0,
  nombreCargo: "",
  requisitosEstudios: [],
  requisitosExperiencia: []
}

export type CargoForm = Omit<Cargo, "id">;