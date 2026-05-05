const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const DonutChart = ({ total, pago, pendente, pendente_total }) => {
  const percentPago     = total > 0 ? (pago / total) * 100 : 0;
  const percentPendente = total > 0 ? (pendente / total) * 100 : 0;
  const degPago         = (percentPago / 100) * 360;
  const degPendente     = (percentPendente / 100) * 360;

  return (
    <div className='rounded-xl bg-white border border-gray-100 shadow-xs p-6'>
      <div className='flex items-center justify-between gap-4 mb-6'>
        <div>
          <h3 className='text-sm font-semibold text-gray-700'>Recebido vs Pendente</h3>
          <p className='text-xs text-gray-400 mt-0.5'>Vendas criadas neste mês</p>
        </div>
        <span className='shrink-0 text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1'>
          Este mês
        </span>
      </div>

      <div className='flex flex-col sm:flex-row items-center gap-8'>
        {/* Donut */}
        <div className='relative shrink-0 h-40 w-40'>
          <div
            className='absolute inset-0 rounded-full'
            style={{
              background: `conic-gradient(
                #6b21a8 0deg ${degPago}deg,
                #fca5a5 ${degPago}deg ${degPago + degPendente}deg,
                #f3f4f6 ${degPago + degPendente}deg 360deg
              )`,
            }}
          />
          <div className='absolute inset-5 rounded-full bg-white shadow-inner flex flex-col items-center justify-center'>
            <span className='text-xl font-bold text-gray-800 leading-none'>
              {Math.round(percentPago)}%
            </span>
            <span className='text-[10px] text-gray-400 mt-0.5'>recebido</span>
          </div>
        </div>

        {/* Stats */}
        <div className='flex-1 w-full flex flex-col gap-4'>
          {/* Recebido e Pendente do mês */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-1.5'>
                <span className='h-2 w-2 rounded-full bg-primary shrink-0' />
                <span className='text-[11px] font-semibold text-gray-400 uppercase tracking-widest'>Recebido</span>
              </div>
              <p className='text-xl font-semibold text-gray-900 tracking-tight'>{fmt.format(pago)}</p>
              <div className='h-1 w-full rounded-full bg-gray-100'>
                <div className='h-1 rounded-full bg-primary transition-all duration-500' style={{ width: `${percentPago}%` }} />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-1.5'>
                <span className='h-2 w-2 rounded-full bg-red-300 shrink-0' />
                <span className='text-[11px] font-semibold text-gray-400 uppercase tracking-widest'>Pendente</span>
              </div>
              <p className='text-xl font-semibold text-gray-900 tracking-tight'>{fmt.format(pendente)}</p>
              <div className='h-1 w-full rounded-full bg-gray-100'>
                <div className='h-1 rounded-full bg-red-300 transition-all duration-500' style={{ width: `${percentPendente}%` }} />
              </div>
            </div>
          </div>

          {/* Total pendente geral — destaque */}
          <div className='rounded-lg bg-red-50 border border-red-100 px-4 py-3 flex items-center justify-between gap-3'>
            <div>
              <span className='text-[11px] font-semibold text-red-400 uppercase tracking-widest block mb-0.5'>Total pendente geral</span>
              <span className='text-[11px] text-red-300'>Todas as vendas em aberto</span>
            </div>
            <p className='text-xl font-bold text-red-500 tracking-tight shrink-0'>{fmt.format(pendente_total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
