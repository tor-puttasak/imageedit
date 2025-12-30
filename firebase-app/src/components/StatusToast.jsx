import { CheckCircle2, AlertCircle } from 'lucide-react';

export const StatusToast = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-top duration-300 border backdrop-blur-md ${
      type === 'success'
        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
        : 'bg-rose-500/20 border-rose-500 text-rose-400'
    }`}>
      {type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};
