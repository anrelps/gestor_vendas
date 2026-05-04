const variants = {
  primary: {
    wrapper: 'bg-linear-to-br from-primary to-primary-light border-0',
    blob: 'bg-white/10',
    label: 'text-white/70',
    iconWrapper: 'bg-white/20 text-white',
    value: 'text-white',
    suffix: 'text-white/60',
    track: 'bg-white/20',
    bar: 'bg-white/60',
  },
  'primary-light': {
    wrapper: 'bg-linear-to-br from-primary/5 to-primary/10 border border-primary/15',
    blob: 'bg-primary/10',
    label: 'text-primary/70',
    iconWrapper: 'bg-primary/10 text-primary',
    value: 'text-primary',
    suffix: 'text-primary/60',
    track: 'bg-primary/10',
    bar: 'bg-linear-to-r from-primary to-primary-light',
  },
  danger: {
    wrapper: 'bg-linear-to-br from-rose-50 to-red-50 border border-red-100',
    blob: 'bg-red-100/60',
    label: 'text-red-400',
    iconWrapper: 'bg-red-100 text-red-500',
    value: 'text-red-500',
    suffix: 'text-red-400',
    track: 'bg-red-100',
    bar: 'bg-linear-to-r from-red-400 to-rose-400',
  },
  violet: {
    wrapper: 'bg-linear-to-br from-violet-50 to-purple-50 border border-violet-100',
    blob: 'bg-violet-100/60',
    label: 'text-violet-500',
    iconWrapper: 'bg-violet-100 text-violet-500',
    value: 'text-violet-600',
    suffix: 'text-violet-400',
    track: 'bg-violet-100',
    bar: 'bg-linear-to-r from-violet-400 to-purple-400',
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
