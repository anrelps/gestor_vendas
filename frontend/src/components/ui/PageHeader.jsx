const PageHeader = ({ title, subtitle, action }) => (
  <div className='px-4 sm:px-6 pt-6 pb-4 border-b border-gray-100 bg-linear-to-r from-white via-purple-50/30 to-purple-50/10'>
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>{title}</h2>
        {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
      </div>
      {action && action}
    </div>
  </div>
);

export default PageHeader;
