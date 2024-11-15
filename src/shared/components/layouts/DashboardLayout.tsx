import { ReactNode, useState } from "react";
import logotipo_horizontal_uac from "../../../assets/images/logotipo_horizontal_uac.png";
import { Menu } from "lucide-react";
import { Toaster } from "sonner";
import Sidebar from "../common/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-white">
      
      {/* Sidebar */}
      <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} setIsMobileSidebarOpen={setIsMobileSidebarOpen} />

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
        <main className="flex-1 overflow-auto m-5 p-4">
          {children}
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default DashboardLayout;
