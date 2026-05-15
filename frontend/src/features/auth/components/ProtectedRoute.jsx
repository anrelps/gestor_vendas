import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, authChecked } = useSelector(
    (state) => state.user,
  );
  if (!token) {
    return <Navigate to='/login' replace />;
  }
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
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default ProtectedRoute;
