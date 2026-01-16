import logo from '../../assets/logo-teste.svg';

const Sidebar = () => {
    return (
        <div className='fixed left-0 top-0 bg-primary w-64 h-full text-white flex flex-col items-center'>
            <img src={logo} alt='Logo' />
            <div className='w-full px-8'>
                <nav>
                    <div className='text-lg border-b border-gray-500 pb-4 mb-8 flex items-center'>
                        <i className='fa-regular fa-house'></i>
                        <a className='ml-4' href='/'>
                            Home
                        </a>
                    </div>
                    <ul className='text-lg flex flex-col gap-4'>
                        <li>
                            <i className='fa-regular fa-address-card'></i>
                            <a className='ml-4' href='/'>
                                Enderecos
                            </a>
                        </li>
                        <li>
                            <i className='fa-solid fa-arrows-down-to-people'></i>
                            <a className='ml-4' href='/'>
                                Valores
                            </a>
                        </li>
                        <li>
                            <i className='fa-solid fa-bell-concierge'></i>
                            <a className='ml-4' href='/'>
                                Sininho
                            </a>
                        </li>
                        <li>
                            <i className='fa-solid fa-book-bookmark'></i>
                            <a className='ml-4' href='/'>
                                Livros
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='mt-auto'>
                <div className='bg-white rounded-sm px-4 py-8 m-8 shadow-md shadow-black'>
                    <h2 className='font-bold text-lg text-primary text-center'>
                        Flavio Caca-Rato
                    </h2>
                    <p className='text-accent text-md'>Editar Perfil</p>
                </div>
                <div className='flex justify-center items-center gap-2 m-10'>
                    <i className='fa-solid fa-arrow-right-from-bracket text-2xl'></i>
                    <a className='' href='/'>
                        Sair
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
