import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';  // Asegúrate de importar el Link de Inertia
import { BookOpen, Folder, LayoutGrid , ArrowLeft } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Agregar Producto',
        href: '/products/create',
        icon: LayoutGrid,
    },
    {
        title: 'Gestión de Productos',
        href: '/dashboard/products',
        icon: BookOpen,
    },
    {
        title: 'Historial de Cambios', 
        href: '/dashboard/inventory-history', 
        icon: Folder, 
    },

];

const footerNavItems: NavItem[] = [
    {
        title: 'Regresar a Inicio',
        href: route('home'),  // Usa route() para las rutas de Laravel
        icon: ArrowLeft,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
