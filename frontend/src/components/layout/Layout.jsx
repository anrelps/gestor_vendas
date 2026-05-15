import { useEffect, useLayoutEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import Sidebar from './Sidebar';
import {
  BREAKPOINT_MD,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from '../../constants/layout';
import { navItems } from '../../constants/navItems';

import LoadingBar from '../ui/LoadingBar';
import { useLoading } from '../../context/LoadingContext';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT_MD}px)`);

    const updateSidebarWidth = () => {
      const sidebarWidth = mediaQuery.matches
        ? collapsed
          ? SIDEBAR_WIDTH_COLLAPSED
          : SIDEBAR_WIDTH_EXPANDED
        : '0';
      document.documentElement.style.setProperty(
        '--sidebar-width',
        sidebarWidth,
      );
    };

    updateSidebarWidth();
    mediaQuery.addEventListener('change', updateSidebarWidth);

    return () => {
      mediaQuery.removeEventListener('change', updateSidebarWidth);
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, [collapsed]);

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
        className='flex-1 transition-all duration-200 pt-16 md:pt-0 p-6'
        style={{ marginLeft: 'var(--sidebar-width, 0)' }}
      >
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-5xl'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
