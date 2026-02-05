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
  logout,
  selectAuthUserDisplayName,
  selectCompanyName,
} from '../../redux/slices/userSlice';
import EditProfilePopup from '../EditProfilePopup';

const Sidebar = ({ logoSrc, navItems, collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const drawerRef = useRef(null);
  const authUserName = useSelector(selectAuthUserDisplayName);
  const companyName = useSelector(selectCompanyName);
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = {
    name: authUserName,
    email: userState?.email || '',
    role: companyName,
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleSidebar = () => setCollapsed((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  // Gerenciar scroll, ESC, foco, focus trap e acessibilidade do drawer mobile
  useEffect(() => {
    if (mobileOpen) {
      // Bloquear scroll
      document.body.style.overflow = 'hidden';

      // Salvar foco anterior
      previousFocusRef.current = document.activeElement;

      // Focar no botão de fechar (foco inicial)
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);

      const handleKeyDown = (e) => {
        // ESC fecha o drawer
        if (e.key === 'Escape') {
          closeMobile();
          return;
        }

        // Focus trap: Tab dentro do drawer
        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          const focusableArray = Array.from(focusableElements);
          const currentIndex = focusableArray.indexOf(document.activeElement);

          if (e.shiftKey) {
            // Shift+Tab no primeiro elemento -> ir para o último
            if (currentIndex === 0) {
              e.preventDefault();
              focusableArray[focusableArray.length - 1]?.focus();
            }
          } else {
            // Tab no último elemento -> ir para o primeiro
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
      // Restaurar foco anterior ao fechar (com validações robustas)
      const previousElement = previousFocusRef.current;
      if (
        previousElement instanceof HTMLElement &&
        document.contains(previousElement)
      ) {
        previousElement.focus();
      }
    }
  }, [mobileOpen]);

  // Funções render para reduzir parede de JSX
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
        className={collapsed ? 'w-10' : 'size-48'}
      />
      {!collapsed && (
        <div className='mb-10 text-center'>
          <span className='text-4xl font-bold text-white/90 tracking-tight uppercase font-(family-name:--font-lumenzia)'>
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
      className={`p-4 flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}
    >
      {collapsed ? renderCollapsedFooter() : renderExpandedFooter()}
    </div>
  );

  const renderCollapsedFooter = () => (
    <>
      {/* Botão Perfil */}
      <div className='mb-4 flex justify-center'>
        <button
          title={`${authUser.name} • ${authUser.role}`}
          onClick={() => setShowEditProfile(true)}
          className='group relative isolate overflow-hidden p-3 rounded-full cursor-pointer
          bg-transparent
          shadow-none
          border-none
          transition-all duration-200 ease-out active:scale-[0.98]'
          type='button'
        >
          {/* Removido acentos visuais */}
          <User size={26} className='text-white/90' />
        </button>
      </div>

      {/* Colapsado: Sair em cima, Abrir em baixo */}
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
          {/* Removido acentos visuais */}
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
      {/* Card Usuário (glass) */}
      <div
        className='group relative isolate overflow-hidden mb-6 py-6 px-6 rounded-2xl
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
            className='relative isolate overflow-hidden flex items-center justify-center rounded-full w-14 h-14
            bg-white/14 backdrop-blur-xl border border-white/22
            shadow-[0_4px_12px_-8px_rgba(0,0,0,0.14)]'
          >
            <span
              className='pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_70%)]'
            />
            <User size={30} className='text-white/90' />
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
          onClick={() => setShowEditProfile(true)}
          className='mt-5 group/btn relative isolate overflow-hidden w-full
          text-sm flex items-center justify-center gap-2 cursor-pointer
          py-3 px-5 font-medium rounded-xl
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

      {/* Borda bonita/arredondada acima dos botões */}
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
            className='md:hidden fixed top-0 left-0 h-full w-72 bg-primary text-white flex flex-col'
            style={{ zIndex: Z_INDEX.DRAWER_MOBILE }}
          >
            {renderMobileMenuHeader()}
            {renderMobileMenuItems()}
            {renderMobileUserSection()}
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
            <User size={26} className='text-white' />
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
              setShowEditProfile(true);
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

      {/* Sidebar Desktop */}
      <div
        className='hidden md:flex fixed left-0 top-0 h-full bg-linear-60 from-primary bg-primary-accent text-white flex-col'
        style={{
          width: 'var(--sidebar-width)',
          zIndex: Z_INDEX.SIDEBAR_DESKTOP,
        }}
      >
        {renderNewVendaButton()}
        {renderLogo()}
        {renderNavMenu()}
        {renderDesktopUserFooter()}
      </div>

      {renderMobileMenu()}

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
