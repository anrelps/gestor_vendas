import { useEffect, useRef } from 'react';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  const cancelButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement;

    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={onCancel} />
      <div
        className='bg-white rounded-lg p-6 relative z-10 w-full max-w-sm'
        role='dialog'
        aria-modal='true'
        aria-label={title}
      >
        <h2 className='text-lg font-bold mb-2 text-center'>{title}</h2>
        <p className='mb-4'>{message}</p>
        <div className='flex gap-2 justify-center'>
          <button
            ref={cancelButtonRef}
            className='px-4 py-2 rounded cursor-pointer border border-gray-200 bg-white text-gray-700'
            onClick={onCancel}
            type='button'
          >
            Cancelar
          </button>
          <button
            className='px-4 py-2 rounded cursor-pointer bg-red-600 text-white transition hover:bg-red-700'
            onClick={onConfirm}
            type='button'
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
