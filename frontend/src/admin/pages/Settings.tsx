import { useState } from 'react';
import { 
  FaCog, 
  FaShieldAlt, 
  FaCheck, 
  FaTimes, 
  FaKey, 
  FaSlidersH,
  FaUserCheck 
} from 'react-icons/fa';
import Alert from '../../components/common/Alert';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { getRoleConfig } from '../../utils/rbac';

const Settings = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const roleConfig = getRoleConfig(user?.role);

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
    { module: 'Provision & Assign Staff Roles', superadmin: true, admin: false, manager: false, editor: false, viewer: false },
    { module: 'Delete Admin Credentials', superadmin: true, admin: false, manager: false, editor: false, viewer: false },
    { module: 'Create & Edit Product Catalog', superadmin: true, admin: true, manager: true, editor: true, viewer: false },
    { module: 'Delete Products & Categories', superadmin: true, admin: true, manager: false, editor: false, viewer: false },
    { module: 'Fulfill, Dispatch & Update Orders', superadmin: true, admin: true, manager: true, editor: false, viewer: false },
    { module: 'View Real-Time Dashboard & Analytics', superadmin: true, admin: true, manager: true, editor: true, viewer: true },
    { module: 'Modify System Rate Limiters & Gateway', superadmin: true, admin: false, manager: false, editor: false, viewer: false },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FaCog className="text-amber-500" />
            <span>Platform Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System & Security Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Role-Based Access Control (RBAC) governance, API gateway thresholds, and system health status.
          </p>
        </div>

        {/* Current Active Role Indicator */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-sm">
          <FaUserCheck className="text-amber-400 text-sm" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-semibold">Your Active Role</span>
            <span className="text-xs font-bold text-white uppercase">{roleConfig.label}</span>
          </div>
        </div>
      </div>

      {/* RBAC Matrix Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">RBAC Role Permissions Matrix</h3>
              <p className="text-[11px] text-slate-500">Strict authorization levels enforced at backend middleware</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="py-3 px-4">Operational Capability</th>
                <th className={`py-3 px-3 text-center ${user?.role === 'superadmin' ? 'bg-amber-100/60 text-amber-950 font-black rounded-t-xl' : 'text-amber-800'}`}>SuperAdmin</th>
                <th className={`py-3 px-3 text-center ${user?.role === 'admin' ? 'bg-emerald-100/60 text-emerald-950 font-black rounded-t-xl' : 'text-emerald-800'}`}>Admin</th>
                <th className={`py-3 px-3 text-center ${user?.role === 'manager' ? 'bg-blue-100/60 text-blue-950 font-black rounded-t-xl' : 'text-blue-800'}`}>Manager</th>
                <th className={`py-3 px-3 text-center ${user?.role === 'editor' ? 'bg-purple-100/60 text-purple-950 font-black rounded-t-xl' : 'text-purple-800'}`}>Editor</th>
                <th className={`py-3 px-3 text-center ${user?.role === 'viewer' ? 'bg-slate-200 text-slate-950 font-black rounded-t-xl' : 'text-slate-600'}`}>Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-semibold text-slate-800">{p.module}</td>
                  
                  {/* SuperAdmin */}
                  <td className={`py-3 px-3 text-center ${user?.role === 'superadmin' ? 'bg-amber-50/40' : ''}`}>
                    {p.superadmin ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-400 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>

                  {/* Admin */}
                  <td className={`py-3 px-3 text-center ${user?.role === 'admin' ? 'bg-emerald-50/40' : ''}`}>
                    {p.admin ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-400 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>

                  {/* Manager */}
                  <td className={`py-3 px-3 text-center ${user?.role === 'manager' ? 'bg-blue-50/40' : ''}`}>
                    {p.manager ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-400 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>

                  {/* Editor */}
                  <td className={`py-3 px-3 text-center ${user?.role === 'editor' ? 'bg-purple-50/40' : ''}`}>
                    {p.editor ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-400 text-xs">
                        <FaTimes />
                      </span>
                    )}
                  </td>

                  {/* Viewer */}
                  <td className={`py-3 px-3 text-center ${user?.role === 'viewer' ? 'bg-slate-100/60' : ''}`}>
                    {p.viewer ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-800 text-xs">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-400 text-xs">
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
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FaSlidersH />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">API Gateway Parameters</h3>
              <p className="text-[11px] text-slate-500">Backend runtime configurations</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-600">Rate Limiter Window:</span>
              <span className="font-mono font-bold text-slate-900">100 req / 15 mins</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-600">Body Payload Max:</span>
              <span className="font-mono font-bold text-slate-900">1 MB (Compressed)</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-600">Security Middleware:</span>
              <span className="font-mono font-bold text-emerald-800">Helmet & Compression</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <FaKey />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Session & Token Policies</h3>
              <p className="text-[11px] text-slate-500">JWT and Cookie authorization</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-600">Authentication Scheme:</span>
              <span className="font-mono font-bold text-slate-900">Bearer JWT / HttpOnly Cookie</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-600">CORS Policy:</span>
              <span className="font-mono font-bold text-slate-900">Credentials Enabled</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-600">Upload Storage Path:</span>
              <span className="font-mono font-bold text-slate-700">/src/uploads (Static)</span>
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

export default Settings;
