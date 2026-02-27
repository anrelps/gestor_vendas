import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// Components
import DonutChart from '../components/charts/DonutChart';

// Redux
import { getLucroSemanal, getResumoFinanceiro, getResumoMes } from '../redux/slices/chartSlice';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user.user);

  const { lucroSemanal, resumoFinanceiro, resumoMes } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getLucroSemanal());
    dispatch(getResumoFinanceiro());
    dispatch(getResumoMes());
  }, [dispatch]);

  const [activeBar, setActiveBar] = useState(null);

  const percentualMesAnterior = ((resumoMes.atual - resumoMes.anterior) / (resumoMes.anterior || 1)) * 100;
  
  return (
    <div className='w-full'>
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        <div className='rounded-2xl bg-linear-to-r from-primary via-primary-accent to-primary-light p-6 shadow-md border border-primary/20 flex items-center gap-4'>
          <span className='text-3xl'>👋</span>
          <div>
            <div className='text-lg font-semibold text-white drop-shadow'>
              Bem-vindo{user?.nome ? `, ${user.nome}` : ''}!
            </div>
            <div className='text-sm text-white/80'>
              Tenha um ótimo dia e boas vendas!
            </div>
          </div>
        </div>

        <section className='flex justify-center items-center'>
          <div
            className='relative w-full rounded-3xl p-10 overflow-hidden
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

            <div className='relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
              <div className='min-w-0'>
                <div
                  className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide
                  text-slate-700 bg-violet-100 border border-violet-200'
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                  Resumo do mês
                </div>

                <h2 className='mt-3 text-2xl font-semibold tracking-tight text-slate-900'>
                  Total Recebido / Mês
                </h2>

                <p className='mt-1 text-sm text-slate-600'>
                  Visão rápida do desempenho e valores.
                </p>
              </div>

              <div className='shrink-0 text-right'>
                <div className='text-xs text-slate-500'>Total pago</div>
                <div className='mt-1 text-3xl font-semibold tracking-tight text-slate-900'>
                  {currencyFormatter.format(resumoMes.atual)}
                </div>
                {/*}
                <div
                  className='mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
                  text-emerald-700 bg-emerald-100 border border-emerald-200'
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                  +{percentualMesAnterior.toFixed(2)}% vs mês anterior
                </div>
                */}
                <div
                  className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
                    ${percentualMesAnterior > 0
                      ? 'text-emerald-700 bg-emerald-100 border border-emerald-200'
                      : percentualMesAnterior < 0
                        ? 'text-red-700 bg-red-100 border border-red-200'
                        : 'text-slate-500 bg-slate-100 border border-slate-200'
                    }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full 
                    ${percentualMesAnterior > 0 ? 'bg-emerald-500' : percentualMesAnterior < 0 ? 'bg-red-500' : 'bg-slate-400'}`} 
                  />
                  {percentualMesAnterior > 0 ? '+' : ''}{percentualMesAnterior.toFixed(2)}% vs mês anterior
                </div>
              </div>
            </div>

            <div className='relative mt-10 flex flex-col gap-6 sm:flex-row sm:justify-center'>
              <div
                className='absolute -inset-3 rounded-[28px]
                bg-[linear-gradient(120deg,rgba(167,139,250,0.10),transparent_35%,rgba(196,181,253,0.08))]
                blur-xl opacity-70 pointer-events-none'
              />
            </div>
          </div>
        </section>

        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-slate-700'>
                Receita semanal
              </h3>
              <span className='text-xs text-slate-400'>Semana Atual</span>
            </div>
            <div className='mt-4 flex items-end gap-2 h-36'>
              {Object.keys(lucroSemanal).map((dia, index) => {
                const maxValue = Math.max(...Object.values(lucroSemanal));
                const normalizedHeight = maxValue > 0 ? (lucroSemanal[dia] / maxValue) * 100 : 0;
                const valor = parseFloat(lucroSemanal[dia]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const isActive = activeBar === index;

                return (
                  <div
                    key={`bar-${index}`} 
                    className='relative flex-1 flex flex-col items-center justify-end h-full group'
                    onClick={() => setActiveBar(isActive ? null : index)}
                    onMouseEnter={() => setActiveBar(index)}
                    onMouseOut={() => setActiveBar(null)}
                  >
                    {/* Tooltip */}
                    {isActive && (
                      <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 bg-slate-800 text-white text-[10px] font-medium rounded-lg px-2 py-1 whitespace-nowrap shadow-lg pointer-events-none'>
                        {valor}
                        {/* Setinha */}
                        <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800' />
                      </div>
                    )}

                    {/* Barra */}
                    <div
                      className='w-full rounded-xl bg-linear-to-t from-primary/70 via-primary/40 to-primary/20'
                      style={{ height: `${normalizedHeight}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className='mt-3 flex justify-between text-xs text-slate-400'>
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>
          </div>
          
          <DonutChart
            total={resumoFinanceiro.total}
            pago={resumoFinanceiro.pago}
            pendente={resumoFinanceiro.pendente}
          />
        </div>
        {/* 
        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-slate-700'>
                Fluxo mensal
              </h3>
              <span className='text-xs text-slate-400'>Mock</span>
            </div>
            <div className='mt-4 h-24 rounded-xl bg-[linear-gradient(120deg,rgba(124,58,237,0.15),rgba(124,58,237,0.03))]' />
            <div className='mt-3 flex justify-between text-xs text-slate-400'>
              <span>Jan</span>
              <span>Fev</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>Mai</span>
              <span>Jun</span>
            </div>
          </div>

          <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-slate-700'>
                Ticket médio
              </h3>
              <span className='text-xs text-slate-400'>Mock</span>
            </div>
            <div className='mt-4 flex items-center justify-between'>
              <div>
                <div className='text-2xl font-semibold text-slate-900'>
                  {currencyFormatter.format(1240)}
                </div>
                <div className='text-xs text-emerald-600'>
                  +6,2% vs mês passado
                </div>
              </div>
              <div className='h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-semibold'>
                82%
              </div>
            </div>
          </div>

          <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-slate-700'>
                Meta mensal
              </h3>
              <span className='text-xs text-slate-400'>Mock</span>
            </div>
            <div className='mt-4'>
              <div className='h-3 rounded-full bg-slate-100 overflow-hidden'>
                <div className='h-full w-[68%] bg-linear-to-r from-primary to-primary-accent' />
              </div>
              <div className='mt-2 flex justify-between text-xs text-slate-500'>
                <span>{currencyFormatter.format(68000)}</span>
                <span>{currencyFormatter.format(100000)}</span>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Dashboard;
