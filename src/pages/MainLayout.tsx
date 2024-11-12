import { ReactNode } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <DashboardLayout>
      <div className="m-5">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default MainLayout;
