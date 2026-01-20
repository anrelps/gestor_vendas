import { Edit as EditIcon, Home as HomeIcon, LogOut, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';

const Sidebar = ({ logoSrc, navItems, collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = {
    name: user?.name || user?.nome || 'nome',
    role: user?.empresa?.nome || 'empresa',
    editTo: '/perfil/editar',
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleSidebar = () => setCollapsed((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const widthClass = collapsed ? 'w-20' : 'w-64';

  const homeItem = useMemo(
    () => ({ label: 'Home', to: '/', icon: HomeIcon }),
    [],
  );

  return (
    <>
      {/* Mobile Header */}
      <header className='md:hidden fixed top-0 left-0 right-0 h-14 bg-primary text-white flex items-center justify-between px-4 shadow-md z-50'>
        <button
          type='button'
          aria-label='Abrir menu'
          onClick={() => setMobileOpen(true)}
          className='h-10 w-10 flex items-center justify-center rounded-lg hover:bg-white/15 active:bg-white/20 transition-all'
        >
          <i className='fa-solid fa-bars text-xl' />
        </button>
        <img src={logoSrc} alt='Logo' className='h-8' />
      </header>

      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex fixed left-0 top-0 h-full bg-primary text-white flex-col items-center ${widthClass} shadow-[4px_0_15px_rgba(0,0,0,0.3)] transition-[width] duration-200 z-40`}
      >
        <div
          className={`w-full flex px-2 pt-2 ${collapsed ? 'justify-center' : 'justify-end'}`}
        >
          <button
            type='button'
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
            onClick={toggleSidebar}
            className='h-8 w-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/50 transition-all'
          >
            <i
              className={`fa-solid ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm`}
            />
          </button>
        </div>

        <div className='w-full flex justify-center'>
          <img
            src={logoSrc}
            alt='Logo'
            className={collapsed ? 'h-10 my-2' : 'p-4'}
          />
        </div>

        <div className={`w-full ${collapsed ? 'px-2' : 'px-8'}`}>
          <div className='border-b border-gray-500/50 mb-4 pb-4 mt-2'>
            <NavLink
              to={homeItem.to}
              title={collapsed ? homeItem.label : undefined}
              onClick={() => {}}
              className={({ isActive }) =>
                [
                  'w-full flex items-center rounded-lg transition-all duration-200',
                  collapsed ? 'justify-center px-0 py-3' : 'p-2',
                  'hover:bg-white/10',
                  isActive ? 'bg-white/10 font-semibold' : 'font-medium',
                ].join(' ')
              }
            >
              {homeItem.icon && (
                <homeItem.icon size={20} className='w-6 text-center' />
              )}
              {!collapsed && <span className='ml-3'>{homeItem.label}</span>}
            </NavLink>
          </div>

          <nav className='mt-4'>
            <ul
              className={`text-md flex flex-col gap-2 ${collapsed ? 'items-stretch' : ''}`}
            >
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    onClick={() => {}}
                    className={({ isActive }) =>
                      [
                        'w-full flex items-center rounded-lg transition-all duration-200',
                        collapsed ? 'justify-center px-0 py-3' : 'p-2',
                        'hover:bg-white/10',
                        isActive ? 'bg-white/10 font-semibold' : 'font-medium',
                      ].join(' ')
                    }
                  >
                    {item.icon && (
                      <item.icon size={20} className='w-6 text-center' />
                    )}
                    {!collapsed && <span className='ml-3'>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={`mt-auto w-full ${collapsed ? 'px-2' : 'px-4'}`}>
          {collapsed ? (
            <div className='mb-4 flex justify-center'>
              <NavLink
                to={authUser.editTo}
                title={`${authUser.name} • ${authUser.role}`}
                onClick={() => {}}
                className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-all'
              >
                <User size={20} className='text-white' />
              </NavLink>
            </div>
          ) : (
            <div className='bg-linear-to-br from-white to-gray-400 rounded-xl px-4 py-6 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-500'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center'>
                  <User size={20} className='text-white' />
                </div>
                <div>
                  <h2 className='font-bold text-sm text-primary leading-tight'>
                    {authUser.name}
                  </h2>
                  <p className='text-accent text-xs'>{authUser.role}</p>
                </div>
              </div>
              <NavLink
                to={authUser.editTo}
                onClick={() => {}}
                className='text-accent text-xs hover:underline flex items-center gap-1 mx-2 mt-4'
              >
                <EditIcon size={14} />
                Editar Perfil
              </NavLink>
            </div>
          )}
          <button
            type='button'
            onClick={handleLogout}
            className='w-full flex items-center justify-center gap-2 py-4 mb-2 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer text-white'
          >
            <LogOut size={20} />
            {!collapsed && <span className='font-medium'>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay */}
      {mobileOpen && (
        <>
          <button
            type='button'
            aria-label='Fechar menu'
            onClick={closeMobile}
            className='md:hidden fixed inset-0 bg-black/60 z-50'
          />
          <aside className='md:hidden fixed top-0 left-0 h-full w-72 bg-primary text-white z-50 shadow-xl flex flex-col'>
            <div className='h-14 flex items-center justify-between px-4 border-b border-white/15'>
              <button
                type='button'
                aria-label='Fechar menu'
                onClick={closeMobile}
                className='h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all'
              >
                <i className='fa-solid fa-xmark text-xl' />
              </button>
              <img src={logoSrc} alt='Logo' className='h-8' />
            </div>
            <div className='w-full px-6 mt-8'>
              <NavLink
                to={homeItem.to}
                className='flex items-center gap-2 py-3 px-2 rounded-lg hover:bg-white/10 transition-all'
                onClick={closeMobile}
              >
                <HomeIcon size={20} />
                <span>{homeItem.label}</span>
              </NavLink>
              <ul className='text-md flex flex-col gap-2 mt-4'>
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className='flex items-center gap-2 py-3 px-2 rounded-lg hover:bg-white/10 transition-all'
                      onClick={closeMobile}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className='mt-8'>
                <div className='bg-linear-to-br from-white to-gray-400 rounded-xl px-4 py-6 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-500'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center'>
                      <User size={20} className='text-white' />
                    </div>
                    <div>
                      <h2 className='font-bold text-sm text-primary leading-tight'>
                        {authUser.name}
                      </h2>
                      <p className='text-accent text-xs'>{authUser.role}</p>
                    </div>
                  </div>
                  <NavLink
                    to={authUser.editTo}
                    onClick={closeMobile}
                    className='text-accent text-xs hover:underline flex items-center gap-1 mx-2 mt-4'
                  >
                    <EditIcon size={14} />
                    Editar Perfil
                  </NavLink>
                </div>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='w-full flex items-center justify-center gap-2 py-4 mb-2 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer text-white'
                >
                  <LogOut size={20} />
                  <span className='font-medium'>Sair</span>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
