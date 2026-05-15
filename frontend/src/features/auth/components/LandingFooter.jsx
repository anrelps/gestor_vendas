import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingFooter = () => (
  <footer className='relative z-10 mt-8 border-t border-violet-200/30'>
    <div className='mx-auto max-w-6xl px-6 py-12'>

      <div className='flex flex-col sm:flex-row items-start justify-between gap-10'>

        <div className='max-w-xs'>
          <div className='flex items-center gap-0 mb-3'>
            <span className='text-xl font-bold font-lumenz uppercase text-violet-600'>Lumen</span>
            <span className='text-xl font-bold font-lumenz uppercase text-violet-900'>z</span>
          </div>
          <p className='text-sm text-slate-500 leading-relaxed'>
            Gestão de vendas simples e eficiente para pequenos negócios crescerem sem complicação.
          </p>
        </div>

        <div className='flex flex-wrap gap-x-12 gap-y-6'>
          <div>
            <p className='text-xs font-bold tracking-widest uppercase text-violet-700 mb-3'>Produto</p>
            <ul className='flex flex-col gap-2'>
              <li><a href='#features' className='text-sm text-slate-500 hover:text-violet-600 transition-colors'>Funcionalidades</a></li>
              <li><Link to='/login' className='text-sm text-slate-500 hover:text-violet-600 transition-colors'>Entrar</Link></li>
            </ul>
          </div>
          <div>
            <p className='text-xs font-bold tracking-widest uppercase text-violet-700 mb-3'>Portfólio</p>
            <ul className='flex flex-col gap-2'>
              <li>
                <a
                  href='https://github.com/anrelps/gestor_vendas'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors'
                >
                  <Github size={14} />
                  Código-fonte
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/anrelps'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-slate-500 hover:text-violet-600 transition-colors'
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='my-8 h-px bg-linear-to-r from-transparent via-violet-300/30 to-transparent' />

      <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-xs text-slate-400'>
          © {new Date().getFullYear()} Lumenz · Projeto de portfólio
        </p>
        <a
          href='https://github.com/anrelps'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-violet-600 transition-colors'
        >
          <Github size={13} />
          anrelps
        </a>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
