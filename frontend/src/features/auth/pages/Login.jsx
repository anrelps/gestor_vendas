import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { demoLogin, login } from '../../../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
  };

  const handleDemoLogin = () => {
    dispatch(demoLogin());
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4 overflow-hidden'>
      <div className='border border-gray-200 rounded-xl max-w-md w-full mx-auto shadow-xl overflow-hidden bg-white'>
        {/* Header */}
        <div className='bg-linear-to-r from-primary to-primary/80 px-10 pt-10 pb-8'>
          <h1 className='text-3xl font-bold text-center text-white'>
            Gestor de Vendas
          </h1>
          <p className='text-white/75 text-center mt-2 text-sm leading-relaxed'>
            Sistema de gestão de clientes, produtos e vendas para pequenas
            empresas.
          </p>
        </div>

        <div className='p-8 flex flex-col gap-5'>
          {/* Botão Demo */}
          <button
            type='button'
            onClick={handleDemoLogin}
            disabled={loading}
            className='cursor-pointer w-full h-14 rounded-xl bg-linear-to-r from-primary to-primary/80 text-white font-semibold text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-200 disabled:opacity-60'
          >
            {loading ? (
              <div className='w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin' />
            ) : (
              <>
                <i className='fa-solid fa-rocket text-white/90' />
                Explorar como Visitante
              </>
            )}
          </button>

          <p className='text-center text-xs text-gray-400 -mt-1'>
            Acessa um ambiente de demonstração com dados fictícios.
          </p>

          {/* Separador */}
          <div className='flex items-center gap-3'>
            <div className='flex-1 h-px bg-gray-200' />
            <span className='text-xs text-gray-400 font-medium'>ou</span>
            <div className='flex-1 h-px bg-gray-200' />
          </div>

          {/* Toggle login normal */}
          {!showForm ? (
            <button
              type='button'
              onClick={() => setShowForm(true)}
              className='text-sm text-gray-500 hover:text-primary transition-colors text-center underline underline-offset-2 cursor-pointer'
            >
              Já tenho uma conta
            </button>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex group'>
                <div className='flex flex-col bg-primary px-4 rounded-l-lg items-center justify-center'>
                  <i className='fa-solid fa-envelope text-white text-lg' />
                </div>
                <input
                  className='px-4 py-3.5 w-full border-2 border-l-0 border-gray-200 rounded-r-lg bg-gray-50 focus:bg-white focus:border-primary focus:outline-none transition-all duration-200'
                  type='email'
                  autoComplete='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Digite seu email'
                  required
                />
              </div>

              <div className='flex group'>
                <div className='flex flex-col bg-primary px-4 rounded-l-lg items-center justify-center'>
                  <i className='fa-solid fa-lock text-white text-lg' />
                </div>
                <div className='flex w-full border-2 border-l-0 border-gray-200 rounded-r-lg overflow-hidden focus-within:border-primary transition-all duration-200'>
                  <input
                    className='px-4 py-3.5 w-full bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200'
                    autoComplete='current-password'
                    type={showPassword ? 'text' : 'password'}
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
                      className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='cursor-pointer bg-primary text-white rounded-md text-xl h-12 flex items-center justify-center disabled:opacity-60'
              >
                {loading ? (
                  <div className='w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  'Entrar'
                )}
              </button>

              <div
                className={`rounded flex justify-center py-2 text-sm transition-all duration-200 ${
                  error
                    ? 'bg-red-100 border border-red-400 text-red-700'
                    : 'opacity-0'
                }`}
              >
                {error
                  ? error.includes('401')
                    ? 'E-mail ou Senha incorreto.'
                    : error
                  : ' '}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
