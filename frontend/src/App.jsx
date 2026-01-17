// src/App.jsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.svg';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
    const navItems = [
        {
            label: 'Endereços',
            to: '/enderecos',
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
            <Sidebar
                logoSrc={logo}
                user={user}
                navItems={navItems}
                onLogout={() => {
                    // limpar token/session aqui
                }}
            />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
