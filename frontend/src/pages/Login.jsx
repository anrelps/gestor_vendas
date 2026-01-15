import { useState } from 'react';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Usuário digitou:', formData);
    };

    return (
        <>
            <div className='border border-gray-200 rounded-lg max-w-md mt-10 mx-auto shadow overflow-hidden'>
                <h1 className='text-4xl text-center p-8 bg-primary text-white  '>
                    Acessar
                </h1>
                <div className='pt-10 pb-8 overflow-hidden'>
                    <form onSubmit={handleSubmit} className=''>
                        <div className='flex flex-col gap-4 px-10'>
                            <label className='sr-only' htmlFor='username'>
                                Email:
                            </label>
                            <div className='flex'>
                                <div className='flex flex-col bg-primary px-3 rounded-l-lg align-center justify-center'>
                                    <i className='fa-solid fa-user text-white text-xl'></i>
                                </div>
                                <input
                                    className='px-4 py-3 w-full border border-gray-400 rounded-r-lg bg-gray-100'
                                    type='email'
                                    autoComplete='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Email'
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
                                <div className='flex w-full border border-gray-400 rounded-r-lg overflow-hidden'>
                                    <input
                                        className='px-4 py-3 w-full  bg-gray-100'
                                        autoComplete='current-password'
                                        type={
                                            showPassword ? 'text' : 'password'
                                        } // ← alterar esta linha
                                        id='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Senha'
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className='bg-gray-300 px-3 rounded-r-lg text-white hover:bg-accent'
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
                                    className='w-4 h-4 cursor-pointer'
                                />
                                <label
                                    htmlFor='rememberMe'
                                    className='cursor-pointer'
                                >
                                    Manter conectado
                                </label>
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
