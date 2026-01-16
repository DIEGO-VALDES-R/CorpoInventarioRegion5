import { Category, Product, ProductStatus, User } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'EPP y Seguridad', description: 'Cascos, guantes, lentes, botas' },
  { id: 'cat_2', name: 'Herramientas', description: 'Manuales, eléctricas y accesorios' },
  { id: 'cat_3', name: 'Materiales de Construcción', description: 'Cementos, aditivos, acabados' },
  { id: 'cat_4', name: 'Repuestos Maquinaria', description: 'Filtros, correas, lubricantes' },
  { id: 'cat_5', name: 'Limpieza Industrial', description: 'Insumos químicos, paños, higiene' },
];

// Helper to calculate previous dates or future dates
const futureDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    code: 'EPP-001',
    name: 'Guantes de Nitrilo',
    description: 'Caja x 100, Talla L, Resistencia Química',
    categoryId: 'cat_1',
    initialStock: 50,
    stock: 12,
    minStock: 20,
    unit: 'Caja',
    price: 18.50,
    status: ProductStatus.ACTIVE,
    location: 'Estante A-EPP',
    supplier: 'Seguridad Total S.A.'
  },
  {
    id: 'prod_2',
    code: 'HER-015',
    name: 'Disco de Corte 4.5"',
    description: 'Para metal, acero inoxidable',
    categoryId: 'cat_2',
    initialStock: 200,
    stock: 45,
    minStock: 50,
    unit: 'Unidad',
    price: 2.50,
    status: ProductStatus.ACTIVE,
    location: 'Cajón H-2',
    supplier: 'Ferretería Industrial'
  },
  {
    id: 'prod_3',
    code: 'REP-102',
    name: 'Aceite Hidráulico 68',
    description: 'Bidón 5 Galones',
    categoryId: 'cat_4',
    initialStock: 20,
    stock: 4,
    minStock: 8,
    unit: 'Bidón',
    price: 85.00,
    expirationDate: futureDate(120),
    status: ProductStatus.ACTIVE,
    location: 'Zona Lubricantes',
    supplier: 'Lubricentro Corp'
  },
  {
    id: 'prod_4',
    code: 'MAT-055',
    name: 'Cemento Portland Tipo I',
    description: 'Bolsa 42.5kg',
    categoryId: 'cat_3',
    initialStock: 100,
    stock: 0,
    minStock: 20,
    unit: 'Bolsa',
    price: 9.80,
    expirationDate: futureDate(15),
    status: ProductStatus.ACTIVE,
    location: 'Patio Cargas',
    supplier: 'Cementos del Norte'
  },
];

export const INITIAL_USERS: User[] = [
    { id: 'u1', username: 'admin', password: 'admin', name: 'Jefe de Almacén', role: 'admin' },
    { id: 'u2', username: 'operador', password: '123', name: 'Operador Logístico', role: 'viewer' }
];

// Suggestions for autocomplete adapted for Supply/Warehouse
export const PREDEFINED_PRODUCTS: Record<string, string[]> = {
    'cat_1': ['Casco de Seguridad', 'Lentes Claros', 'Chaleco Reflectivo', 'Botas Dielectricas', 'Tapones Auditivos', 'Arnés de Seguridad'],
    'cat_2': ['Taladro Percutor', 'Amoladora 4.5"', 'Juego de Llaves Mixtas', 'Destornillador Plano', 'Martillo Carpintero', 'Flexómetro 5m'],
    'cat_3': ['Arena Fina', 'Ladrillo King Kong', 'Yeso Cerámico', 'Sika Grout', 'Varilla Fierro 1/2"'],
    'cat_4': ['Filtro de Aire', 'Filtro de Aceite', 'Correa de Distribución', 'Bujías', 'Rodamientos'],
    'cat_5': ['Desengrasante Industrial', 'Trapo Industrial', 'Lejía', 'Papel Higiénico Jumbo', 'Jabón Mecánico']
};

export const EXPIRATION_WARNING_DAYS = 45; // Increased for industrial supply context
export const CURRENCY_SYMBOL = '$';