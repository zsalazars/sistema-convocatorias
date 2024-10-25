import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import LoadingSpinner from '../components/shared/ui/LoadingSpinner';
import ProtectedRoutes from './ProtectedRoutes';
import DependenciaPage from '@/components/dependencias/DependenciasPage';

// Componentes cargados de forma asíncrona
const Inicio = lazy(() => import('../components/inicio/InicioPage'));
const Login = lazy(() => import('../components/login/LoginPage'));
const Cargos = lazy(() => import('../components/cargos/CargosPage'));
const Aplicantes = lazy(() => import('../components/aplicantes/AplicantesPage'));
const Solicitudes = lazy(() => import('../components/solicitudes/SolicitudesPage'));
const Convocatorias = lazy(() => import('../components/convocatorias/ConvocatoriasPage'));
const Postulaciones = lazy(() => import('../components/postulaciones/PostulacionesPage'));
// Rutas configuradas en un array
const routes = [
  { path: "/", element: <Inicio /> },
  { path: "/login", element: <Login /> },
  { path: "/cargos", element: <Cargos /> },
  { path: "/aplicantes", element: <Aplicantes /> },
  { path: "/solicitudes", element: <Solicitudes /> },
  { path: "/convocatorias", element: <Convocatorias /> },
  { path: "/dependencias", element: <DependenciaPage />}
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="w-12 h-12" screen="h-screen"/>}>
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
        <Route path="/postulaciones" element={<Postulaciones />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
