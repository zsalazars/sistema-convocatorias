import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../shared/components/common/LoadingSpinner';
import ProtectedRoutes from './ProtectedRoutes';
import DashboardLayout from '@/shared/components/layouts/DashboardLayout';

// Componentes cargados de forma asíncrona
const Admin = lazy(() => import('@/modules/dashboard/DashboardHome'));
const Login = lazy(() => import('@/modules/auth/Login'));
const Cargos = lazy(() => import('@/modules/cargo/Cargos'));
const Dependencia = lazy(() => import('@/modules/dependencia/Dependencias'))
const Aplicantes = lazy(() => import('../modules/aplicante/Aplicantes'));
const Solicitudes = lazy(() => import('../modules/solicitud/Solicitudes'));
const Convocatorias = lazy(() => import('@/modules/convocatoria/Convocatorias'));
const NuevaConvocatoria = lazy(() => import('@/modules/convocatoria/components/ConvocatoriasForm'));
const ConvocatoriasAplicantes = lazy(() => import('@/modules/convocatoria/pages/ConvocatoriasAplicantes'))
const Calificaciones = lazy(() => import('@/modules/calificacion/Calificaciones'))
const CalificacionDocumentos = lazy(() => import('@/modules/convocatoria/pages/CalificacionDocumentos'))
const CalificacionRequisitos = lazy(() => import('@/modules/convocatoria/pages/CalificacionRequisitos'))

const Postulaciones = lazy(() => import('@/modules/postulacion/Postulaciones'));
const PostulacionDetail = lazy(() => import('@/modules/postulacion/pages/PostulacionDetail'));


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

        {/* Rutas públicas */}
        <Route path="/" element={<Postulaciones />} />
        <Route path="/postulaciones/:id" element={<PostulacionDetail />} />

        {/* Routas privas para el administrador */}
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              path === '/login' ? (
                element
              ) : (
                <ProtectedRoutes>
                  <DashboardLayout>
                    {element}
                  </DashboardLayout>
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
