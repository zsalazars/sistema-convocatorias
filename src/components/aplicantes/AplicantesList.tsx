import { useEffect, useState } from 'react';
import { DataTable } from './AplicantesTable';
import { columns } from './Columns';
import { Aplicante } from '@/interfaces/model/Aplicante';

async function getData(): Promise<Aplicante[]> {
  // Fetch data from your API here.
  return [
    {
      id: 0,
      nombres: "Juan",
      apellido_paterno: "Lopez",
      apellido_materno: "Lopez2",
      numero_celular: "987675623",
      correo_electronico: "xd@gmail.com",
      requerimientos: "xdd",
      observaciones: "xd",
      puntuacion: 100,
      es_apto: true
    },
    // ...
  ];
}

const AplicantesList = () => {
  const [aplicantes, setAplicantesList] = useState<Aplicante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setAplicantesList(result);
      } catch {
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente.

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Ver postulantes</h2>
      </div>
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={aplicantes} />
      </div>
    </div>
  );
};

export default AplicantesList;
