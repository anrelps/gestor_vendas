import { Building2, Calendar, Upload, User } from 'lucide-react';
import { useState } from 'react';

const EditarPerfil = () => {
  const [activeTab, setActiveTab] = useState('perfil'); // 'perfil' ou 'empresa'

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
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                        placeholder='Digite sua nova senha'
                      />
                    </div>

                    {/* Confirmar Nova Senha */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Confirmar Nova Senha
                      </label>
                      <input
                        type='password'
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base'
                        placeholder='Confirme sua nova senha'
                      />
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className='flex gap-3 pt-4'>
                  <button className='flex-1 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition'>
                    Cancelar
                  </button>
                  <button className='flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition'>
                    Salvar Alterações
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
                      <Building2 size={32} className='text-gray-400' />
                    </div>
                    {/* Botão Upload */}
                    <div className='flex-1'>
                      <button className='flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition'>
                        <Upload size={18} />
                        <span>Escolher arquivo</span>
                      </button>
                      <p className='text-xs text-gray-500 mt-2'>
                        PNG, JPG ou SVG (máx. 2MB)
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
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-base bg-gray-50'
                        disabled
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        Fim da sua assinatura
                      </p>
                    </div>
                  </div>

                  {/* Status da Assinatura */}
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
                </div>

                {/* Botões de Ação */}
                <div className='flex gap-3 pt-4'>
                  <button className='flex-1 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition'>
                    Cancelar
                  </button>
                  <button className='flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition'>
                    Salvar Alterações
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
