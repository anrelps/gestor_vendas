const SearchBar = ({ value, onChange, placeholder, count, countLabel }) => (
  <div className='px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50'>
    <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
      <div className='w-full sm:w-auto'>
        <input
          type='text'
          className='w-full sm:w-64 rounded-sm border border-gray-300 px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {count !== undefined && (
        <span className='text-sm text-gray-600 font-medium whitespace-nowrap'>
          {count} {countLabel}{count !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  </div>
);

export default SearchBar;
