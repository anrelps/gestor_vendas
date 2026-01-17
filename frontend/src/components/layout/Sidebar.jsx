import { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const Sidebar = ({ logoSrc, user, navItems, onLogout }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const widthClass = collapsed ? 'w-20' : 'w-64';

    const closeMobile = () => setMobileOpen(false);

    const handleLogout = () => {
        if (onLogout) onLogout();
        closeMobile();
        navigate('/login');
    };

    const homeItem = useMemo(
        () => ({ label: 'Home', to: '/', icon: 'fa-regular fa-house' }),
        []
    );

    return (
        <>
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

            <aside
                className={[
                    'hidden md:flex fixed left-0 top-0 h-full bg-primary text-white',
                    'flex-col items-center',
                    widthClass,
                    'shadow-[4px_0_15px_rgba(0,0,0,0.3)]',
                    'transition-[width] duration-200',
                ].join(' ')}
            >
                <div
                    className={`w-full flex px-2 pt-2 bg-a ${
                        collapsed ? 'justify-center' : 'justify-end'
                    }`}
                >
                    <button
                        type='button'
                        aria-label={
                            collapsed ? 'Expandir menu' : 'Recolher menu'
                        }
                        onClick={() => setCollapsed((v) => !v)}
                        className='h-8 w-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/50 transition-all '
                    >
                        <i
                            className={`fa-solid  ${
                                collapsed
                                    ? 'fa-chevron-right'
                                    : 'fa-chevron-left'
                            } text-sm `}
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
                <SidebarContent
                    variant='desktop'
                    collapsed={collapsed}
                    homeItem={homeItem}
                    navItems={navItems}
                    user={user}
                    onLogout={handleLogout}
                    onNavigate={() => {}}
                />
            </aside>

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

                        <SidebarContent
                            variant='mobile'
                            collapsed={false}
                            homeItem={homeItem}
                            navItems={navItems}
                            user={user}
                            onLogout={handleLogout}
                            onNavigate={closeMobile}
                        />
                    </aside>
                </>
            )}
            <div className='md:hidden h-18' />
            <div
                className={[
                    'hidden md:block',
                    collapsed ? 'ml-20' : 'ml-64',
                ].join(' ')}
            />
        </>
    );
};

const SidebarContent = ({
    variant,
    collapsed,
    homeItem,
    navItems,
    user,
    onLogout,
    onNavigate,
}) => {
    return (
        <>
            <div className={['w-full', collapsed ? 'px-2' : 'px-8'].join(' ')}>
                <div
                    className={
                        // Adiciona mt-8 apenas no mobile (quando variant === 'mobile')
                        'border-b border-gray-500/50 mb-4 pb-4 mt-2 ' +
                        (variant === 'mobile' ? 'mt-8' : '')
                    }
                >
                    <SidebarLink
                        to={homeItem.to}
                        icon={homeItem.icon}
                        label={homeItem.label}
                        collapsed={collapsed}
                        onNavigate={onNavigate}
                    />
                </div>

                <nav className='mt-4'>
                    <ul
                        className={[
                            'text-md flex flex-col gap-2',
                            collapsed ? 'items-stretch' : '',
                        ].join(' ')}
                    >
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <SidebarLink
                                    to={item.to}
                                    icon={item.icon}
                                    label={item.label}
                                    collapsed={collapsed}
                                    onNavigate={onNavigate}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div
                className={['mt-auto w-full', collapsed ? 'px-2' : 'px-4'].join(
                    ' '
                )}
            >
                <UserCard
                    name={user?.name}
                    role={user?.role}
                    editTo={user?.editTo || '/perfil'}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                />

                <button
                    type='button'
                    onClick={onLogout}
                    className={[
                        'w-full flex items-center justify-center gap-2 py-4 mb-2 rounded-lg',
                        'hover:bg-white/10 transition-all duration-200 cursor-pointer text-white',
                    ].join(' ')}
                >
                    <i className='fa-solid fa-arrow-right-from-bracket text-xl' />
                    {!collapsed && <span className='font-medium'>Sair</span>}
                </button>
            </div>
        </>
    );
};

const SidebarLink = ({ to, icon, label, collapsed, onNavigate }) => {
    return (
        <NavLink
            to={to}
            title={collapsed ? label : undefined}
            onClick={onNavigate}
            className={({ isActive }) =>
                [
                    'w-full flex items-center rounded-lg transition-all duration-200',
                    collapsed ? 'justify-center px-0 py-3' : 'p-2',
                    'hover:bg-white/10',
                    isActive ? 'bg-white/10 font-semibold' : 'font-medium',
                ].join(' ')
            }
        >
            <i className={`${icon} w-6 text-center`} />
            {!collapsed && <span className='ml-3'>{label}</span>}
        </NavLink>
    );
};

const UserCard = ({ name, role, editTo, collapsed, onNavigate }) => {
    if (collapsed) {
        return (
            <div className='mb-4 flex justify-center'>
                <NavLink
                    to={editTo}
                    title={`${name || 'Usuário'} • ${role || ''}`}
                    onClick={onNavigate}
                    className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-all'
                >
                    <i className='fa-solid fa-user text-white' />
                </NavLink>
            </div>
        );
    }

    return (
        <div className='bg-linear-to-br from-white to-gray-400 rounded-xl px-4 py-6 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-500'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center'>
                    <i className='fa-solid fa-user text-white' />
                </div>
                <div>
                    <h2 className='font-bold text-sm text-primary leading-tight'>
                        {name || 'Usuário'}
                    </h2>
                    <p className='text-accent text-xs'>{role || ''}</p>
                </div>
            </div>

            <NavLink
                to={editTo}
                onClick={onNavigate}
                className='text-accent text-xs hover:underline flex items-center gap-1 mx-2 mt-4'
            >
                <i className='fa-solid fa-pen-to-square text-[10px]' />
                Editar Perfil
            </NavLink>
        </div>
    );
};

export default Sidebar;
