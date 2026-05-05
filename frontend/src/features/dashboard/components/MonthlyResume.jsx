import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const mesNome = (sub = 0) => {
  const d = new Date();
  d.setMonth(d.getMonth() - sub);
  return format(d, 'MMMM', { locale: ptBR });
};

const MonthlyResume = ({ atual, anterior, retrasado }) => {
  const pct = retrasado ? ((anterior - retrasado) / retrasado) * 100 : 0;
  const pos = pct > 0;
  const neg = pct < 0;

  return (
    <div className='rounded-xl overflow-hidden border border-gray-100 shadow-xs flex flex-col h-full'>

      {/* Mês atual — fundo primary com decoração */}
      <div className='relative bg-primary px-6 pt-6 pb-8 flex-1 flex flex-col justify-between overflow-hidden'>
        {/* Círculos decorativos */}
        <div className='pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5' />
        <div className='pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5' />

        <span className='relative text-xs font-semibold text-white/50 uppercase tracking-widest'>
          {mesNome(0)}
        </span>

        <div className='relative mt-4'>
          <p className='text-xs text-white/50 mb-2 font-medium'>Total recebido este mês</p>
          <p className='text-4xl font-semibold text-white tracking-tight leading-none'>
            {fmt.format(atual)}
          </p>
        </div>
      </div>

      {/* Mês anterior */}
      <div className='bg-white px-6 py-5 flex items-center justify-between gap-3'>
        <div>
          <span className='text-[11px] font-semibold text-gray-400 uppercase tracking-widest block mb-1.5'>
            {mesNome(1)}
          </span>
          <p className='text-2xl font-semibold text-gray-900 tracking-tight leading-none'>
            {fmt.format(anterior)}
          </p>
        </div>

        {retrasado > 0 && (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border shrink-0 ${
            pos ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : neg ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-gray-50 text-gray-500 border-gray-200'
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${pos ? 'bg-emerald-500' : neg ? 'bg-red-400' : 'bg-gray-400'}`} />
            {pos ? '+' : ''}{pct.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default MonthlyResume;
