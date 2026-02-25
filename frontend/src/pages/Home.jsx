// src/pages/Home.jsx
import {
  ArrowRight,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, token, authChecked } = useSelector(
    (state) => state.user,
  );

  if (token && authChecked && isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  const featureCardGlassVariants = [
    'bg-linear-to-br from-white/90 via-violet-50/70 to-white/85 border-violet-300/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_30px_-16px_rgba(139,92,246,0.42)] hover:border-violet-400/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_20px_42px_-16px_rgba(139,92,246,0.46)]',
    'bg-linear-to-br from-white/88 via-purple-50/70 to-white/84 border-purple-300/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_30px_-16px_rgba(147,51,234,0.36)] hover:border-purple-400/55 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_20px_42px_-16px_rgba(147,51,234,0.42)]',
    'bg-linear-to-br from-white/90 via-fuchsia-50/65 to-white/86 border-fuchsia-300/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_30px_-16px_rgba(192,132,252,0.34)] hover:border-fuchsia-400/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_20px_42px_-16px_rgba(192,132,252,0.4)]',
    'bg-linear-to-br from-white/89 via-violet-100/65 to-white/84 border-violet-300/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_30px_-16px_rgba(124,58,237,0.38)] hover:border-violet-400/55 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_20px_42px_-16px_rgba(124,58,237,0.44)]',
  ];

  const featureIconGlassVariants = [
    'bg-linear-to-br from-white/80 via-violet-100/80 to-purple-100/70 border-violet-200/55',
    'bg-linear-to-br from-white/78 via-purple-100/78 to-violet-100/68 border-purple-200/55',
    'bg-linear-to-br from-white/80 via-fuchsia-100/70 to-purple-100/68 border-fuchsia-200/50',
    'bg-linear-to-br from-white/80 via-violet-100/75 to-indigo-100/65 border-violet-200/55',
  ];

  return (
    <>
      <style>{`
        @keyframes drift1 { to { transform: translate(30px, 50px) scale(1.06); } }
        @keyframes drift2 { to { transform: translate(-25px, -35px) scale(1.04); } }
        @keyframes drift3 { to { transform: translate(-40px, 20px) scale(1.08); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(.7); }
        }
        .blob-1 {
          animation: drift1 14s ease-in-out infinite alternate;
        }
        .blob-2 {
          animation: drift2 16s ease-in-out infinite alternate;
        }
        .blob-3 {
          animation: drift3 18s ease-in-out infinite alternate;
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease both;
        }
        .animate-pulse-dot {
          animation: pulse 2s ease infinite;
        }
        .hero-title {
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero-subtitle {
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-buttons {
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .hero-card {
          animation: fadeUp 0.8s 0.45s ease both;
        }
        .hero-features {
          animation: fadeUp 0.8s 0.55s ease both;
        }
        .text-gradient {
          background: linear-gradient(to right, #7c3aed 0%, #9333ea 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .btn-primary-hover:hover svg {
          transform: translateX(3px);
        }
        .noise-overlay::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }
        .hero-radial-glow {
          background: radial-gradient(ellipse 1000px 700px at center 30%, rgba(139, 92, 246, 0.12), rgba(139, 92, 246, 0.05) 50%, transparent);
        }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
        }
        .icon-gradient {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.1));
        }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .stat-card {
          position: relative;
          background: linear-gradient(135deg, #ffffff 0%, #faf9fc 100%);
          border: 1px solid rgba(139, 92, 246, 0.12);
          box-shadow:
            0 1px 3px rgba(139, 92, 246, 0.08),
            0 8px 24px -8px rgba(139, 92, 246, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .sales-card {
          background: linear-gradient(135deg, #fdfcfe 0%, #faf8fd 100%);
          border: 1px solid rgba(139, 92, 246, 0.15);
          box-shadow:
            0 2px 8px -2px rgba(139, 92, 246, 0.1),
            0 12px 32px -12px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
      `}</style>

      <div className='noise-overlay relative min-h-screen overflow-x-hidden bg-linear-to-b from-violet-100/50 via-white to-purple-100/50'>
        {/* Grid overlay sutil */}
        <div
          className='fixed inset-0 pointer-events-none z-0'
          style={{
            backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.04) 1px, transparent 1px)
          `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Blobs - mais visíveis */}
        <div className='blob-1 fixed w-[60vw] h-[60vw] -top-[20%] -left-[15%] rounded-full blur-[100px] pointer-events-none z-0 bg-gradient-radial from-violet-400/20 to-transparent' />
        <div className='blob-2 fixed w-[50vw] h-[50vw] -bottom-[15%] -right-[10%] rounded-full blur-[100px] pointer-events-none z-0 bg-gradient-radial from-purple-400/18 to-transparent' />
        <div className='blob-3 fixed w-[35vw] h-[35vw] top-[30%] left-[55%] rounded-full blur-[90px] pointer-events-none z-0 bg-gradient-radial from-violet-300/15 to-transparent' />

        {/* Camada adicional de luz */}
        <div className='fixed top-0 left-1/2 -translate-x-1/2 w-200 h-150 bg-linear-to-b from-violet-200/30 via-purple-200/20 to-transparent blur-3xl pointer-events-none z-0' />

        {/* Nav */}
        <nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-5 bg-linear-to-br from-white/80 via-violet-50/55 to-white/75 backdrop-blur-2xl backdrop-saturate-150 border-b border-violet-100/50 ring-1 ring-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(139,92,246,0.08),0_12px_30px_-20px_rgba(139,92,246,0.45)]'>
          <div className='flex items-center gap-0'>
            <h1 className='text-2xl font-bold font-lumenz text-violet-600'>
              Lumen
            </h1>
            <span className='text-2xl font-bold font-lumenz text-violet-400'>
              z
            </span>
          </div>
          <Link
            to='/login'
            className='inline-flex items-center justify-center gap-1 px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-[0_2px_8px_-2px_rgba(124,58,237,0.3)] transition-all duration-200 hover:shadow-[0_4px_12px_-3px_rgba(124,58,237,0.4)] hover:-translate-y-0.5'
          >
            Entrar
          </Link>
        </nav>

        {/* Hero */}
        <section className='relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 pb-16'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-wide uppercase rounded-full bg-violet-100/60 border border-violet-300/40 text-violet-700 animate-fade-up'>
            <span className='w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse-dot' />
            Gestão de Vendas · Para Pequenos Negócios
          </div>

          {/* Title */}
          <h1 className='hero-title font-lumenz max-w-5xl'>
            <div className='text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-dark mb-3 leading-[0.95]'>
              Venda mais.
            </div>
            <div className='text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gradient leading-[0.95]'>
              Gerencie melhor.
            </div>
          </h1>

          {/* Subtitle */}
          <p className='hero-subtitle mt-8 max-w-xl text-lg sm:text-xl font-normal text-muted/70 leading-relaxed'>
            O Lumenz reúne clientes, produtos e vendas em um só lugar — simples
            e direto para o seu negócio crescer sem complicação.
          </p>

          {/* CTA Buttons */}
          <div className='hero-buttons flex flex-wrap gap-4 mt-10 justify-center'>
            <Link
              to='/login'
              className='btn-primary-hover inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-[0_4px_16px_-4px_rgba(124,58,237,0.3)] transition-all duration-200 hover:shadow-[0_8px_24px_-6px_rgba(124,58,237,0.4)] hover:-translate-y-0.5'
            >
              Acessar o sistema
              <ArrowRight
                size={18}
                className='transition-transform duration-200'
              />
            </Link>
            <a
              href='#features'
              className='inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-violet-700 rounded-xl bg-white/80 border border-violet-200/60 shadow-[0_2px_8px_-2px_rgba(139,92,246,0.12)] backdrop-blur-xl transition-all duration-200 hover:bg-white hover:border-violet-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-3px_rgba(139,92,246,0.15)]'
            >
              Como funciona
            </a>
          </div>

          {/* UI Preview card */}
          <div className='hero-card relative w-full max-w-xl mt-16'>
            {/* Background glow */}
            <div className='absolute -inset-8 bg-linear-to-br from-violet-200/30 via-purple-200/20 to-violet-200/30 rounded-[48px] blur-2xl -z-10' />

            {/* Card principal */}
            <div className='relative rounded-3xl p-6 sm:p-8 bg-linear-to-br from-white/80 via-violet-50/50 to-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 ring-1 ring-violet-100/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_60px_-12px_rgba(139,92,246,0.25)]'>
              {/* Card Header - dots */}
              <div className='flex items-center gap-2 mb-6'>
                <div className='w-3 h-3 rounded-full bg-red-400' />
                <div className='w-3 h-3 rounded-full bg-yellow-400' />
                <div className='w-3 h-3 rounded-full bg-green-400' />
              </div>

              {/* Stats Grid - sem background, apenas espaçamento */}
              <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='text-center'>
                  <div
                    className='text-3xl sm:text-4xl font-bold mb-1'
                    style={{ color: '#8b5cf6' }}
                  >
                    R$ 1.840
                  </div>
                  <div className='text-xs sm:text-sm text-muted/60 font-medium'>
                    Vendas hoje
                  </div>
                </div>
                <div className='text-center'>
                  <div
                    className='text-3xl sm:text-4xl font-bold mb-1'
                    style={{ color: '#10b981' }}
                  >
                    132
                  </div>
                  <div className='text-xs sm:text-sm text-muted/60 font-medium'>
                    Clientes
                  </div>
                </div>
                <div className='text-center'>
                  <div
                    className='text-3xl sm:text-4xl font-bold mb-1'
                    style={{ color: '#f59e0b' }}
                  >
                    48
                  </div>
                  <div className='text-xs sm:text-sm text-muted/60 font-medium'>
                    Produtos
                  </div>
                </div>
              </div>

              {/* Recent Sales */}
              <div className='rounded-2xl p-5 bg-linear-to-br from-white/70 via-violet-50/55 to-purple-50/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-violet-100/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_30px_-22px_rgba(139,92,246,0.45)]'>
                <div className='text-xs font-bold tracking-wider uppercase text-violet-700 mb-4'>
                  ÚLTIMAS VENDAS
                </div>

                <div className='flex flex-col gap-3'>
                  {[
                    {
                      cliente: 'Maria Silva',
                      produto: 'Camiseta P',
                      valor: 'R$ 59,90',
                      status: 'pago',
                    },
                    {
                      cliente: 'João Souza',
                      produto: 'Calça Jeans',
                      valor: 'R$ 129,90',
                      status: 'pago',
                    },
                    {
                      cliente: 'Ana Costa',
                      produto: 'Tênis Branco',
                      valor: 'R$ 210,00',
                      status: 'pendente',
                    },
                  ].map((v, i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 bg-white/45 border border-white/40'
                    >
                      <div className='flex items-center gap-2.5'>
                        <div className='w-9 h-9 rounded-full bg-linear-to-br from-violet-200/80 to-purple-200/80 flex items-center justify-center text-xs font-bold text-violet-700 shrink-0'>
                          {v.cliente
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <div className='text-sm font-semibold text-dark'>
                            {v.cliente}
                          </div>
                          <div className='text-xs text-muted/60'>
                            {v.produto}
                          </div>
                        </div>
                      </div>
                      <div className='text-right shrink-0'>
                        <div className='text-sm font-bold text-dark mb-0.5'>
                          {v.valor}
                        </div>
                        <div
                          className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${
                            v.status === 'pago'
                              ? 'text-green-700 bg-green-100'
                              : 'text-amber-700 bg-amber-100'
                          }`}
                        >
                          {v.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className='relative z-10 flex items-center gap-6 max-w-4xl mx-auto my-12 sm:my-14 px-6'>
          <div className='flex-1 h-px bg-linear-to-r from-transparent via-violet-300/30 to-transparent' />
          <span className='text-xs font-bold tracking-widest uppercase text-violet-700 whitespace-nowrap'>
            O que você encontra no Lumenz
          </span>
          <div className='flex-1 h-px bg-linear-to-r from-transparent via-violet-300/30 to-transparent' />
        </div>

        {/* Features */}
        <div
          id='features'
          className='hero-features relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto px-6 pb-14 sm:pb-16'
        >
          {[
            {
              icon: Users,
              title: 'Cadastro de Clientes',
              desc: 'Registre e organize sua base de clientes com histórico completo de compras e contatos.',
              color: 'violet',
            },
            {
              icon: Package,
              title: 'Gestão de Produtos',
              desc: 'Controle seu catálogo com preços, descrições e disponibilidade sempre atualizados.',
              color: 'purple',
            },
            {
              icon: ShoppingCart,
              title: 'Registro de Vendas',
              desc: 'Lance vendas rapidamente, vincule ao cliente e acompanhe cada transação em tempo real.',
              color: 'violet',
            },
            {
              icon: TrendingUp,
              title: 'Visão do Negócio',
              desc: 'Acompanhe o faturamento, os produtos mais vendidos e o desempenho geral do seu negócio.',
              color: 'purple',
            },
          ].map((f, idx) => {
            const Icon = f.icon;
            const cardVariant =
              featureCardGlassVariants[idx % featureCardGlassVariants.length];
            const iconVariant =
              featureIconGlassVariants[idx % featureIconGlassVariants.length];
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 backdrop-blur-xl backdrop-saturate-150 border ring-1 ring-white/70 transition-all duration-300 hover:-translate-y-1 group ${cardVariant}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl backdrop-blur-md border ring-1 ring-white/70 flex items-center justify-center text-violet-600 mb-5 transition-all duration-200 group-hover:scale-105 ${iconVariant}`}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div className='font-bold text-lg text-dark mb-2'>
                  {f.title}
                </div>
                <div className='text-sm text-muted/70 leading-relaxed'>
                  {f.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
