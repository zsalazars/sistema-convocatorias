import { Link } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Postulacion } from "@/interfaces/Postulacion"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Postulacion>[] = [
  {
    accessorKey: "convocatoria.numeroConvocatoria",
    header: "N° Convocatoria",
  },
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
    header: "Cargo",
  },
  {
    accessorKey: "puntuacion",
    header: "Puntuación",
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Link to={`/calificaciones/${row.original.id}`}>
          <Button className="bg-uac hover:bg-uac-alter transition duration-300">
            Calificar
          </Button>
        </Link>
      </div>
    ),
  },
]
