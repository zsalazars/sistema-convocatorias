import React, { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';

import { getAllCargos } from '@/services/api/cargo.api';
import { Cargo } from '@/interfaces/model/Cargo';


const CargosList: React.FC = () => {
  const [cargosList, setCargosList] = useState<Cargo[]>([])
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga de datos
  const [error, setError] = useState(false); // Estado para controlar el error de datos

  const fetchCargos = async () => {
    setIsLoading(true);
    try{
      const res = await getAllCargos();
      setCargosList(res)
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCargos();
  }, [])

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Cargos Registrados</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {cargosList.map((cargo: Cargo) => (
          <li key={cargo.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{cargo.nombreCargo}</h3>
                <p className="mt-1 text-sm text-gray-500">{cargo.requisitosEstudios}</p>
                <p className="mt-1 text-sm text-gray-500">{cargo.requisitosExperiencia}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CargosList;