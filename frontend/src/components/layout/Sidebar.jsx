import {
  ChevronLeft,
  Edit as EditIcon,
  LogOut,
  Menu,
  Plus,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';
import EditProfilePopup from '../EditProfilePopup'; // Adiciona importação do popup

const Sidebar = ({ logoSrc, navItems, collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = {
    name: user?.name || user?.nome || 'nome',
    role: user?.empresa?.nome || 'empresa',
    // editTo removido, não existe
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleSidebar = () => setCollapsed((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const widthClass = collapsed ? 'w-20' : 'w-96';

  return (
    <>
      {/* Mobile Header */}
      <header className='md:hidden fixed top-0 left-0 right-0 h-14 bg-primary text-white flex items-center justify-between px-4 z-50'>
        <button
          type='button'
          aria-label='Abrir menu'
          onClick={() => setMobileOpen(true)}
          className='p-2'
        >
          <Menu size={22} />
        </button>
        <img src={logoSrc} alt='Logo' className='h-8' />
      </header>

      {/* Sidebar Desktop */}
      <div
        className={`hidden md:flex fixed left-0 top-0 h-full bg-linear-60 from-primary bg-primary-accent text-white flex-col ${widthClass} z-40`}
      >
        <div
          className={`p-4 ${collapsed ? 'flex justify-center' : 'flex justify-end'}`}
        >
          <NavLink
            to='/nova-venda'
            title='Nova Venda'
            className={`flex items-center shadow-lg transition-all duration-200 ${
              collapsed
                ? 'justify-center w-12 h-12 bg-primary-light rounded-full p-0'
                : 'bg-primary-light rounded-full py-2 px-6'
            }`}
          >
            <Plus size={collapsed ? 24 : 28} />
            {!collapsed && (
              <span className='ml-3 whitespace-nowrap'>Nova Venda</span>
            )}
          </NavLink>
        </div>

        {/* Logo */}
        <div className={`p-4 ${collapsed ? 'flex justify-center' : 'm-auto'}`}>
          <img
            src={logoSrc}
            alt='Logo'
            className={collapsed ? 'w-10' : 'w-64'}
          />
        </div>

        {/* Menu */}
        <div className={`flex-1 ${collapsed ? 'px-2' : 'px-8'}`}>
          <nav>
            <ul
              className={`flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}
            >
              {!collapsed &&
                navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      title={item.label}
                      onClick={() => {}}
                      className={({ isActive }) =>
                        `flex text-lg items-center py-2 rounded-md transition-all duration-150 hover:bg-primary-light  px-4 cursor-pointer`
                      }
                    >
                      {item.icon && <item.icon size={20} />}
                      <span className='px-4'>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              {collapsed &&
                navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      title={item.label}
                      onClick={() => {}}
                      className={({ isActive }) =>
                        `flex items-center justify-center p-2 rounded transition-all duration-150 hover:bg-primary-accent  w-12 h-12 cursor-pointer`
                      }
                    >
                      {item.icon && <item.icon size={22} />}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        {/* --- Usuário / Perfil / Sair / Colapsar --- */}
        {/* Seção do usuário */}
        <div
          className={`p-4 flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}
        >
          {collapsed ? (
            <>
              <div className='mb-6 flex justify-center'>
                <button
                  title={`${authUser.name} • ${authUser.role}`}
                  onClick={() => setShowEditProfile(true)}
                  className='p-3 rounded-full transition cursor-pointer'
                  type='button'
                >
                  <User size={26} />
                </button>
              </div>
              <div className='flex flex-col items-center w-full gap-6'>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='flex items-center justify-center w-12 h-12 rounded-md transition cursor-pointer self-start'
                  style={{ alignSelf: 'flex-start' }}
                >
                  <LogOut size={22} />
                </button>
                <button
                  type='button'
                  aria-label='Expandir menu'
                  onClick={toggleSidebar}
                  className='flex items-center justify-center w-12 h-12 rounded-md bg-primary-accent transition mt-2 cursor-pointer self-end'
                  style={{ alignSelf: 'flex-end' }}
                >
                  {/* Substitua <Bars /> por <Menu /> */}
                  <Menu size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='mb-6 py-6 px-6 rounded-xl border border-primary-light flex flex-col gap-5 bg-linear-to-br from-primary-accent to-primary-light/20'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center justify-center bg-white text-primary rounded-full w-14 h-14'>
                    <User size={32} />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-lg font-bold leading-tight mb-1'>
                      {authUser.name}
                    </span>
                    <span className='text-sm text-gray-300 font-light'>
                      {authUser.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className='text-sm flex items-center gap-2 cursor-pointer bg-linear-to-br from-primary-light to-primary-light/70 py-3 px-5 font-light rounded-md border border-white/10'
                  type='button'
                >
                  <EditIcon size={16} />
                  Editar Perfil
                </button>
              </div>
              <div className='flex gap-6 w-full mt-2 border-t rounded-xl border-primary-light pt-4 px-2'>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='flex items-center justify-center w-12 h-12 min-w-12 min-h-12 rounded-md bg-primary-accent transition cursor-pointer'
                >
                  <LogOut size={22} />
                </button>
                <button
                  type='button'
                  aria-label='Recolher menu'
                  onClick={toggleSidebar}
                  className='flex items-center justify-center w-12 h-12 min-w-12 min-h-12 rounded-md bg-primary-accent transition cursor-pointer ml-auto'
                >
                  <ChevronLeft size={22} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Sidebar Mobile Overlay */}
      {mobileOpen && (
        <>
          <button
            type='button'
            aria-label='Fechar menu'
            onClick={closeMobile}
            className='md:hidden fixed inset-0 bg-black z-50 opacity-50'
          />
          <div className='md:hidden fixed top-0 left-0 h-full w-72 bg-primary text-white z-50 flex flex-col'>
            <div className='h-14 flex items-center justify-between px-4 border-b'>
              <button
                type='button'
                aria-label='Fechar menu'
                onClick={closeMobile}
                className='p-2'
              >
                <X size={22} />
              </button>
              <img src={logoSrc} alt='Logo' className='h-8' />
            </div>
            <div className='p-4'>
              <ul className='flex flex-col gap-2'>
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className='flex items-center gap-2 p-2'
                      onClick={closeMobile}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* --- Usuário Mobile --- */}
              <div className='mt-10'>
                <div className='mb-6 p-6 border rounded-xl bg-primary-light/10 flex flex-col gap-5'>
                  <div className='flex items-center gap-5'>
                    <div className='flex items-center justify-center bg-primary-light rounded-full w-14 h-14'>
                      <User size={32} />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-lg font-bold leading-tight mb-1'>
                        {authUser.name}
                      </span>
                      <span className='text-sm text-primary/80'>
                        {authUser.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      closeMobile();
                      setShowEditProfile(true);
                    }}
                    className='text-sm flex items-center gap-2 mt-3 self-start px-3 py-2 rounded-md hover:bg-primary-accent/30 transition font-medium'
                    type='button'
                  >
                    <EditIcon size={16} />
                    Editar Perfil
                  </button>
                </div>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='w-full flex items-center gap-2 p-3 rounded-md bg-primary-accent mt-2 justify-center text-base'
                >
                  <LogOut size={22} />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {showEditProfile && (
        <EditProfilePopup
          profile={authUser}
          onClose={() => setShowEditProfile(false)}
          onSave={() => setShowEditProfile(false)}
          loading={false}
        />
      )}
    </>
  );
};

export default Sidebar;
