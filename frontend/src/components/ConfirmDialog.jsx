const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
    if (!open) return null;
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black/40' onClick={onCancel} />
            <div className='bg-white rounded-lg p-6 relative z-10 w-full max-w-sm'>
                <h2 className='text-lg font-bold mb-2 text-center'>{title}</h2>
                <p className='mb-4'>{message}</p>
                <div className='flex gap-2 justify-center'>
                    <button
                        className='px-4 py-2 rounded  cursor-pointer border border-gray-200 bg-white text-gray-700'
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className='px-4 py-2 rounded cursor-pointer bg-red-600 text-white transition hover:bg-red-700'
                        onClick={onConfirm}
                    >
                        Remover
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
