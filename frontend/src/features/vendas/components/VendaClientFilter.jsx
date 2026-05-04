import ClienteCombobox from '../../../components/ui/ClienteCombobox';

const VendaClientFilter = ({ clientes, value, query, onQueryChange, onChange, inputRef }) => (
  <div className='mb-3'>
    <ClienteCombobox
      clientes={clientes}
      value={value}
      query={query}
      onQueryChange={onQueryChange}
      onChange={onChange}
      inputRef={inputRef}
    />
  </div>
);

export default VendaClientFilter;
