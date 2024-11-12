import { Aplicante } from "@/interfaces/Aplicante"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Aplicante>[] = [
  {
    accessorKey: "nombres",
    header: "Nombres",
  },
  {
    accessorKey: "apellidoPaterno",
    header: "Apellido paterno",
  },
  {
    accessorKey: "apellidoMaterno",
    header: "Apellido materno",
  },
  {
    accessorKey: "numeroCelular",
    header: "N° de celular",
  },
  {
    accessorKey: "correoElectronico",
    header: "Correo electrónico",
  },
  {
    accessorKey: "observaciones",
    header: "Observaciones",
  },
  {
    accessorKey: "convocatoria.solicitud.cargo.nombreCargo",
    header: "Convocatoria",
  },
]
