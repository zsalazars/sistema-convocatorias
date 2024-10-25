import React, { useState } from "react";
import { Link } from "react-router-dom";
import logotipo_horizontal_uac from "../../assets/images/logotipo_blanco_horizontal_uac.png"
import { Briefcase, FileUser, Megaphone, SquareUserRound, Building2 } from "lucide-react";

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const MenuItem: React.FC<MenuItemProps> = ({ to, icon, text }) => (
    <Link to={to}>
      <li className="flex flex-row text-white text-xl hover:bg-uac-alter space-x-3 rounded-lg transition duration-300 mx-5 mb-2 px-3 py-2 items-center">
        {icon}
        <span className="my-auto">{text}</span>
      </li>
    </Link>
  );

  return (
    <>
      <button
        className="fixed top-5 left-1 z-50 text-white bg-uac rounded-md xl:hidden p-2"
        onClick={toggleSidebar}
      >
      </button>
      <div className={`flex flex-col w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/4 fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:relative xl:translate-x-0 transition duration-200 ease-in-out h-svh bg-uac overflow-y-auto z-40`}>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col w-full text-xl">
            <div className="flex justify-center align-middle mx-7 my-5">
              <img className="w-2/3 mx-auto md:mx-0" src={logotipo_horizontal_uac} alt="" />
            </div>
            <ul className="flex flex-col w-full justify-between">
              <MenuItem to="/cargos" icon={<Briefcase />} text="Cargos" />
              <MenuItem to="/dependencias" icon={<Building2 />} text="Dependencias" />
              <MenuItem to="/solicitudes" icon={<FileUser />} text="Solicitudes" />
              <MenuItem to="/convocatorias" icon={<Megaphone />} text="Convocatorias" />
              <MenuItem to="/aplicantes" icon={<SquareUserRound />} text="Aplicantes" />
            </ul>
          </div>
        </div>
        <div className="mt-auto">
          <li className="flex flex-row text-white text-xl hover:bg-uac-alter space-x-4 rounded-lg transition duration-300 mx-5 mb-2 p-3 cursor-pointer">
            <span className="my-auto">Cerrar Sesión</span>
          </li>
        </div>
      </div>
    </>
  );
}
