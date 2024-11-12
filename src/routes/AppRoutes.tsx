import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../pages/MainLayout';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ProtectedRoutes from './ProtectedRoutes';

// Componentes cargados de forma asíncrona
const Admin = lazy(() => import('../pages/admin/AdminPage'));
const Login = lazy(() => import('../pages/login/LoginPage'));
const Cargos = lazy(() => import('../pages/cargos/CargosPage'));
const Dependencia = lazy(() => import('@/pages/dependencias/DependenciasPage'))
const Aplicantes = lazy(() => import('../pages/aplicantes/AplicantesPage'));
const Solicitudes = lazy(() => import('../pages/solicitudes/SolicitudesPage'));
const Convocatorias = lazy(() => import('../pages/convocatorias/ConvocatoriasPage'));
const NuevaConvocatoria = lazy(() => import('../pages/convocatorias/ConvocatoriasForm'));
const ConvocatoriasAplicantes = lazy(() => import('@/pages/convocatorias/convocatorias-aplicantes/ConvocatoriasAplicantesPage'))
const Calificaciones = lazy(() => import('@/pages/calificaciones/CalificacionesPage'))
const CalificacionDocumentos = lazy(() => import('@/pages/convocatorias/calificaciones/calificacion-documentos/CalificacionDocumentosPage'))
const CalificacionRequisitos = lazy(() => import('@/pages/convocatorias/calificaciones/calificacion-requisitos/CalificacionRequisitosPage'))

const Postulaciones = lazy(() => import('../pages/postulaciones/PostulacionesPage'));

// Rutas configuradas en un array
const routes = [
  { path: "/admin", element: <Admin /> },
  { path: "/login", element: <Login /> },
  { path: "/cargos", element: <Cargos /> },
  { path: "/aplicantes", element: <Aplicantes /> },
  { path: "/solicitudes", element: <Solicitudes /> },
  { path: "/convocatorias", element: <Convocatorias /> },
  { path: "/convocatorias/nueva-convocatoria", element: <NuevaConvocatoria /> },
  { path: "/convocatorias/:id", element: <ConvocatoriasAplicantes /> },
  { path: "/calificaciones", element: <Calificaciones /> },
  { path: "/calificaciones/documentos/:id", element: <CalificacionDocumentos /> },
  { path: "/calificaciones/requisitos/:id", element: <CalificacionRequisitos /> },
  { path: "/dependencias", element: <Dependencia /> }
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="w-12 h-12" screen={true} />}>
      <Routes>
        <Route path="/" element={<Postulaciones />} />
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
