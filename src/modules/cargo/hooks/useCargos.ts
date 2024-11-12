// hooks/useCargos.ts
import { useQuery } from '@tanstack/react-query'
import { Cargo } from '@/interfaces/Cargo'
import { getAllCargos } from '../services/cargo.api'

export const useCargos = () => {
  return useQuery<Cargo[], Error>({
    queryKey: ["cargos"],
    queryFn: getAllCargos,
  });
};