const StatCard = ({ label, value, warning = false }) => (
  <section
    aria-label={label}
    className={`w-72 min-w-72 max-w-72 h-36 min-h-36 max-h-36 group relative rounded-xl
      ${
        warning
          ? 'bg-linear-to-br from-red-900 via-red-800 to-rose-900 border-red-900 shadow-red-900'
          : 'bg-linear-to-br from-primary via-primary-accent to-primary-light border-white shadow-md'
      }
      text-white overflow-hidden transition-all duration-300 border`}
  >
    <div
      className={`absolute inset-y-0 left-0 w-1 ${warning ? 'bg-red-900/70' : 'bg-white/30'}`}
    ></div>
    <div className='relative p-6 space-y-4'>
      <div
        className={`text-sm uppercase tracking-widest ${warning ? 'text-rose-100/80' : 'text-white/70'}`}
      >
        {label}
      </div>
      <div
        className={`text-4xl font-bold leading-none ${warning ? 'drop-shadow-[0_1px_2px_rgba(136,19,55,0.5)]' : ''}`}
      >
        {value}
      </div>
      <div
        className={`h-1 w-16 rounded-full bg-linear-to-r from-white via-white/80 to-white/70`}
      ></div>
    </div>
  </section>
);

export default StatCard;
