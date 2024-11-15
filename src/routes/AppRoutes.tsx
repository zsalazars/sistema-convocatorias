import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../shared/components/common/LoadingSpinner';
import ProtectedRoutes from './ProtectedRoutes';
import DashboardLayout from '@/shared/components/layouts/DashboardLayout';

// Componentes cargados de forma asíncrona
const Admin = lazy(() => import('@/modules/dashboard/DashboardHome'));
const Login = lazy(() => import('@/modules/auth/Login'));
const Cargos = lazy(() => import('@/modules/cargo/pages/CargosMain'));
const Dependencia = lazy(() => import('@/modules/dependencia/pages/DependenciasMain'))
const Aplicantes = lazy(() => import('../modules/postulante/pages/PostulantesMain'));
const Solicitudes = lazy(() => import('@/modules/solicitud/pages/SolicitudesMain'));
const Convocatorias = lazy(() => import('@/modules/convocatoria/pages/ConvocatoriasMain'));
const NuevaConvocatoria = lazy(() => import('@/modules/convocatoria/components/ConvocatoriasForm'));
const ConvocatoriasAplicantes = lazy(() => import('@/modules/convocatoria/pages/ConvocatoriasAplicantes'))
const Calificaciones = lazy(() => import('@/modules/calificacion/pages/CalificacionesMain'))
const CalificacionDetail = lazy(() => import('@/modules/calificacion/pages/CalificacionDetail'))
const CalificacionDocumentos = lazy(() => import('@/modules/calificacion/pages/CalificacionDocumentos'))
const CalificacionRequisitos = lazy(() => import('@/modules/calificacion/pages/CalificacionRequisitos'))

const Postulaciones = lazy(() => import('@/modules/postulacion/pages/PostulacionesMain'));
const PostulacionDetail = lazy(() => import('@/modules/postulacion/pages/PostulacionesDetail'));

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
  { path: "/calificaciones/:id", element: <CalificacionDetail /> },
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
