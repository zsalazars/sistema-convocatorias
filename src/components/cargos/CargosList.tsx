import React from 'react';
import { Briefcase } from 'lucide-react';

// This would typically come from your state management (e.g., Redux) or fetched from an API
const mockPositions = [
  { id: 1, title: 'Desarrollador Frontend', description: 'Experiencia en React y TypeScript' },
  { id: 2, title: 'Diseñador UX/UI', description: 'Conocimientos en Figma y Adobe XD' },
  { id: 3, title: 'Ingeniero DevOps', description: 'Experiencia con AWS y Docker' },
];

const CargosList: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Cargos Registrados</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {mockPositions.map((position) => (
          <li key={position.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{position.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{position.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CargosList;