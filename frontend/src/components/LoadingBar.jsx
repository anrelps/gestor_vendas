import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const LoadingBar = ({ isLoading }) => {
  const [displayLoading, setDisplayLoading] = useState(false);
  const showTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      // A) Mostrar apenas se loading durar mais de 150ms (evita flicker)
      showTimeoutRef.current = setTimeout(() => {
        setDisplayLoading(true);
      }, 150);
    } else {
      // Limpar timeout de show se ainda não executou
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }

      // C) Manter loading por pelo menos 150ms antes de sumir
      hideTimeoutRef.current = setTimeout(() => {
        setDisplayLoading(false);
      }, 150);
    }

    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isLoading]);

  if (!displayLoading) return null;

  return (
    <div
      role='status'
      aria-live='polite'
      aria-label='Carregando...'
      className='bg-gray-500/70 size-full flex justify-center items-center inset-0 text-white fixed'
      style={{ zIndex: 9999 }}
    >
      {/* B) Texto screen-reader only */}
      <span className='sr-only'>Carregando, por favor aguarde...</span>
      <Loader className='animate-spin [animation-duration:2s] w-10 h-10' />
    </div>
  );
};

export default LoadingBar;
