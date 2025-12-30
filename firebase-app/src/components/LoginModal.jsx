import { useState } from 'react';
import { X, Lock, LogIn, Loader2 } from 'lucide-react';

export const LoginModal = ({ onClose, onLogin, loading: authLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await onLogin(email, password);

    if (result.success) {
      onClose();
      setEmail('');
      setPassword('');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24}/>
        </button>

        <div className="text-center space-y-3 mb-10 mt-6">
          <div className="inline-flex p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-2 border border-indigo-500/20 shadow-inner">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Portal</h2>
          <p className="text-slate-400 text-sm font-medium">เข้าสู่ระบบเพื่อจัดการระบบหลังบ้าน</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 text-white p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
            placeholder="Username (e.g. admin)"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 text-white p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
            placeholder="Password"
          />

          {error && (
            <p className="text-rose-400 text-xs text-center font-bold bg-rose-400/10 py-3 rounded-2xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-black shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || authLoading ? (
              <Loader2 className="animate-spin"/>
            ) : (
              <>
                <LogIn size={22}/>
                <span>SIGN IN NOW</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
