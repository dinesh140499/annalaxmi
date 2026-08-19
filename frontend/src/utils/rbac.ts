export type AdminRole = 'superadmin' | 'admin' | 'manager' | 'editor' | 'viewer' | 'user' | string;

export interface RoleConfig {
  key: AdminRole;
  label: string;
  badgeLabel: string;
  badgeClass: string;
  pillClass: string;
  description: string;
  canManageUsers: boolean;      // Add/Edit/Delete Staff & Roles
  canDeleteAdmin: boolean;      // SuperAdmin exclusive
  canCreateProduct: boolean;    // Add new products/categories
  canEditProduct: boolean;      // Update existing products/categories
  canDeleteProduct: boolean;    // Delete products/categories
  canManageOrders: boolean;     // Update order status/shipping
  canManageSettings: boolean;   // Update system config/RBAC
  isReadOnly: boolean;          // Read-only for viewer
}

const ROLES: Record<string, RoleConfig> = {
  superadmin: {
    key: 'superadmin',
    label: 'Super Administrator',
    badgeLabel: 'Master SuperAdmin',
    badgeClass: 'bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-black shadow-xs',
    pillClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    description: 'Unrestricted master access: staff provisioning, role changes, deletion, system configurations, and catalog control.',
    canManageUsers: true,
    canDeleteAdmin: true,
    canCreateProduct: true,
    canEditProduct: true,
    canDeleteProduct: true,
    canManageOrders: true,
    canManageSettings: true,
    isReadOnly: false,
  },
  admin: {
    key: 'admin',
    label: 'Platform Administrator',
    badgeLabel: 'Admin',
    badgeClass: 'bg-emerald-600 text-white font-bold',
    pillClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    description: 'Catalog & Storefront administration: manage harvest products, crop taxonomy, and customer orders pipeline.',
    canManageUsers: false, // Staff management is strictly SuperAdmin only
    canDeleteAdmin: false,
    canCreateProduct: true,
    canEditProduct: true,
    canDeleteProduct: true,
    canManageOrders: true,
    canManageSettings: false,
    isReadOnly: false,
  },
  manager: {
    key: 'manager',
    label: 'Operations Manager',
    badgeLabel: 'Manager',
    badgeClass: 'bg-blue-600 text-white font-bold',
    pillClass: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
    description: 'Operational store control: process orders, update fulfillment/dispatches, manage stock and catalog listings.',
    canManageUsers: false,
    canDeleteAdmin: false,
    canCreateProduct: true,
    canEditProduct: true,
    canDeleteProduct: false,
    canManageOrders: true,
    canManageSettings: false,
    isReadOnly: false,
  },
  editor: {
    key: 'editor',
    label: 'Catalog & Content Editor',
    badgeLabel: 'Editor',
    badgeClass: 'bg-purple-600 text-white font-bold',
    pillClass: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    description: 'Catalog curation: register harvest products, update descriptions, pricing, taxonomy, and specifications.',
    canManageUsers: false,
    canDeleteAdmin: false,
    canCreateProduct: true,
    canEditProduct: true,
    canDeleteProduct: false,
    canManageOrders: false,
    canManageSettings: false,
    isReadOnly: false,
  },
  viewer: {
    key: 'viewer',
    label: 'Read-Only Auditor',
    badgeLabel: 'Viewer (Read-Only)',
    badgeClass: 'bg-slate-700 text-slate-200 font-semibold',
    pillClass: 'bg-slate-700/40 text-slate-300 border border-slate-600',
    description: 'Auditing & analytics: review real-time orders, catalog listings, and inventory metrics in read-only mode.',
    canManageUsers: false,
    canDeleteAdmin: false,
    canCreateProduct: false,
    canEditProduct: false,
    canDeleteProduct: false,
    canManageOrders: false,
    canManageSettings: false,
    isReadOnly: true,
  },
};

export const getRoleConfig = (role?: string): RoleConfig => {
  const normalized = (role || 'viewer').toLowerCase();
  return ROLES[normalized] || ROLES['viewer'];
};
