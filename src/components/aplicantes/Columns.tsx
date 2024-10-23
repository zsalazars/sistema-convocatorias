import { Aplicante } from "@/interfaces/model/Aplicante"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Aplicante>[] = [
  {
    accessorKey: "nombres",
    header: "Nombres",
  },
  {
    accessorKey: "apellido_paterno",
    header: "Apellido paterno",
  },
  {
    accessorKey: "apellido_materno",
    header: "Apellido materno",
  },
  {
    accessorKey: "numero_celular",
    header: "N° de celular",
  },
  {
    accessorKey: "correo_electronico",
    header: "Correo electrónico",
  },
  {
    accessorKey: "observaciones",
    header: "Observaciones",
  },
]
