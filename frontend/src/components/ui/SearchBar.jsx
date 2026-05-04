const SearchBar = ({ value, onChange, placeholder, count, countLabel }) => (
  <div className='px-6 py-3.5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
    <input
      type='text'
      className='w-full sm:w-60 rounded-lg border border-gray-200 px-3.5 py-2 text-sm text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {count !== undefined && (
      <span className='text-xs text-gray-400 font-medium whitespace-nowrap'>
        {count} {countLabel}{count !== 1 ? 's' : ''}
      </span>
    )}
  </div>
);

export default SearchBar;
