
import { Briefcase } from 'lucide-react';
import LoadingSpinner from '../../../shared/components/common/LoadingSpinner';
import { useCargos } from '../hooks/useCargos';


const CargosList = () => {

  const { data: cargosList, isLoading, isError, error } = useCargos()

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }
  
  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Cargos Registrados</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {cargosList?.map((cargo) => (
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