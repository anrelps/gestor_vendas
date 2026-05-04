import { CircleDollarSign, LayoutList, Wallet } from 'lucide-react';
import SummaryCard from '../../../components/ui/SummaryCard';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const PagamentoSummaryCards = ({ totalPago, totalRegistros, mediaPorPagamento }) => (
  <div className='w-full mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3'>
    <SummaryCard
      label='Total Recebido'
      value={currencyFormatter.format(totalPago)}
      icon={<Wallet size={16} />}
      variant='primary'
    />
    <SummaryCard
      label='Qtd. Registros'
      value={totalRegistros}
      suffix='pagamentos'
      icon={<LayoutList size={16} />}
      variant='primary-light'
    />
    <SummaryCard
      label='Ticket Médio'
      value={currencyFormatter.format(mediaPorPagamento)}
      icon={<CircleDollarSign size={16} />}
      variant='violet'
    />
  </div>
);

export default PagamentoSummaryCards;
