import { Building2, Calendar, Upload, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { updateEmpresa } from '../../../redux/slices/empresaSlice';
import { changePassword, updateUser } from '../../../redux/slices/userSlice';

const EditarPerfil = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const { loading: loadingEmpresa } = useSelector((state) => state.empresa);

  const [activeTab, setActiveTab] = useState('perfil'); // 'perfil' ou 'empresa'

  // Profile data
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [telefone, setTelefone] = useState(user.telefone ?? '');
  const [actualPassword, setActualPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Company data
  const [empresaNome, setEmpresaNome] = useState(user.empresa.nome);
  const [empresaEmail, setEmpresaEmail] = useState(user.empresa.email ?? '');
  const [empresaTelefone, setEmpresaTelefone] = useState(
    user.empresa.telefone ?? '',
  );
  const [empresaLogoPreview, setEmpresaLogoPreview] = useState(
    user.empresa.logo_url ?? null,
  );
  const [empresaLogoFile, setEmpresaLogoFile] = useState(null);

  const fileInputRef = useRef(null);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setEmpresaLogoPreview(previewUrl);
      setEmpresaLogoFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (confirmPassword !== password) {
      setPasswordConfirmationError('As senhas precisam ser iguais.');
    } else {
      setPasswordConfirmationError('');
    }
  }, [confirmPassword]);

  const handleEditProfileSubmit = async () => {
    try {
      const data = {
        nome: nome,
        telefone: telefone,
        email: email,
      };
      await dispatch(updateUser({ user_id: user.id, data })).unwrap();

      if (password.length > 0) {
        const passwordData = {
          actualPassword,
          password,
          password_confirmation: confirmPassword,
        };
        await dispatch(
          changePassword({ user_id: user.id, data: passwordData }),
        ).unwrap();
      }
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil. Tente novamente.');
      console.error('Profile update error:', error);
    }
  };

  const handleEditCompanySubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nome', empresaNome);
      formData.append('email', empresaEmail);
      formData.append('telefone', empresaTelefone);
      if (empresaLogoFile) {
        formData.append('logo', empresaLogoFile);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await dispatch(
        updateEmpresa({ empresa_id: user.empresa.id, data: formData }),
      ).unwrap();
      toast.success('Empresa atualizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar empresa. Tente novamente.');
      console.error('Company update error:', error);
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto'>
      {/* Container Unificado */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        {/* Container de Abas com borda */}
        <div className='flex justify-center mb-6'>
          <div className='flex gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200 w-full'>
            {/* Aba: Editar Perfil */}
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'perfil'
                  ? 'bg-white text-primary shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={18} />
              <span>Editar Perfil</span>
            </button>

            {/* Aba: Editar Empresa */}
            <button
              onClick={() => setActiveTab('empresa')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'empresa'
                  ? 'bg-white text-primary shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 size={18} />
              <span>Editar Empresa</span>
            </button>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div>
          {activeTab === 'perfil' && (
            <div>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Editar Perfil
              </h2>

              {/* Formulário de Perfil */}
              <div className='space-y-5'>
                {/* Nome */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Nome
                  </label>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type='text'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                    placeholder='Seu nome completo'
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                    placeholder='seu.email@exemplo.com'
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Telefone
                  </label>
                  <input
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    type='tel'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                    placeholder='(00) 00000-0000'
                  />
                </div>

                {/* Separador - Troca de Senha */}
                <div className='pt-4 border-t border-gray-200'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    Alterar Senha
                  </h3>

                  <div className='space-y-4'>
                    {/* Senha Atual */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Senha Atual
                      </label>
                      <input
                        type='password'
                        onChange={(e) => setActualPassword(e.target.value)}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                        placeholder='Digite sua senha atual'
                      />
                    </div>

                    {/* Nova Senha */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Nova Senha
                      </label>
                      <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                        placeholder='Digite sua nova senha'
                      />
                      {passwordConfirmationError.length > 0 && (
                        <p className='text-xs text-red-600'>
                          {passwordConfirmationError}
                        </p>
                      )}
                    </div>

                    {/* Confirmar Nova Senha */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Confirmar Nova Senha
                      </label>
                      <input
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                        placeholder='Confirme sua nova senha'
                      />
                      {passwordConfirmationError.length > 0 && (
                        <p className='text-xs text-red-600'>
                          {passwordConfirmationError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className='flex gap-3 pt-4'>
                  <button className='flex-1 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition cursor-pointer'>
                    Cancelar
                  </button>
                  <button
                    onClick={handleEditProfileSubmit}
                    className='flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition cursor-pointer'
                    disabled={loading}
                  >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'empresa' && (
            <div>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Editar Empresa
              </h2>

              {/* Formulário de Empresa */}
              <div className='space-y-5'>
                {/* Nome */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Nome da Empresa
                  </label>
                  <input
                    type='text'
                    value={empresaNome}
                    onChange={(e) => setEmpresaNome(e.target.value)}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                    placeholder='Nome da sua empresa'
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email da Empresa
                  </label>
                  <input
                    type='email'
                    value={empresaEmail}
                    onChange={(e) => setEmpresaEmail(e.target.value)}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                    placeholder='contato@empresa.com'
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Telefone da Empresa
                  </label>
                  <input
                    type='tel'
                    value={empresaTelefone}
                    onChange={(e) => setEmpresaTelefone(e.target.value)}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                    placeholder='(00) 00000-0000'
                  />
                </div>

                {/* Logomarca */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Logomarca
                  </label>
                  <div className='flex items-center gap-4'>
                    {/* Preview da Logo */}
                    <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50'>
                      {empresaLogoPreview && empresaLogoPreview !== '' ? (
                        <img
                          src={empresaLogoPreview}
                          alt={empresaNome + ' Logo'}
                        />
                      ) : (
                        <Building2 size={32} className='text-gray-400' />
                      )}
                    </div>
                    {/* Botão Upload */}
                    <div className='flex-1'>
                      {/* Input escondido */}
                      <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />

                      <button
                        type='button'
                        onClick={handleButtonClick}
                        className='flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition'
                      >
                        <Upload size={18} />
                        <span>Escolher arquivo</span>
                      </button>

                      <p className='text-xs text-gray-500 mt-2'>
                        PNG, JPG ou SVG (máx. 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Separador - Assinatura */}
                <div className='pt-4 border-t border-gray-200'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                    <Calendar size={20} />
                    Período da Assinatura
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Data de Início */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Data de Início
                      </label>
                      <input
                        type='date'
                        value={user.empresa.data_inicio_assinatura.slice(0, 10)}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base bg-gray-50'
                        disabled
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        Início da sua assinatura
                      </p>
                    </div>

                    {/* Data de Fim */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Data de Término
                      </label>
                      <input
                        type='date'
                        value={user.empresa.data_fim_assinatura.slice(0, 10)}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base bg-gray-50'
                        disabled
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        Fim da sua assinatura
                      </p>
                    </div>
                  </div>

                  {/* Status da Assinatura */}
                  {new Date(user.empresa.data_fim_assinatura) < new Date() ? (
                    <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                        <span className='text-sm font-medium text-red-800'>
                          Assinatura Expirada
                        </span>
                      </div>
                      <p className='text-xs text-red-700 mt-1'>
                        Parece que sua assinatura expirou. Que tal renovar agora
                        para não perder o acesso aos seus recursos?
                      </p>
                    </div>
                  ) : (
                    <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                        <span className='text-sm font-medium text-green-800'>
                          Assinatura Ativa
                        </span>
                      </div>
                      <p className='text-xs text-green-700 mt-1'>
                        Sua assinatura está ativa e funcionando normalmente.
                      </p>
                    </div>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className='flex gap-3 pt-4'>
                  <button className='flex-1 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition cursor-pointer'>
                    Cancelar
                  </button>
                  <button
                    onClick={handleEditCompanySubmit}
                    className='flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition cursor-pointer'
                    disabled={loadingEmpresa}
                  >
                    {loadingEmpresa ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;
