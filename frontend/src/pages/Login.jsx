import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    },
    [isAuthenticated, navigate],
  );

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
    dispatch(
      login({
        email: formData.email,
        password: formData.password,
      }),
    );
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4 overflow-hidden'>
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
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='Digite sua senha'
                      minLength={8}
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='bg-gray-200 px-4 text-gray-500 hover:bg-gray-400 hover:text-white transition-all duration-200 cursor-pointer'
                      aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                    >
                      <i
                        className={`fa-solid ${
                          showPassword ? 'fa-eye-slash' : 'fa-eye'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                disabled={loading}
                className='cursor-pointer bg-primary text-white rounded-md text-2xl h-14 mt-4 flex items-center justify-center disabled:opacity-60'
              >
                {loading ? (
                  <div className='w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
                ) : (
                  'Entrar'
                )}
              </button>

              <div
                className={`rounded flex justify-center py-2 text-sm transition-all duration-200 ${
                  error
                    ? 'bg-red-100 border border-red-400 text-red-700 opacity-100'
                    : 'opacity-0'
                }`}
              >
                {error
                  ? error.includes('401')
                    ? 'E-mail ou Senha incorreto.'
                    : error
                  : '\u00A0'}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
