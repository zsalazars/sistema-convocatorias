// hooks/useCargos.ts
import { useQuery } from '@tanstack/react-query'
import { Convocatoria } from '@/interfaces/Convocatoria';
import { getConvocatoriaById } from '../services/postulacion.api';

interface UseGetConvocatoriasProps {
  convocatoriaId: number;
}

export const useGetConvocatoriaById = ({ convocatoriaId }: UseGetConvocatoriasProps) => {
  return useQuery<Convocatoria, Error>({
    queryKey: ["convocatorias", convocatoriaId],
    queryFn: () => getConvocatoriaById(convocatoriaId),
    enabled: !!convocatoriaId
  });
};
