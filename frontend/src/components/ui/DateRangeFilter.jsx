import { Calendar } from 'lucide-react';

const DateButton = ({ label, value, display, inputRef, onChange }) => (
  <div
    className='relative cursor-pointer shrink-0'
    onClick={() => { const i = inputRef?.current; if (i?.showPicker) i.showPicker(); else i?.focus(); }}
  >
    <div className='h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap'>
      <Calendar size={14} className='text-gray-400' />
      <span className='text-gray-400 text-xs'>{label}</span>
      <span className={value ? 'text-gray-700 text-sm' : 'text-gray-400 text-sm'}>
        {value ? display : 'Selecionar'}
      </span>
    </div>
    <input
      ref={inputRef}
      type='date'
      value={value}
      onChange={onChange}
      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
      tabIndex={-1}
    />
  </div>
);

const DateRangeFilter = ({
  dateStart, dateEnd,
  dateStartDisplay, dateEndDisplay,
  dateStartRef, dateEndRef,
  onDateStartChange, onDateEndChange,
  onClear,
}) => (
  <div className='flex flex-wrap sm:flex-nowrap items-center gap-2'>
    <DateButton
      label='De'
      value={dateStart}
      display={dateStartDisplay}
      inputRef={dateStartRef}
      onChange={onDateStartChange}
    />
    <DateButton
      label='Até'
      value={dateEnd}
      display={dateEndDisplay}
      inputRef={dateEndRef}
      onChange={onDateEndChange}
    />
    {(dateStart || dateEnd) && (
      <button
        type='button'
        onClick={onClear}
        className='h-9 rounded-lg px-3 border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-500 whitespace-nowrap shrink-0'
      >
        Limpar datas
      </button>
    )}
  </div>
);

export default DateRangeFilter;
