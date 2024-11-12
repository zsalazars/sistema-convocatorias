import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import logotipo_horizontal_uac from "../../assets/images/logotipo_horizontal_uac.png";
import { Briefcase, FileUser, Megaphone, SquareUserRound, Building2, Menu, SquareCheckBig, ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { Toaster } from "sonner";

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, text, collapsed }) => (
  <Link to={to}>
    <li className="flex flex-row text-white text-base hover:bg-uac-alter rounded-lg transition duration-300 mx-2 mb-2 px-3 py-2 items-center">
      {icon}
      {!collapsed && <span className="my-auto ml-3">{text}</span>}
    </li>
  </Link>
);

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-white">
      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed xl:static h-full z-30 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } xl:translate-x-0 transition-all duration-200 ease-in-out bg-uac
        ${isSidebarOpen ? 'w-64' : 'w-16'}`}
      >
        {/* Collapse button */}
        <button
          className="absolute -right-3 top-8 bg-uac-alter text-white rounded-full p-1 hidden xl:flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex flex-col w-full">
              <ul className="flex flex-col w-full justify-between pt-20">
                <MenuItem to="/admin" icon={<LayoutDashboard />} text="Panel general" collapsed={!isSidebarOpen} />
                {!isSidebarOpen ? null :
                  <span className="text-gray-400 text-sm font-medium mx-5 mt-4 mb-2">Gestión</span>
                }
                <MenuItem to="/aplicantes" icon={<SquareUserRound />} text="Aplicantes" collapsed={!isSidebarOpen} />
                <MenuItem to="/cargos" icon={<Briefcase />} text="Cargos" collapsed={!isSidebarOpen} />
                <MenuItem to="/dependencias" icon={<Building2 />} text="Dependencias" collapsed={!isSidebarOpen} />

                {!isSidebarOpen ? null :
                  <span className="text-gray-400 text-sm font-medium mx-5 mt-4 mb-2">Operaciones</span>
                }
                <MenuItem to="/solicitudes" icon={<FileUser />} text="Solicitudes" collapsed={!isSidebarOpen} />
                <MenuItem to="/convocatorias" icon={<Megaphone />} text="Convocatorias" collapsed={!isSidebarOpen} />

                {!isSidebarOpen ? null :
                  <span className="text-gray-400 text-sm font-medium mx-5 mt-4 mb-2">Calificaciones</span>
                }
                <MenuItem to="/calificaciones" icon={<SquareCheckBig />} text="Calificaciones" collapsed={!isSidebarOpen} />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 xl:hidden"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center justify-end flex-1 ml-4">
            <img
              className="h-12 w-auto hidden sm:block"
              src={logotipo_horizontal_uac}
              alt="UAC Logo"
            />
            <h1 className="text-xl sm:text-2xl font-gelion text-gray-900">
              Convocatorias UAC
            </h1>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default DashboardLayout;