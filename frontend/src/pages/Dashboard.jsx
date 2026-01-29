import { useSelector } from 'react-redux';
import Layout from '../Layout';
import StatCard from '../components/layout/StatCard';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Layout>
      <div className='flex flex-col items-center w-full'>
        <div className='w-full max-w-5xl mb-8'>
          <div className='rounded-2xl bg-linear-to-r from-primary via-primary-accent to-primary-light p-6 shadow-md border border-primary/20 flex items-center gap-4'>
            <span className='text-3xl'>👋</span>
            <div>
              <div className='text-lg font-semibold text-white drop-shadow'>
                Bem-vindo{user?.nome ? `, ${user.nome}` : ''}!
              </div>
              <div className='text-sm text-white/80'>
                Tenha um ótimo dia e bons negócios!
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center py-16 px-4'>
          <div
            className='relative w-full max-w-5xl rounded-3xl p-10 overflow-hidden
          bg-linear-to-br from-violet-100 via-purple-50 to-violet-200 border border-violet-100
          shadow-[0_40px_90px_rgba(139,92,246,0.10)]'
          >
            <div className='pointer-events-none absolute -top-28 -left-28 h-105 w-105 rounded-full bg-violet-200/40 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-32 -right-24 h-130 w-130 rounded-full bg-purple-200/40 blur-3xl' />

            <div
              className='pointer-events-none absolute inset-0
            bg-[radial-gradient(900px_circle_at_20%_10%,rgba(167,139,250,0.14),transparent_55%),
                radial-gradient(900px_circle_at_85%_75%,rgba(196,181,253,0.13),transparent_60%)]'
            />

            <div
              className='pointer-events-none absolute inset-0 opacity-[0.25]
            bg-[linear-gradient(to_right,rgba(139,92,246,0.06)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(139,92,246,0.06)_1px,transparent_1px)]
            bg-size-[40px_40px]'
            />

            <div className='pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-violet-200' />

            <div className='relative flex items-center justify-between gap-6 mb-10'>
              <div className='min-w-0'>
                <div
                  className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide
                text-slate-700 bg-violet-100 border border-violet-200'
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                  Resumo do mês
                </div>

                <h2 className='mt-3 text-2xl font-semibold tracking-tight text-slate-900'>
                  Vendas Totais / Mês
                </h2>

                <p className='mt-1 text-sm text-slate-600'>
                  Visão rápida do desempenho e valores em aberto.
                </p>
              </div>

              <div className='shrink-0 text-right'>
                <div className='text-xs text-slate-500'>Total geral</div>
                <div className='mt-1 text-3xl font-semibold tracking-tight text-slate-900'>
                  R$ 128.450
                </div>

                <div
                  className='mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
                text-emerald-700 bg-emerald-100 border border-emerald-200'
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                  +12,4% vs mês anterior
                </div>
              </div>
            </div>

            <div className='relative flex flex-wrap gap-6 justify-center'>
              <div
                className='absolute -inset-3 rounded-[28px]
              bg-[linear-gradient(120deg,rgba(167,139,250,0.10),transparent_35%,rgba(196,181,253,0.08))]
              blur-xl opacity-70 pointer-events-none'
              />

              <StatCard label='Total recebido/mês' value='R$ 100.000' />
              <StatCard label='Total pendente/mês' value='R$ 28.450' warning />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
