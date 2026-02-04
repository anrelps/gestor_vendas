import { useState } from 'react';
import logo from './assets/logo.svg';
import Sidebar from './components/layout/Sidebar';
import { navItems } from './constants/navItems';

import LoadingBar from './components/LoadingBar';

// Context
import { useLoading } from './context/LoadingContext';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { isLoading } = useLoading();

  return (
    <div className='flex'>
      <LoadingBar isLoading={isLoading} />
      <Sidebar
        logoSrc={logo}
        navItems={navItems}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <main
        className={`flex-1 p-6 transition-all duration-200  ${
          collapsed ? 'md:ml-20' : 'md:ml-96'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
