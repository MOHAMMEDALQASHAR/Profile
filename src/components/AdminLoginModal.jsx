import React, { useState } from 'react';
import { Lock, User, KeyRound, X, LogIn, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { loginAdmin } = usePortfolio();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginAdmin(username, password);
    if (res.success) {
      setPassword('');
      onLoginSuccess();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 mx-auto mb-3 shadow-lg shadow-sky-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-sky-400">
              <Lock className="w-7 h-7" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            تسجيل دخول الأدمن
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ادخل كلمة المرور لإدارة نصوص ومشاريع وشهادات الموقع
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-slate-950 border border-slate-700/70 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              كلمة السر (Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="كلمة السر..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-slate-950 border border-slate-700/70 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
          اسم المستخدم الافتراضي: <span className="text-sky-400 font-mono">admin</span> | كلمة السر: <span className="text-sky-400 font-mono">admin123</span>
        </div>

      </div>
    </div>
  );
}
