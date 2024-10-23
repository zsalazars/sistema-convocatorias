import React, { useState } from 'react';

import { Button } from "@/components/ui/button"

const CargosForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [proveido, setProveido] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', { title, proveido });
    // Reset form
    setTitle('');
    setProveido('');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold font-gelion mb-6 text-gray-800">Agregar nuevo cargo</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Denominación del cargo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Ej: Técnico Administrativo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="title">
            Requisitos de educación
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-1 mb-5">
          <label className="block text-gray-700 text-sm font-bold font-default mb-2" htmlFor="requisitos_experiencia">
            Requisitos de experiencia
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="requisitos_experiencia"
            type="text"
            value={proveido}
            onChange={(e) => setProveido(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between col-span-1 md:col-span-2"> {/* Columna que ocupa el ancho completo en pantallas pequeñas */}
          <Button
            className="bg-uac text-white hover:bg-blue-900 transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Agregar cargo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CargosForm;