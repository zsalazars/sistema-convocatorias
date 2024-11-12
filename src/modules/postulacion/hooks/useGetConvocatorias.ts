// hooks/useCargos.ts
import { useQuery } from '@tanstack/react-query'
import { Convocatoria } from '@/interfaces/Convocatoria';
import { getAllConvocatorias } from '../services/postulacion.api';

export const useGetConvocatorias = () => {
  return useQuery<Convocatoria[], Error>({
    queryKey: ["convocatorias"],
    queryFn: getAllConvocatorias,
  });
};