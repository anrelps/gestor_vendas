const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const MonthlyResume = ({ atual, anterior }) => {
  const percentual = ((atual - anterior) / (anterior || 1)) * 100;
  const isPositive = percentual > 0;
  const isNegative = percentual < 0;

  return (
    <section className='flex justify-center items-center'>
      <div className='relative w-full rounded-3xl p-10 overflow-hidden bg-linear-to-br from-violet-100 via-purple-50 to-violet-200 border border-violet-100 shadow-[0_40px_90px_rgba(139,92,246,0.10)]'>
        <div className='pointer-events-none absolute -top-28 -left-28 h-105 w-105 rounded-full bg-violet-200/40 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-32 -right-24 h-130 w-130 rounded-full bg-purple-200/40 blur-3xl' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(167,139,250,0.14),transparent_55%),radial-gradient(900px_circle_at_85%_75%,rgba(196,181,253,0.13),transparent_60%)]' />
        <div className='pointer-events-none absolute inset-0 opacity-[0.25] bg-[linear-gradient(to_right,rgba(139,92,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-size-[40px_40px]' />
        <div className='pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-violet-200' />

        <div className='relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
          <div className='min-w-0'>
            <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide text-slate-700 bg-violet-100 border border-violet-200'>
              <span className='h-1.5 w-1.5 rounded-full bg-primary' />
              Resumo do mês
            </div>
            <h2 className='mt-3 text-2xl font-semibold tracking-tight text-slate-900'>Total Recebido / Mês</h2>
            <p className='mt-1 text-sm text-slate-600'>Visão rápida do desempenho e valores.</p>
          </div>

          <div className='shrink-0 text-right'>
            <div className='text-xs text-slate-500'>Total pago</div>
            <div className='mt-1 text-3xl font-semibold tracking-tight text-slate-900'>
              {currencyFormatter.format(atual)}
            </div>
            <div
              className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                isPositive ? 'text-emerald-700 bg-emerald-100 border border-emerald-200'
                : isNegative ? 'text-red-700 bg-red-100 border border-red-200'
                : 'text-slate-500 bg-slate-100 border border-slate-200'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isPositive ? 'bg-emerald-500' : isNegative ? 'bg-red-500' : 'bg-slate-400'}`} />
              {isPositive ? '+' : ''}{percentual.toFixed(2)}% vs mês anterior
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyResume;
