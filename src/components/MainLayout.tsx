import { ReactNode } from 'react';
import { Sidebar } from './shared/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto">
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-start mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
            <h1 className="flex text-3xl font-gelion text-gray-900">
              Convocatorias UAC
            </h1>
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 lg:hidden"
            >
            </button>
          </div>
        </header>
        <div className="m-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
