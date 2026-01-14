function Login() {
    return (
        <>
            <div className='border border-gray-200 rounded-lg max-w-md mt-10 mx-auto shadow overflow-hidden'>
                <h1 className='text-4xl text-center p-8 bg-primary text-white  '>
                    Acessar
                </h1>
                <div className='pt-10 pb-8 overflow-hidden'>
                    <form action='' className=''>
                        <div className='flex flex-col gap-4 px-10'>
                            <label className='sr-only' htmlFor='username'>
                                Usuário:
                            </label>
                            <div className='flex'>
                                <div className='flex flex-col bg-primary px-3 rounded-l-lg align-center justify-center'>
                                    <i class='fa-solid fa-user text-white text-xl'></i>
                                </div>
                                <input
                                    className='px-4 py-3 w-full border border-gray-400 rounded-r-lg bg-gray-100'
                                    type='text'
                                    id='username'
                                    name='username'
                                    placeholder='Usuário'
                                    required
                                />
                            </div>
                            <label className='sr-only' htmlFor='password'>
                                Senha:
                            </label>
                            <div className='flex'>
                                <div className='flex flex-col bg-primary px-3 rounded-l-lg align-center justify-center'>
                                    <i className='fa-solid fa-key text-white text-xl'></i>
                                </div>
                                <input
                                    className='border px-4 py-3 w-full border-gray-400     rounded-r-lg bg-gray-100'
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Senha'
                                    required
                                />
                            </div>
                            <button
                                className='cursor-pointer bg-primary text-white rounded-md text-2xl py-2 mt-8'
                                type='submit'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
