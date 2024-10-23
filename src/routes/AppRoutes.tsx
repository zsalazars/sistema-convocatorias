import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import LoadingSpinner from '../components/shared/ui/LoadingSpinner';
import ProtectedRoutes from './ProtectedRoutes';
import Convocatorias from '@/components/convocatorias/Convocatorias';

// Componentes cargados de forma asíncrona
const Inicio = lazy(() => import('../components/inicio/Inicio'));
const Login = lazy(() => import('../components/login/Login'));
const Cargos = lazy(() => import('../components/cargos/Cargos'));
const Aplicantes = lazy(() => import('../components/aplicantes/Aplicantes'));
const Solicitudes = lazy(() => import('../components/solicitudes/Solicitudes'));

// Rutas configuradas en un array
const routes = [
  { path: "/", element: <Inicio /> },
  { path: "/login", element: <Login /> },
  { path: "/cargos", element: <Cargos /> },
  { path: "/aplicantes", element: <Aplicantes /> },
  { path: "/solicitudes", element: <Solicitudes /> },
  { path: "/convocatorias", element: <Convocatorias /> },
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
          key={path}
          path={path}
          element={
            path === '/login' ? (
              element
            ) : (
              <ProtectedRoutes>
                <MainLayout>{element}</MainLayout>
              </ProtectedRoutes>
            )
          }
        />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
