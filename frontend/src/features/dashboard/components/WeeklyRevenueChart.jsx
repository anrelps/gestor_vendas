import { useState } from 'react';

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const TODAY_INDEX = [1, 2, 3, 4, 5, 6, 0].indexOf(new Date().getDay()); // Dom=0 em JS, Seg=0 no array

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const WeeklyRevenueChart = ({ lucroSemanal }) => {
  const [activeBar, setActiveBar] = useState(null);

  const values = Object.values(lucroSemanal ?? {}).map(Number);
  const maxValue = Math.max(...values, 1);
  const totalSemana = values.reduce((a, b) => a + b, 0);

  return (
    <div className='rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-sm font-semibold text-slate-700'>Receita semanal</h3>
          <p className='mt-1 text-2xl font-bold text-slate-900 tracking-tight'>
            {currencyFormatter.format(totalSemana)}
          </p>
        </div>
        <span className='shrink-0 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1'>
          Semana atual
        </span>
      </div>

      <div className='mt-6 flex items-end gap-1.5 h-36'>
        {values.map((val, index) => {
          const normalizedHeight = Math.max((val / maxValue) * 100, val > 0 ? 8 : 3);
          const isActive = activeBar === index;
          const isToday = index === TODAY_INDEX;
          const valor = currencyFormatter.format(val);

          return (
            <div
              key={index}
              className='relative flex-1 flex flex-col items-center justify-end h-full cursor-pointer'
              onMouseEnter={() => setActiveBar(index)}
              onMouseLeave={() => setActiveBar(null)}
              onClick={() => setActiveBar(isActive ? null : index)}
            >
              {/* Tooltip */}
              {isActive && (
                <div
                  className='absolute bottom-full mb-2 z-10 pointer-events-none'
                  style={{
                    left: index === 0 ? '0' : index === values.length - 1 ? 'auto' : '50%',
                    right: index === values.length - 1 ? '0' : 'auto',
                    transform: index > 0 && index < values.length - 1 ? 'translateX(-50%)' : 'none',
                  }}
                >
                  <div className='bg-slate-800 text-white text-[10px] font-semibold rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg'>
                    {valor}
                    <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800' />
                  </div>
                </div>
              )}

              {/* Barra */}
              <div
                className={`w-full rounded-lg transition-all duration-200 ${
                  isToday
                    ? 'bg-linear-to-t from-primary to-primary/60'
                    : isActive
                    ? 'bg-linear-to-t from-primary/80 to-primary/40'
                    : 'bg-linear-to-t from-primary/40 to-primary/10'
                }`}
                style={{ height: `${normalizedHeight}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels dos dias */}
      <div className='mt-2 flex justify-between'>
        {DAYS.map((d, i) => (
          <span
            key={d}
            className={`flex-1 text-center text-[11px] font-medium ${
              i === TODAY_INDEX ? 'text-primary' : 'text-slate-400'
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WeeklyRevenueChart;
