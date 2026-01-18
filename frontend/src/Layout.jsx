import { useState } from 'react';
import logo from './assets/logo.svg';
import Sidebar from './components/layout/Sidebar';
import { navItems } from './constants/navItems';

const Layout = ({ children }) => {
    // Local correto para collapsed state, logo e navItems também são passados para o Sidebar aqui
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='flex'>
            <Sidebar
                logoSrc={logo}
                navItems={navItems}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <main
                className={`flex-1 bg-gray-50 p-6 transition-all duration-200 ${
                    collapsed ? 'md:ml-20' : 'md:ml-64'
                }`}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
