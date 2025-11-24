import { lazy } from 'react'

// Cargando las paginas
const Home = lazy(() => import('../pages/user/pages2/Home.jsx'))
const Catalogo = lazy(() => import('../pages/user/pages2/Catalogo.jsx'))
const Carrito = lazy(() => import('../pages/user/pages2/Carrito.jsx'))
const DetalleVehiculo = lazy(() => import('../pages/user/pages2/DetalleVehiculo.jsx'))
const Profile = lazy(() => import('../pages/user/pages2/Perfil.jsx'))

const Login = lazy(() => import('../pages/Auth/Login.jsx'))
const Register = lazy(() => import('../pages/Auth/Register.jsx'))

const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin.jsx'))

// Rutas públicas (usuario cliente)
const publicRoutes = [
    { path: '/', element: <Home />, showNavbar: true },
    { path: '/login', element: <Login />, showNavbar: false },
    { path: '/register', element: <Register />, showNavbar: false },
    { path: '/catalogo', element: <Catalogo />, showNavbar: true },
    { path: '/carrito', element: <Carrito />, showNavbar: true },
    { path: '/perfil', element: <Profile />, showNavbar: true },
    { path: '/vehiculo/:id', element: <DetalleVehiculo />, showNavbar: true },
]

// Rutas admin (protegidas por rolUsuario.id === 1)
const adminRoutes = [
    { path: '/admin', element: <HomeAdmin />, isAdmin: true },
]

// Ruta 404
const notFoundRoute = {
    path: '*',
    element: <div className="text-center py-10 text-2xl">404 - Página no encontrada</div>,
    showNavbar: false,
}

// Exportar todas las rutas
export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute]