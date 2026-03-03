import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { create, update } from '../redux/slices/clienteSlice';

import { Mail, Phone, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const EditClientPopup = ({
  client = {},
  onClose = () => {},
  onSave = () => {},
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.cliente);

  const firstInputRef = useRef(null);
  const previousFocusRef = useRef(null);

  const [form, setForm] = useState({
    fullName: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    setForm({
      fullName: client.nome || '',
      telefone: client.telefone || '',
      email: client.email || '',
    });
  }, [client]);

  useEffect(() => {
    // Guardar foco anterior
    previousFocusRef.current = document.activeElement;

    // Focar no primeiro input quando o modal abre
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    // Travar scroll do body
    document.body.style.overflow = 'hidden';

    // Fechar com ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Restaurar scroll
      document.body.style.overflow = '';
      // Remover listener
      document.removeEventListener('keydown', handleKeyDown);
      // Restaurar foco anterior
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = async () => {
    try {
      // Guard clauses - validações
      if (!user?.empresa?.id) {
        toast.error('Erro: Empresa não identificada. Faça login novamente.');
        return;
      }

      const fullNameTrimmed = form.fullName.trim();
      if (!fullNameTrimmed || fullNameTrimmed.length === 0) {
        toast.error('Nome completo é obrigatório.');
        return;
      }

      // Validação simples de email (se preenchido)
      if (form.email && form.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
          toast.error('Email inválido. Por favor, verifique o formato.');
          return;
        }
      }

      const clientData = {
        nome: fullNameTrimmed,
        telefone: form.telefone,
        email: form.email,
      };

      if (client.id) {
        await dispatch(
          update({
            empresa_id: user.empresa.id,
            cliente_id: client.id,
            data: clientData,
          }),
        ).unwrap();
      } else {
        await dispatch(
          create({
            empresa_id: user.empresa.id,
            data: clientData,
          }),
        ).unwrap();
      }

      // Chamar callback de sucesso antes de fechar
      onSave();
      handleClose();
    } catch (error) {
      toast.error('Erro ao salvar cliente. Tente novamente.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black/40' onClick={handleClose} />
      <div
        className='bg-white rounded-lg p-6 relative z-10 w-full max-w-md'
        role='dialog'
        aria-modal='true'
        aria-label={client.id ? 'Editar cliente' : 'Cadastrar novo cliente'}
      >
        <div className='flex items-start justify-between mb-4 pb-2 border-b border-gray-200'>
          <h3 className='text-lg font-semibold'>
            {client.id ? 'Editar' : 'Cadastrar'} informações
          </h3>
          <button
            onClick={handleClose}
            aria-label='Fechar'
            className='ml-4 cursor-pointer rounded-full p-1 border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          >
            <X size={18} />
          </button>
        </div>

        <form className='mb-4'>
          <div className='grid grid-cols-2 gap-3 mb-3'>
            <label className='block'>
              <span className='text-xs text-gray-500 mb-1 block'>
                Nome completo
              </span>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                  <User size={16} />
                </span>
                <input
                  ref={firstInputRef}
                  type='text'
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                  placeholder='Ex: João da Silva'
                  className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40 transition'
                />
              </div>
            </label>

            <label className='block'>
              <span className='text-xs text-gray-500 mb-1 block'>Telefone</span>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                  <Phone size={16} />
                </span>
                <input
                  type='text'
                  value={form.telefone}
                  onChange={handleChange('telefone')}
                  placeholder='(99) 99999-9999'
                  className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40 transition'
                />
              </div>
            </label>
          </div>

          <label className='block mb-1'>
            <span className='text-xs text-gray-500 mb-1 block'>Email</span>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <Mail size={16} />
              </span>
              <input
                type='email'
                value={form.email}
                onChange={handleChange('email')}
                placeholder='seu@exemplo.com'
                className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40 transition'
              />
            </div>
          </label>
        </form>

        <div className='grid grid-cols-2 gap-2'>
          <button
            onClick={handleClose}
            className='w-full px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-50 transition'
            type='button'
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className='w-full px-3 py-2 rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed'
            type='button'
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClientPopup;
