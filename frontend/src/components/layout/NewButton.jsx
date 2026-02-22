import PropTypes from 'prop-types';

const NewButton = ({
  label,
  onClick,
  icon = null,
  className = '',
  ...props
}) => {
  return (
    <button
      type='button'
      className={`
        cursor-pointer rounded-sm border border-primary
        bg-primary/5 text-primary text-sm font-semibold
        hover:bg-white active:scale-[0.97]
        transition-all duration-150
        flex items-center justify-center gap-2
        w-full sm:w-auto px-4 py-2
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && <span className='leading-none'>{icon}</span>}
      <span className='whitespace-nowrap'>{label}</span>
    </button>
  );
};

NewButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default NewButton;
