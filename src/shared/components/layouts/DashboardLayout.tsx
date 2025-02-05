import { ReactNode, useState } from "react";
import logotipo_horizontal_uac from "../../../assets/images/logotipo_horizontal_uac.png";
import { Menu } from "lucide-react";
import { Toaster } from "sonner";
import Sidebar from "../common/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen min-h-screen overflow-hidden bg-white">
      
      {/* Sidebar */}
      <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} setIsMobileSidebarOpen={setIsMobileSidebarOpen} />

      {/* Main Content Container */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}
        <header className="flex items-center h-16 px-4 bg-white shadow-sm">
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 xl:hidden"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center justify-end flex-1 ml-4">
            <img
              className="hidden w-auto h-12 sm:block"
              src={logotipo_horizontal_uac}
              alt="UAC Logo"
            />
            <h1 className="text-xl text-gray-900 sm:text-2xl font-gelion">
              Convocatorias UAC
            </h1>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 p-1 m-2 overflow-auto md:m-5 md:p-4">
          {children}
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default DashboardLayout;
