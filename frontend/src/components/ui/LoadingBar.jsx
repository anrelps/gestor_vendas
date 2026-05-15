import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const LoadingBar = ({ isLoading }) => {
  const [displayLoading, setDisplayLoading] = useState(false);
  const showTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      showTimeoutRef.current = setTimeout(() => {
        setDisplayLoading(true);
      }, 150);
    } else {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
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

      <span className='sr-only'>Carregando, por favor aguarde...</span>
      <Loader className='animate-spin [animation-duration:2s] w-10 h-10' />
    </div>
  );
};

export default LoadingBar;
