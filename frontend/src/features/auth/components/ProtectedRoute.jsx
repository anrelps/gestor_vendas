import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, authChecked } = useSelector(
    (state) => state.user,
  );

  // Estado 1: Sem token → redirecionar imediatamente
  if (!token) {
    return <Navigate to='/login' replace />;
  }

  // Estado 2: Com token mas ainda não checou → mostrar loading
  if (!authChecked) {
    return (
      <div
        role='status'
        aria-live='polite'
        aria-label='Verificando autenticação...'
        className='flex items-center justify-center min-h-screen bg-gray-50'
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4' />
          <p className='text-sm text-gray-600'>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Estado 3: Checado mas não autenticado → redirecionar
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Estado 4: Autenticado → renderizar children
  return children;
};

export default ProtectedRoute;
