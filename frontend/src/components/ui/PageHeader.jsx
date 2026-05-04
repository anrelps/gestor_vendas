const PageHeader = ({ title, subtitle, action }) => (
  <div className='px-6 pt-6 pb-5 border-b border-gray-100'>
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div>
        <h2 className='text-lg font-semibold text-gray-900 tracking-tight'>{title}</h2>
        {subtitle && <p className='text-sm text-gray-400 mt-0.5'>{subtitle}</p>}
      </div>
      {action && action}
    </div>
  </div>
);

export default PageHeader;
