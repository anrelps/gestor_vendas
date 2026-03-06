import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  Users,
  DollarSign,
} from 'lucide-react';

export const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Clientes', to: '/clientes', icon: Users },
  { label: 'Produtos', to: '/produtos', icon: PackageSearch },
  { label: 'Vendas', to: '/vendas', icon: ShoppingCart },
  { label: 'Pagamentos', to: '/registros-pagamentos', icon: DollarSign },
];
