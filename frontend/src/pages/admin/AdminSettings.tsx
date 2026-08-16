import { useState } from 'react';
import { 
  FaCog, 
  FaShieldAlt, 
  FaCheck, 
  FaTimes, 
  FaKey, 
  FaSlidersH 
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';

const AdminSettings = () => {
  const [alertData, setAlertData] = useState<{
    message: string;
    variant: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    variant: 'success',
    show: false,
  });

  const permissions = [
    { module: 'Manage SuperAdmins & Staff', superadmin: true, admin: false, user: false },
    { module: 'Create & Edit Product Catalog', superadmin: true, admin: true, user: false },
    { module: 'Update Category Taxonomy', superadmin: true, admin: true, user: false },
    { module: 'Fulfill & Dispatch Orders', superadmin: true, admin: true, user: false },
    { module: 'Modify System Rate Limiters', superadmin: true, admin: false, user: false },
    { module: 'Access Customer Storefront & Cart', superadmin: true, admin: true, user: true },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FaCog className="text-amber-400" />
            <span>Platform Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System & Security Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Role-Based Access Control (RBAC) governance, API gateway thresholds, and system health status.
          </p>
        </div>
      </div>

      {/* RBAC Matrix Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">RBAC Role Permissions Matrix</h3>
              <p className="text-[11px] text-slate-400">Strict authorization levels enforced at backend middleware</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                <th className="py-3 px-4">Operational Capability</th>
                <th className="py-3 px-4 text-center text-amber-400">SuperAdmin (Root)</th>
                <th className="py-3 px-4 text-center text-emerald-400">Staff Admin</th>
                <th className="py-3 px-4 text-center text-slate-400">Customer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {permissions.map((p, i) => (
                <tr key={i} className="hover:bg-slate-850/60 transition">
                  <td className="py-3 px-4 font-semibold text-slate-300">{p.module}</td>
                  <td className="py-3 px-4 text-center">
                    {p.superadmin ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-800 text-slate-500 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.admin ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-800 text-slate-500 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.user ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-800 text-slate-500 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gateway & Environment Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <FaSlidersH />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">API Gateway Parameters</h3>
              <p className="text-[11px] text-slate-400">Backend runtime configurations</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Rate Limiter Window:</span>
              <span className="font-mono font-bold text-white">100 req / 15 mins</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Body Payload Max:</span>
              <span className="font-mono font-bold text-white">1 MB (Compressed)</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Security Middleware:</span>
              <span className="font-mono font-bold text-emerald-400">Helmet & Compression</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <FaKey />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Session & Token Policies</h3>
              <p className="text-[11px] text-slate-400">JWT and Cookie authorization</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Authentication Scheme:</span>
              <span className="font-mono font-bold text-white">Bearer JWT / HttpOnly Cookie</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">CORS Policy:</span>
              <span className="font-mono font-bold text-white">Credentials Enabled</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Upload Storage Path:</span>
              <span className="font-mono font-bold text-slate-300">/src/uploads (Static)</span>
            </div>
          </div>
        </div>

      </div>

      {alertData.show && (
        <Alert
          message={alertData.message}
          variant={alertData.variant}
          onDismiss={() => setAlertData((p) => ({ ...p, show: false }))}
        />
      )}

    </div>
  );
};

export default AdminSettings;
