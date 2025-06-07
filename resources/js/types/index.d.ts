import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user:  Mype | User | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Mype {
  id: number
  name: string
  email: string
  phone_number?: string
  mype_rate?: number
  mype_address?: string
  mype_description?: string
  created_at: string
  updated_at: string
  // Relación muchos a muchos con productos
  products?: (Product & {
    pivot: MypeProductPivot
  })[]
  [key: string]: unknown
}

export interface MypeProductPivot {
  custom_price: number
  stock: number
  product_rate: number
  min_stock?: number
  created_at?: string
  updated_at?: string
}

export interface Product {
  id: number
  product_name: string
  product_description: string
  category: string
  rating?: string
  mypes?: (Mype & {pivot: MypeProductPivot})[]
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}

export interface InventoryHistory {
  id: number
  mype_id: number
  product_id: number
  cantidad_cambiada: number
  tipo_cambio: 'entrada' | 'salida'
  comentario?: string
  created_at: string
  updated_at: string
}
  

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    data: T[];
    links: PaginationLink[];
}
