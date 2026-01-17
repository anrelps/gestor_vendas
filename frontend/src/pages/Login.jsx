import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4'>
            <div className='border border-gray-200 rounded-xl max-w-md w-full mx-auto shadow-xl overflow-hidden bg-white transform transition-all duration-300 hover:shadow-2xl'>
                <div className='bg-linear-to-r from-primary to-primary/80 p-10'>
                    <h1 className='text-3xl font-bold text-center text-white'>
                        Bem-vindo
                    </h1>
                    <p className='text-white/80 text-center mt-2 text-sm'>
                        Faça login para continuar
                    </p>
                </div>
                <div className='p-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <label className='sr-only' htmlFor='email'>
                                    Email:
                                </label>
                                <div className='flex group'>
                                    <div className='flex flex-col bg-primary px-4 rounded-l-lg items-center justify-center transition-all duration-200'>
                                        <i className='fa-solid fa-envelope text-white text-lg'></i>
                                    </div>
                                    <input
                                        className='px-4 py-3.5 w-full border-2 border-l-0 border-gray-200 rounded-r-lg bg-gray-50 focus:bg-white focus:border-primary focus:outline-none transition-all duration-200'
                                        type='email'
                                        autoComplete='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Digite seu email'
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='sr-only' htmlFor='password'>
                                    Senha:
                                </label>
                                <div className='flex group'>
                                    <div className='flex flex-col bg-primary px-4 rounded-l-lg items-center justify-center transition-all duration-200'>
                                        <i className='fa-solid fa-lock text-white text-lg'></i>
                                    </div>
                                    <div className='flex w-full border-2 border-l-0 border-gray-200 rounded-r-lg overflow-hidden focus-within:border-primary transition-all duration-200'>
                                        <input
                                            className='px-4 py-3.5 w-full bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200'
                                            autoComplete='current-password'
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id='password'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder='Digite sua senha'
                                            required
                                        />
                                        <button
                                            type='button'
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className='bg-gray-200 px-4 text-gray-500 hover:bg-gray-400 hover:text-white transition-all duration-200 cursor-pointer'
                                            aria-label={
                                                showPassword
                                                    ? 'Ocultar senha'
                                                    : 'Mostrar senha'
                                            }
                                        >
                                            <i
                                                className={`fa-solid ${
                                                    showPassword
                                                        ? 'fa-eye-slash'
                                                        : 'fa-eye'
                                                }`}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        id='rememberMe'
                                        name='rememberMe'
                                        checked={formData.rememberMe}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                rememberMe: e.target.checked,
                                            })
                                        }
                                        className='w-4 h-4 cursor-pointer accent-primary'
                                    />
                                    <label
                                        htmlFor='rememberMe'
                                        className='cursor-pointer text-sm text-gray-600'
                                    >
                                        Manter conectado
                                    </label>
                                </div>
                                <a
                                    href='#'
                                    className='text-sm text-primary hover:text-accent hover:underline transition-colors duration-200'
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                            <button
                                className='cursor-pointer bg-primary hover:bg-accent text-white rounded-lg text-lg font-semibold py-3.5 mt-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg'
                                type='submit'
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
