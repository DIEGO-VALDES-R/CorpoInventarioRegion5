import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';

// Configuración de estilos personalizados
const toastStyles = {
  success: {
    icon: CheckCircle,
    className: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    iconColor: '#10b981'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconColor: '#ef4444'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-amber-50 border-amber-200 text-amber-800',
    iconColor: '#f59e0b'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: '#3b82f6'
  },
  loading: {
    icon: Loader2,
    className: 'bg-slate-50 border-slate-200 text-slate-800',
    iconColor: '#64748b'
  }
};

export const showToast = {
  success: (message: string, description?: string) => {
    const Icon = toastStyles.success.icon;
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-start border-l-4 border-emerald-500 p-4`}
        >
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-slate-900">{message}</p>
            {description && (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 4000 }
    );
  },

  error: (message: string, description?: string) => {
    const Icon = toastStyles.error.icon;
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-start border-l-4 border-red-500 p-4`}
        >
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-red-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-slate-900">{message}</p>
            {description && (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  },

  warning: (message: string, description?: string) => {
    const Icon = toastStyles.warning.icon;
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-start border-l-4 border-amber-500 p-4`}
        >
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-amber-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-slate-900">{message}</p>
            {description && (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 4000 }
    );
  },

  info: (message: string, description?: string) => {
    const Icon = toastStyles.info.icon;
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-start border-l-4 border-blue-500 p-4`}
        >
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-slate-900">{message}</p>
            {description && (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 4000 }
    );
  },

  loading: (message: string) => {
    const Icon = toastStyles.loading.icon;
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center border-l-4 border-slate-500 p-4`}
        >
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-slate-500 animate-spin" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-slate-900">{message}</p>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  }
};

export const inventoryToast = {
  productAdded: (productName: string) => 
    showToast.success('Producto agregado', `${productName} ha sido añadido al inventario`),
  
  productUpdated: (productName: string) => 
    showToast.success('Producto actualizado', `${productName} ha sido modificado exitosamente`),
  
  productDeleted: (productName: string) => 
    showToast.success('Producto eliminado', `${productName} ha sido eliminado del inventario`),
  
  stockLow: (productName: string, currentStock: number) => 
    showToast.warning('Stock bajo', `${productName} tiene solo ${currentStock} unidades disponibles`),
  
  stockOut: (productName: string) => 
    showToast.error('Stock agotado', `${productName} está agotado`),
  
  bajaProcesada: (productName: string, quantity: number) => 
    showToast.success('Salida procesada', `${quantity} unidades de ${productName} han sido registradas`),
  
  syncComplete: () => 
    showToast.success('Sincronización completa', 'Los datos han sido sincronizados con Supabase'),
  
  syncError: () => 
    showToast.error('Error de sincronización', 'No se pudieron sincronizar los datos. Intente nuevamente.'),
  
  exportSuccess: (type: 'PDF' | 'Excel') => 
    showToast.success(`${type} generado`, `El archivo ha sido descargado exitosamente`),
};