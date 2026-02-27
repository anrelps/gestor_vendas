
const DonutChart = ({ total, pago, pendente }) => {
  const percentPago = total > 0 ? (pago / total) * 100 : 0;
  const percentPendente = total > 0 ? (pendente / total) * 100 : 0;

  const degPago = (percentPago / 100) * 360;
  const degPendente = (percentPendente / 100) * 360;

  return (
    <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold text-slate-700'>
          Lucro vs Pendências
        </h3>
        <span className='text-xs text-slate-400'>Geral</span>
      </div>
      <div className='mt-6 flex items-center gap-6'>
        {/* Donut */}
        <div className='relative h-24 w-24 shrink-0'>
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
          <div className='absolute inset-3 rounded-full bg-white flex items-center justify-center'>
            <span className='text-[10px] font-semibold text-slate-700'>
              {Math.round(percentPago)}%
            </span>
          </div>
        </div>

        {/* Legenda */}
        <div className='space-y-3 text-sm w-full'>
          <div className='flex items-center justify-between gap-2 text-slate-600'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-violet-600 shrink-0' />
              Pago
            </div>
            <span className='font-medium text-slate-800'>
              {parseFloat(pago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className='flex items-center justify-between gap-2 text-slate-600'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-red-300 shrink-0' />
              Pendente
            </div>
            <span className='font-medium text-slate-800'>
              {parseFloat(pendente).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className='border-t border-slate-100 pt-2 flex items-center justify-between text-xs text-slate-400'>
            <span>Total</span>
            <span className='font-medium text-slate-600'>
              {parseFloat(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart