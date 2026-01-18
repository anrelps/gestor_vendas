// src/App.jsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.svg';
import ClientList from './components/ClientList';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
    const navItems = [
        {
            label: 'Clientes',
            to: '/clientes',
            icon: 'fa-regular fa-address-card',
        },
        {
            label: 'Valores',
            to: '/valores',
            icon: 'fa-solid fa-arrows-down-to-people',
        },
        {
            label: 'Notificações',
            to: '/notificacoes',
            icon: 'fa-solid fa-bell-concierge',
        },
        { label: 'Livros', to: '/livros', icon: 'fa-solid fa-book-bookmark' },
    ];

    const user = {
        name: 'Flavio Caca-Rato',
        role: 'Administrador',
        editTo: '/perfil/editar',
    };

    return (
        <BrowserRouter>
            <div className='flex min-h-screen'>
                <Sidebar
                    logoSrc={logo}
                    user={user}
                    navItems={navItems}
                    onLogout={() => {
                        // limpar token/session aqui
                    }}
                />
                <main className='flex-1 bg-gray-50 p-6'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/clientes' element={<ClientList />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};
export default App;
