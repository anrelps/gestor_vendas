import { Bell, BookMarked, LayoutDashboard, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.svg';

// Redux
import { checkAuth } from './redux/slices/userSlice';

// Pages
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

// Components
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.user);

    // Checagem se o usuario ja esta autenticado
    useEffect(() => {
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch, token]);

    const navItems = [
        {
            label: 'Dashboard',
            to: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            label: 'Clientes',
            to: '/clientes',
            icon: Users,
        },
        {
            label: 'Notificações',
            to: '/notificacoes',
            icon: Bell,
        },
        { label: 'Livros', to: '/livros', icon: BookMarked },
    ];

    const authUser = {
        name: user?.nome || 'nome',
        role: user?.empresa?.nome || 'empresa',
        editTo: '/perfil/editar',
    };

    return (
        <BrowserRouter>
            <div className='flex min-h-screen'>
                <Sidebar
                    logoSrc={logo}
                    authUser={authUser}
                    navItems={navItems}
                    onLogout={() => {
                        // limpar token/session aqui
                    }}
                />
                <main className='flex-1 bg-gray-50 p-6'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <Outlet />
                                </ProtectedRoute>
                            }
                        >
                            <Route path='/clientes' element={<Clients />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};
export default App;
