import { ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react';
import SummaryCard from '../../../components/ui/SummaryCard';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const VendaSummaryCards = ({ valorTotalPendente, valorTotal, count }) => (
  <div className='w-full mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3'>
    <SummaryCard
      label='Total Pendente'
      value={currencyFormatter.format(Number(valorTotalPendente) || 0)}
      icon={<TrendingDown size={16} />}
      variant='danger'
      barStyle={{
        width: valorTotal > 0 ? `${Math.min(100, (valorTotalPendente / valorTotal) * 100)}%` : '0%',
      }}
    />
    <SummaryCard
      label='Total Geral'
      value={currencyFormatter.format(Number(valorTotal) || 0)}
      icon={<TrendingUp size={16} />}
      variant='primary-light'
    />
    <SummaryCard
      label='Qtd. Vendas'
      value={count}
      suffix='vendas'
      icon={<ShoppingCart size={16} />}
      variant='primary'
    />
  </div>
);

export default VendaSummaryCards;
