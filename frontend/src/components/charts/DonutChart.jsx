const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const DonutChart = ({ total, pago, pendente }) => {
  const percentPago = total > 0 ? (pago / total) * 100 : 0;
  const percentPendente = total > 0 ? (pendente / total) * 100 : 0;

  const degPago = (percentPago / 100) * 360;
  const degPendente = (percentPendente / 100) * 360;

  return (
    <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-sm font-semibold text-slate-700'>Recebido vs Pendente</h3>
          <p className='mt-1 text-2xl font-bold text-slate-900 tracking-tight'>
            {currencyFormatter.format(total)}
          </p>
        </div>
        <span className='shrink-0 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1'>
          Geral
        </span>
      </div>

      <div className='mt-6 flex items-center gap-8'>
        {/* Donut */}
        <div className='relative shrink-0 h-32 w-32'>
          <div
            className='absolute inset-0 rounded-full'
            style={{
              background: `conic-gradient(
                #7c3aed 0deg ${degPago}deg,
                #fca5a5 ${degPago}deg ${degPago + degPendente}deg,
                #e2e8f0 ${degPago + degPendente}deg 360deg
              )`,
            }}
          />
          {/* Anel interno */}
          <div className='absolute inset-3.5 rounded-full bg-white shadow-inner flex flex-col items-center justify-center'>
            <span className='text-lg font-bold text-slate-800 leading-none'>
              {Math.round(percentPago)}%
            </span>
            <span className='text-[10px] text-slate-400 mt-0.5'>pago</span>
          </div>
        </div>

        {/* Legenda + barras de progresso */}
        <div className='flex-1 flex flex-col gap-4'>
          {/* Pago */}
          <div>
            <div className='flex items-center justify-between mb-1.5'>
              <div className='flex items-center gap-1.5'>
                <span className='h-2.5 w-2.5 rounded-full bg-violet-600 shrink-0' />
                <span className='text-xs font-medium text-slate-600'>Recebido</span>
              </div>
              <span className='text-xs font-bold text-slate-800'>
                {currencyFormatter.format(pago)}
              </span>
            </div>
            <div className='h-1.5 w-full rounded-full bg-slate-100'>
              <div
                className='h-1.5 rounded-full bg-violet-500 transition-all duration-500'
                style={{ width: `${percentPago}%` }}
              />
            </div>
          </div>

          {/* Pendente */}
          <div>
            <div className='flex items-center justify-between mb-1.5'>
              <div className='flex items-center gap-1.5'>
                <span className='h-2.5 w-2.5 rounded-full bg-red-300 shrink-0' />
                <span className='text-xs font-medium text-slate-600'>Pendente</span>
              </div>
              <span className='text-xs font-bold text-slate-800'>
                {currencyFormatter.format(pendente)}
              </span>
            </div>
            <div className='h-1.5 w-full rounded-full bg-slate-100'>
              <div
                className='h-1.5 rounded-full bg-red-300 transition-all duration-500'
                style={{ width: `${percentPendente}%` }}
              />
            </div>
          </div>

          {/* Total */}
          <div className='border-t border-slate-100 pt-3 flex items-center justify-between'>
            <span className='text-xs text-slate-400'>Total geral</span>
            <span className='text-xs font-semibold text-slate-600'>
              {currencyFormatter.format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
