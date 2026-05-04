const variants = {
  primary: {
    wrapper: 'bg-primary border-0',
    blob: 'bg-white/10',
    label: 'text-white/60',
    iconWrapper: 'bg-white/15 text-white',
    value: 'text-white',
    suffix: 'text-white/60',
    track: 'bg-white/15',
    bar: 'bg-white/50',
  },
  'primary-light': {
    wrapper: 'bg-primary/8 border border-primary/15',
    blob: 'bg-primary/10',
    label: 'text-primary/60',
    iconWrapper: 'bg-primary/15 text-primary',
    value: 'text-primary',
    suffix: 'text-primary/50',
    track: 'bg-primary/10',
    bar: 'bg-primary/40',
  },
  danger: {
    wrapper: 'bg-red-50 border border-red-100',
    blob: 'bg-red-100/60',
    label: 'text-red-400',
    iconWrapper: 'bg-red-100 text-red-500',
    value: 'text-red-500',
    suffix: 'text-red-400',
    track: 'bg-red-100',
    bar: 'bg-red-300',
  },
  violet: {
    wrapper: 'bg-primary/5 border border-primary/10',
    blob: 'bg-primary/8',
    label: 'text-primary-light/70',
    iconWrapper: 'bg-primary/10 text-primary-light',
    value: 'text-primary-light',
    suffix: 'text-primary-light/60',
    track: 'bg-primary/10',
    bar: 'bg-primary-light/40',
  },
};

const SummaryCard = ({
  label,
  value,
  suffix,
  icon,
  variant = 'primary',
  barWidth = 'w-full',
  barStyle,
}) => {
  const s = variants[variant];

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 ${s.wrapper}`}>
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl pointer-events-none ${s.blob}`} />
      <div className='flex items-center justify-between'>
        <span className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>
          {label}
        </span>
        <span className={`flex items-center justify-center w-8 h-8 rounded-xl ${s.iconWrapper}`}>
          {icon}
        </span>
      </div>
      <p className={`text-2xl font-bold leading-none tracking-tight ${s.value}`}>
        {value}
        {suffix && (
          <span className={`text-sm font-medium ml-1 ${s.suffix}`}>{suffix}</span>
        )}
      </p>
      <div className={`h-1 w-full rounded-full ${s.track}`}>
        <div
          className={`h-1 rounded-full transition-all duration-700 ${s.bar} ${barStyle ? '' : barWidth}`}
          style={barStyle}
        />
      </div>
    </div>
  );
};

export default SummaryCard;
