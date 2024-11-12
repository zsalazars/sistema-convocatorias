import React from "react";

interface BadgeProps {
  text: string;
  color?: "gray" | "green" | "red" | "blue" | "yellow"; // Puedes agregar más colores si es necesario
}

const Badge: React.FC<BadgeProps> = ({ text, color = "gray" }) => {
  const colorClasses = {
    gray: "bg-gray-400 text-gray-800",
    green: "bg-green-400 text-green-800",
    red: "bg-red-400 text-red-800",
    blue: "bg-blue-400 text-blue-800",
    yellow: "bg-yellow-400 text-yellow-800",
  };

  return (
    <div className={`text-xs rounded-full px-2 py-1 ${colorClasses[color]}`}>
      {text}
    </div>
  );
};

export default Badge;
