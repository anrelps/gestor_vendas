import {
  ChevronLeft,
  Edit as EditIcon,
  LogOut,
  Menu,
  Plus,
  User,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Z_INDEX } from '../../constants/layout';
import {
  logoutUser,
  selectAuthUserDisplayName,
  selectCompanyName,
} from '../../redux/slices/userSlice';

const Sidebar = ({ logoSrc, navItems, collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const drawerRef = useRef(null);
  const authUserName = useSelector(selectAuthUserDisplayName);
  const companyName = useSelector(selectCompanyName);
  const userState = useSelector((state) => state.user.user);
  const empresaState = useSelector((state) => state.empresa.empresa);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = {
    name: authUserName,
    email: userState?.email || '',
    role: empresaState?.nome ?? companyName,
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const toggleSidebar = () => setCollapsed((v) => !v);
  const closeMobile = () => setMobileOpen(false);
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      previousFocusRef.current = document.activeElement;
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeMobile();
          return;
        }
        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          const focusableArray = Array.from(focusableElements);
          const currentIndex = focusableArray.indexOf(document.activeElement);

          if (e.shiftKey) {
            if (currentIndex === 0) {
              e.preventDefault();
              focusableArray[focusableArray.length - 1]?.focus();
            }
          } else {
            if (currentIndex === focusableArray.length - 1) {
              e.preventDefault();
              focusableArray[0]?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      const previousElement = previousFocusRef.current;
      if (
        previousElement instanceof HTMLElement &&
        document.contains(previousElement)
      ) {
        previousElement.focus();
      }
    }
  }, [mobileOpen]);
  const renderMobileHeader = () => (
    <header
      className='md:hidden fixed top-0 left-0 right-0 h-14 bg-primary text-white flex items-center justify-between px-4'
      style={{ zIndex: Z_INDEX.HEADER_MOBILE }}
    >
      <button
        type='button'
        aria-label='Abrir menu'
        onClick={() => setMobileOpen(true)}
        className='p-2 cursor-pointer'
      >
        <Menu size={22} />
      </button>
      <img
        src={logoSrc}
        alt='Logo'
        className={`h-8${mobileOpen ? ' hidden' : ''} cursor-pointer`}
      />
    </header>
  );

  const renderNewVendaButton = () => (
    <div
      className={`p-4 ${collapsed ? 'flex justify-center' : 'flex justify-end'}`}
    >
      <NavLink
        to='/nova-venda'
        title='Nova Venda'
        className={`group relative isolate flex items-center overflow-hidden transition-all duration-200 ease-out active:scale-[0.98]
          ${
            collapsed
              ? 'justify-center w-12 h-12 rounded-full'
              : 'rounded-full py-2.5 px-6'
          }
          bg-white/10 backdrop-blur-xl border border-white/20
          shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]
          hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]
          hover:bg-white/14`}
      >
        <span
          className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
          bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_70%)]'
        />
        <span
          className='pointer-events-none absolute -z-20 left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-white/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-200'
        />

        <Plus
          size={collapsed ? 22 : 26}
          className='transition-transform duration-200 group-hover:rotate-90'
        />
        {!collapsed && (
          <span className='ml-3 whitespace-nowrap font-medium tracking-tight text-white/90'>
            Nova Venda
          </span>
        )}
      </NavLink>
    </div>
  );

  const renderLogo = () => (
    <div className={`p-4 ${collapsed ? 'flex justify-center' : 'm-auto'}`}>
      <img
        src={logoSrc}
        alt='Logo'
        className={collapsed ? 'w-10' : 'h-[clamp(4rem,16vh,12rem)] w-auto'}
      />
      {!collapsed && (
        <div className='mb-[clamp(0.25rem,1.5vh,2.5rem)] text-center'>
          <span className='text-[clamp(1.25rem,2.5vh,2.25rem)] font-bold text-white/90 tracking-tight uppercase font-lumenz'>
            Lumenz
          </span>
        </div>
      )}
    </div>
  );

  const renderNavMenu = () => (
    <div className={`flex-1 ${collapsed ? 'px-2' : 'px-8'}`}>
      <nav>
        <ul
          className={`flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}
        >
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                title={item.label}
                className={({ isActive }) =>
                  collapsed
                    ? `flex items-center justify-center p-2 rounded transition-colors duration-150 hover:bg-primary-accent w-12 h-12 cursor-pointer border${
                        isActive
                          ? ' bg-primary-accent/50 text-white border-white/20'
                          : ' border-transparent'
                      }`
                    : `flex text-lg items-center py-2 rounded-md transition-colors duration-150 hover:bg-primary-light px-4 cursor-pointer border${
                        isActive
                          ? ' bg-primary-light/50 text-white border-white/20'
                          : ' border-transparent'
                      }`
                }
              >
                {item.icon && <item.icon size={collapsed ? 22 : 20} />}
                {!collapsed && <span className='px-4'>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const renderDesktopUserFooter = () => (
    <div
      className={`p-[clamp(0.5rem,1.5vh,1rem)] flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}
    >
      {collapsed ? renderCollapsedFooter() : renderExpandedFooter()}
    </div>
  );

  const renderCollapsedFooter = () => (
    <>

      <div className='mb-4 flex justify-center'>
        <button
          title={`${authUser.name} • ${authUser.role}`}
          onClick={() => navigate('/editar-perfil')}
          className='group relative isolate overflow-hidden p-3 rounded-full cursor-pointer
          bg-transparent
          shadow-none
          border-none
          transition-all duration-200 ease-out active:scale-[0.98]'
          type='button'
        >

          <User size={26} className='text-white/90' />
        </button>
      </div>

      <div className='flex flex-col items-center justify-between w-full h-36'>
        <button
          type='button'
          onClick={handleLogout}
          className='group relative isolate overflow-hidden flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer
          bg-transparent
          shadow-none
          border-none
          transition-all duration-200 ease-out active:scale-[0.98]'
        >

          <LogOut size={22} className='text-white/85' />
        </button>

        <button
          type='button'
          aria-label='Expandir menu'
          onClick={toggleSidebar}
          className='group relative isolate overflow-hidden flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer
          bg-white/10 backdrop-blur-xl border border-white/20
          shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]
          hover:bg-white/14 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]
          transition-all duration-200 ease-out active:scale-[0.98]'
        >
          <span
            className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
            bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.10)_40%,rgba(255,255,255,0)_70%)]'
          />
          <span
            className='pointer-events-none absolute -z-20 left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full
            bg-white/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-200'
          />
          <Menu
            size={20}
            className='text-white/90 transition-transform duration-200 group-hover:rotate-90'
          />
        </button>
      </div>
    </>
  );

  const renderExpandedFooter = () => (
    <>

      <div
        className='group relative isolate overflow-hidden mb-[clamp(0.5rem,1vh,1.5rem)] py-[clamp(0.75rem,1.5vh,1.5rem)] px-[clamp(0.75rem,1.5vw,1.5rem)] rounded-2xl
        bg-white/10 backdrop-blur-2xl border border-white/18
        shadow-[0_6px_18px_-10px_rgba(0,0,0,0.18)]'
      >
        <span
          className='pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.02)_100%)]'
        />
        <span
          className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
          bg-[radial-gradient(120%_90%_at_25%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.10)_38%,rgba(255,255,255,0)_72%)]'
        />
        <span
          className='pointer-events-none absolute -z-20 -right-10 -top-10 h-32 w-32 rounded-full
          bg-white/10 blur-3xl opacity-70'
        />

        <div className='flex items-center gap-4'>
          <div
            className='relative isolate overflow-hidden flex items-center justify-center rounded-full w-[clamp(2rem,4.5vh,3.5rem)] h-[clamp(2rem,4.5vh,3.5rem)]
            bg-white/14 backdrop-blur-xl border border-white/22
            shadow-[0_4px_12px_-8px_rgba(0,0,0,0.14)]'
          >
            <span
              className='pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_70%)]'
            />
            {(empresaState?.logo_url || userState?.empresa?.logo_url) ? (
              <img
                src={empresaState?.logo_url || userState?.empresa?.logo_url}
                alt=''
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='text-[clamp(0.875rem,2vh,1.25rem)] font-bold text-white/90 select-none'>
                {authUser.name?.[0]?.toUpperCase() ?? '?'}
              </span>
            )}
          </div>

          <div className='flex flex-col'>
            <span className='text-lg font-semibold tracking-tight leading-tight text-white/95 mb-1'>
              {authUser.name}
            </span>
            <span className='text-sm text-white/65 font-light'>
              {authUser.role}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/editar-perfil')}
          className='mt-[clamp(0.5rem,1.5vh,1.25rem)] group/btn relative isolate overflow-hidden w-full
          text-sm flex items-center justify-center gap-2 cursor-pointer
          py-[clamp(0.375rem,1vh,0.75rem)] px-5 font-medium rounded-xl
          bg-white/10 backdrop-blur-xl border border-white/18
          shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]
          hover:bg-white/14 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]
          transition-all duration-200 ease-out active:scale-[0.98]'
          type='button'
        >
          <span
            className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200
            bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.10)_40%,rgba(255,255,255,0)_70%)]'
          />
          <EditIcon size={16} className='text-white/85' />
          <span className='text-white/90'>Editar Perfil</span>
        </button>
      </div>

      <div className='mt-2 pt-4 px-2 border-t border-white/15 rounded-xl'>
        <div className='flex gap-6 w-full'>
          <button
            type='button'
            onClick={handleLogout}
            className='group relative isolate overflow-hidden flex items-center justify-center w-12 h-12 min-w-12 min-h-12 rounded-xl cursor-pointer
            bg-white/10 backdrop-blur-xl border border-white/18
            shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]
            hover:bg-white/14 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]
            transition-all duration-200 ease-out active:scale-[0.98]'
          >
            <span
              className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
              bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0)_75%)]'
            />
            <LogOut size={22} className='text-white/85' />
          </button>

          <button
            type='button'
            aria-label='Recolher menu'
            onClick={toggleSidebar}
            className='group relative isolate overflow-hidden flex items-center justify-center w-12 h-12 min-w-12 min-h-12 rounded-xl cursor-pointer ml-auto
            bg-white/10 backdrop-blur-xl border border-white/18
            shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]
            hover:bg-white/14 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]
            transition-all duration-200 ease-out active:scale-[0.98]'
          >
            <span
              className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200
              bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0)_75%)]'
            />
            <ChevronLeft size={22} className='text-white/85' />
          </button>
        </div>
      </div>
    </>
  );

  const renderMobileMenu = () => (
    <>
      {mobileOpen && (
        <>
          <div
            onClick={closeMobile}
            className='md:hidden fixed inset-0 bg-black opacity-50 cursor-pointer'
            style={{ zIndex: Z_INDEX.OVERLAY_MOBILE }}
            aria-hidden='true'
          />
          <div
            ref={drawerRef}
            role='dialog'
            aria-modal='true'
            aria-label='Menu de navegação'
            className='md:hidden fixed top-0 left-0 h-full w-72 overflow-hidden text-white flex flex-col'
            style={{
              zIndex: Z_INDEX.DRAWER_MOBILE,
              background:
                'linear-gradient(160deg, hsl(275, 93%, 24%) 0%, hsl(276, 76%, 31%) 35%, hsl(277, 60%, 38%) 100%)',
            }}
          >

            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div
                className='absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-30'
                style={{
                  background:
                    'radial-gradient(circle, rgba(196, 181, 253, 0.8) 0%, transparent 70%)',
                }}
              />
              <div
                className='absolute -bottom-32 -left-32 w-72 h-72 rounded-full opacity-25'
                style={{
                  background:
                    'radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 65%)',
                }}
              />
              <div
                className='absolute top-1/3 -left-16 w-56 h-64 rounded-full opacity-15 blur-2xl'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(196, 181, 253, 0.5) 0%, rgba(139, 92, 246, 0.25) 100%)',
                  transform: 'rotate(-25deg)',
                }}
              />

              <div
                className='absolute top-1/2 right-0 w-32 h-32 rounded-full opacity-20 blur-xl'
                style={{
                  background:
                    'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
                }}
              />

              <div
                className='absolute top-0 left-1/4 h-full w-20 opacity-8'
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  filter: 'blur(20px)',
                }}
              />

              <div
                className='absolute inset-0 opacity-5'
                style={{
                  backgroundImage: `linear-gradient(90deg, transparent 1px, rgba(255,255,255,0.1) 1px),
                                   linear-gradient(0deg, transparent 1px, rgba(255,255,255,0.1) 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />

              <div
                className='absolute inset-0 opacity-3'
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,0.05) 0px,
                    rgba(255,255,255,0.05) 2px,
                    transparent 2px,
                    transparent 8px
                  )`,
                }}
              />
            </div>

            <div className='relative z-10 flex flex-col h-full'>
              {renderMobileMenuHeader()}
              {renderMobileMenuItems()}
              {renderMobileUserSection()}
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderMobileMenuHeader = () => (
    <div className='h-14 flex items-center justify-between px-4'>
      <button
        ref={closeButtonRef}
        type='button'
        aria-label='Fechar menu de navegação'
        onClick={closeMobile}
        className='p-2 cursor-pointer'
      >
        <X size={22} />
      </button>
      <img src={logoSrc} alt='Logo' className='h-8' />
    </div>
  );

  const renderMobileMenuItems = () => (
    <>
      <div
        className='mx-auto my-0 w-3/4 h-px rounded-full'
        style={{
          background:
            'linear-gradient(90deg, rgba(167,139,250,0.10) 0%, rgba(196,181,253,0.18) 50%, rgba(167,139,250,0.10) 100%)',
        }}
      />

      <div className='p-4'>
        <ul className='flex flex-col gap-2'>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className='flex items-center gap-2 p-2 cursor-pointer'
                onClick={closeMobile}
              >
                {item.icon && <item.icon size={20} />}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderMobileUserSection = () => (
    <div className='p-4 flex flex-col'>
      <div className='mt-10 flex flex-col items-center'>
        <div
          className='group relative isolate overflow-hidden w-full max-w-xs rounded-2xl p-5 flex flex-col items-center gap-4
          bg-white/10 backdrop-blur-2xl border border-white/18
          shadow-[0_6px_18px_-10px_rgba(0,0,0,0.18)]'
        >
          <span
            className='pointer-events-none absolute -z-10
              bg-[radial-gradient(100%_100%_at_50%_0%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]
              inset-0'
          />
          <span
            className='pointer-events-none absolute -z-20 -right-10 -top-10 h-32 w-32 rounded-full
            bg-white/10 blur-3xl opacity-70'
          />

          <div
            className='relative isolate overflow-hidden flex items-center justify-center rounded-full w-14 h-14
            bg-white/14 backdrop-blur-xl border border-white/22
            shadow-[0_4px_12px_-8px_rgba(0,0,0,0.14)]'
          >
            <span
              className='pointer-events-none absolute inset-0 -z-10
                bg-[radial-gradient(100%_100%_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)]'
            />
            {(empresaState?.logo_url || userState?.empresa?.logo_url) ? (
              <img
                src={empresaState?.logo_url || userState?.empresa?.logo_url}
                alt=''
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='text-xl font-bold text-white/90 select-none'>
                {authUser.name?.[0]?.toUpperCase() ?? '?'}
              </span>
            )}
          </div>

          <div className='flex flex-col items-center'>
            <span className='text-lg font-bold text-white mb-1'>
              {authUser.name}
            </span>
            <span className='text-sm text-white/70 font-light'>
              {authUser.role}
            </span>
          </div>

          <button
            onClick={() => {
              closeMobile();
              navigate('/editar-perfil');
            }}
            className='group/edit relative isolate overflow-hidden mt-2 text-sm flex items-center gap-2 px-4 py-2 rounded-md
              bg-white/10 backdrop-blur-xl border border-white/18 text-white font-medium
              hover:bg-white/14 hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.25)]
              transition-all duration-150 cursor-pointer'
            type='button'
          >
            <span
              className='pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200
                bg-[radial-gradient(100%_100%_at_50%_0%,rgba(255,255,255,0.15)_0%,transparent_70%)]'
            />
            <EditIcon size={16} />
            Editar Perfil
          </button>
        </div>

        <button
          type='button'
          onClick={handleLogout}
          className='w-full flex items-center gap-2 p-3 rounded-md mt-6 justify-center text-base cursor-pointer
            text-white
            hover:bg-white/5
            transition-all duration-150'
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {renderMobileHeader()}

      <div
        className='hidden md:flex fixed left-0 top-0 h-full overflow-hidden text-white flex-col'
        style={{
          width: 'var(--sidebar-width)',
          zIndex: Z_INDEX.SIDEBAR_DESKTOP,
          background:
            'linear-gradient(160deg, hsl(275, 93%, 24%) 0%, hsl(276, 76%, 31%) 35%, hsl(277, 60%, 38%) 100%)',
        }}
      >

        <div className='absolute inset-0 overflow-hidden pointer-events-none'>

          <div
            className='absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30'
            style={{
              background:
                'radial-gradient(circle, rgba(196, 181, 253, 0.8) 0%, transparent 70%)',
            }}
          />

          <div
            className='absolute -bottom-48 -left-48 w-96 h-96 rounded-full opacity-25'
            style={{
              background:
                'radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, transparent 65%)',
            }}
          />

          <div
            className='absolute top-1/4 -left-24 w-80 h-96 rounded-full opacity-15 blur-3xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(196, 181, 253, 0.5) 0%, rgba(139, 92, 246, 0.25) 100%)',
              transform: 'rotate(-25deg)',
            }}
          />

          <div
            className='absolute top-12 right-8 w-32 h-32 rounded-full opacity-20 blur-2xl'
            style={{
              background:
                'radial-gradient(circle, rgba(196, 181, 253, 0.7) 0%, transparent 70%)',
            }}
          />

          <div
            className='absolute top-1/2 left-1/3 w-40 h-40 rounded-full opacity-15 blur-2xl'
            style={{
              background:
                'radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
            }}
          />

          <div
            className='absolute -bottom-16 right-1/4 w-48 h-48 rounded-full opacity-12 blur-3xl'
            style={{
              background:
                'radial-gradient(circle, rgba(196, 181, 253, 0.4) 0%, transparent 65%)',
            }}
          />

          <div
            className='absolute top-1/4 right-1/3 w-20 h-20 rounded-full opacity-25 blur-xl'
            style={{
              background:
                'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
            }}
          />

          <div
            className='absolute inset-0 opacity-5'
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 1px, rgba(255,255,255,0.1) 1px),
                               linear-gradient(0deg, transparent 1px, rgba(255,255,255,0.1) 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div
            className='absolute inset-0 opacity-3'
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.05) 0px,
                rgba(255,255,255,0.05) 2px,
                transparent 2px,
                transparent 10px
              )`,
            }}
          />

          <div
            className='absolute top-0 left-1/3 h-full w-32 opacity-10'
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />

          <div
            className='absolute top-1/3 left-0 right-0 h-20 opacity-8'
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(196, 181, 253, 0.15) 50%, transparent 100%)',
              filter: 'blur(30px)',
            }}
          />

          <div
            className='absolute inset-0 opacity-40'
            style={{
              background:
                'radial-gradient(ellipse 800px 600px at 100% 0%, rgba(196, 181, 253, 0.2) 0%, transparent 60%)',
            }}
          />

          <div
            className='absolute inset-0 opacity-30'
            style={{
              background:
                'radial-gradient(ellipse 800px 600px at 0% 100%, rgba(167, 139, 250, 0.15) 0%, transparent 60%)',
            }}
          />

          <div
            className='absolute inset-0 opacity-20'
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(196, 181, 253, 0.1) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className='relative z-10 flex flex-col h-full overflow-y-auto'>
          {renderNewVendaButton()}
          {renderLogo()}
          {renderNavMenu()}
          {renderDesktopUserFooter()}
        </div>
      </div>

      {renderMobileMenu()}
    </>
  );
};

export default Sidebar;
