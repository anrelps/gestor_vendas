import { useDispatch, useSelector } from 'react-redux';
import { create, update } from '../redux/slices/clienteSlice';

import { Mail, Phone, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const EditClientPopup = ({
    client = {},
    onClose = () => {},
    onSave = () => {},
}) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.cliente);

    const [form, setForm] = useState({
        clientId: '',
        fullName: '',
        telefone: '',
        email: '',
    });

    useEffect(() => {
        setForm({
            clientId: client.id || '',
            fullName: client.nome || '',
            telefone: client.telefone || '',
            email: client.email || '',
        });
    }, [client]);

    const handleChange = (key) => (e) =>
        setForm((s) => ({ ...s, [key]: e.target.value }));

    const handleSubmit = async () => {
        try {
            const clientData = {
                nome: form.fullName.trim(),
                telefone: form.telefone,
                email: form.email,
            };

            if(client.id) {
                await dispatch(update({
                    empresa_id: user.empresa.id,
                    cliente_id: client.id,
                    data: clientData,
                })).unwrap();
            } else {
                await dispatch(create({
                    empresa_id: user.empresa.id,
                    data: clientData
                })).unwrap();
            }

            onClose();
        } catch(error) {
            console.log('Error ao salvar cliente: ', error);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-black/40' onClick={onClose} />
            <div className='bg-white rounded-lg p-6 relative z-10 w-full max-w-md'>
                <div className='flex items-start justify-between mb-4 pb-2 border-b border-gray-200'>
                    <h3 className='text-lg font-semibold'>
                        {client.id ? 'Editar' : 'Cadastrar'} informações
                    </h3>
                    <button
                        onClick={onClose}
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
                                    type='text'
                                    value={form.fullName}
                                    onChange={handleChange('fullName')}
                                    placeholder='Ex: João da Silva'
                                    className='w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40 transition'
                                />
                            </div>
                        </label>

                        <label className='block'>
                            <span className='text-xs text-gray-500 mb-1 block'>
                                Telefone
                            </span>
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
                        <span className='text-xs text-gray-500 mb-1 block'>
                            Email
                        </span>
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
                        onClick={onClose}
                        className='w-full px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 cursor-pointer'
                        type='button'
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='w-full px-3 py-2 rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition'
                        type='button'
                        disabled={loading}
                    >
                        { loading ? 'Salvando...' : 'Salvar' }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditClientPopup;
