import { Bell, BookMarked, LayoutDashboard, Users } from 'lucide-react';

export const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Clientes', to: '/clientes', icon: Users },
    { label: 'Notificações', to: '/notificacoes', icon: Bell },
    { label: 'Livros', to: '/livros', icon: BookMarked },
];
