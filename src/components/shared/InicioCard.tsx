import React from 'react';

interface InicioCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const InicioCard: React.FC<InicioCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        {icon}
      </div>
    </div>
  );
}

export default InicioCard;
