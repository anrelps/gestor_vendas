import PropTypes from 'prop-types';
import React from 'react';

/**
 * Reusable responsive button for creating new entities (Cliente, Produto, Venda, etc)
 * @param {string} label - Full label for desktop (e.g. "Novo Cliente")
 * @param {string} shortLabel - Short label for mobile (e.g. "Novo")
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} icon - Icon component (optional)
 * @param {string} className - Extra class names (optional)
 */
const NewButton = ({
  label,
  shortLabel,
  onClick,
  icon,
  className = '',
  ...props
}) => {
  return (
    <button
      type='button'
      className={`cursor-pointer px-4 py-2 rounded bg-primary/5 text-primary border border-primary hover:bg-white transition flex items-center gap-1.5 font-semibold min-w-30 max-w-full ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <span className='inline-block text-base sm:text-lg'>{icon}</span>
      )}
      {/* Exibe o label completo em telas sm+ */}
      <span className='hidden sm:inline whitespace-nowrap'>{label}</span>
      {/* Exibe o shortLabel apenas em telas menores que sm */}
      <span className='inline px-1.5 sm:hidden whitespace-nowrap'>
        {shortLabel}
      </span>
    </button>
  );
};

NewButton.propTypes = {
  label: PropTypes.string.isRequired,
  shortLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string,
};

NewButton.defaultProps = {
  shortLabel: 'Novo',
  icon: null,
  className: '',
};

export default NewButton;
