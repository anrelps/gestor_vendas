import { BookMarked, LayoutDashboard, ShoppingCart, Users } from 'lucide-react';

export const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Clientes', to: '/clientes', icon: Users },
  { label: 'Produtos', to: '/produtos', icon: ShoppingCart },
  { label: 'Livros', to: '/livros', icon: BookMarked },
];
