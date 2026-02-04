// src/pages/Home.jsx
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const bubbles = [
  {
    className: 'absolute top-1/4 left-1/4 w-[32rem] h-[32rem] rounded-full',
    style: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.13) 60%, transparent 100%)',
      filter: 'blur(120px)',
      animation:
        'bubble1 4s cubic-bezier(.4,0,.2,1) infinite alternate-reverse',
      willChange: 'transform',
    },
  },
  {
    className: 'absolute bottom-0 right-1/3 w-[40rem] h-[40rem] rounded-full',
    style: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 60%, transparent 100%)',
      filter: 'blur(140px)',
      animation: 'bubble2 6s cubic-bezier(.4,0,.2,1) infinite alternate',
      willChange: 'transform',
    },
  },
  {
    className: 'absolute top-10 rights-10 w-80 h-80 rounded-full',
    style: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 60%, transparent 100%)',
      filter: 'blur(100px)',
      animation:
        'bubble3 5s cubic-bezier(.4,0,.2,1) infinite alternate-reverse',
      willChange: 'transform',
    },
  },
  {
    className: 'absolute top-1/2 left-10 w-60 h-60 rounded-full',
    style: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.09) 60%, transparent 100%)',
      filter: 'blur(80px)',
      animation: 'bubble4 3.5s cubic-bezier(.4,0,.2,1) infinite alternate',
      willChange: 'transform',
    },
  },
  {
    className: 'absolute bottom-20 left-1/2 w-72 h-72 rounded-full',
    style: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 60%, transparent 100%)',
      filter: 'blur(110px)',
      animation:
        'bubble5 7s cubic-bezier(.4,0,.2,1) infinite alternate-reverse',
      willChange: 'transform',
    },
  },
];

const Home = () => {
  const { isAuthenticated, token, authChecked } = useSelector(
    (state) => state.user,
  );

  // Se usuário já está autenticado, redirecionar para dashboard
  if (token && authChecked && isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-100 via-white to-gray-200'>
      {/* New animated gradient background */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            background:
              'radial-gradient(ellipse at center, #a78bfa33 0%, transparent 70%)',
            animation: 'move1 12s ease-in-out infinite alternate',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            background:
              'radial-gradient(ellipse at center, #818cf833 0%, transparent 70%)',
            animation: 'move2 14s ease-in-out infinite alternate',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: '30vw',
            height: '30vw',
            background:
              'radial-gradient(ellipse at center, #c4b5fd33 0%, transparent 70%)',
            animation: 'move3 16s ease-in-out infinite alternate',
            filter: 'blur(40px)',
          }}
        />
        <style>
          {`
          @keyframes move1 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(40px) scale(1.08);}
          }
          @keyframes move2 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(-30px) scale(1.04);}
          }
          @keyframes move3 {
            0% { transform: translateX(0) scale(1);}
            100% { transform: translateX(-40px) scale(1.1);}
          }
        `}
        </style>
      </div>
      <div className='relative z-10 border border-gray-200 rounded-xl max-w-md w-full mx-auto shadow-md overflow-hidden bg-white bg-opacity-90 transform transition-all duration-300 flex flex-col items-center py-16 px-8'>
        <h1 className='text-2xl font-semibold text-center text-primary mb-6 drop-shadow'>
          Você não está logado.
        </h1>
        <Link
          to='/login'
          className='mt-4 px-8 py-3 bg-primary text-white border-2 border-primary rounded-md text-xl font-semibold shadow hover:bg-white hover:text-primary transition-all duration-200'
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
