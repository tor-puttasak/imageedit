import { Sparkles, Settings, X } from 'lucide-react';
import { VIEWS } from '../config/constants';

export const Navigation = ({
  view,
  isAdminMode,
  onViewChange,
  onLoginClick,
  onLogout,
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/50 backdrop-blur-3xl border-b border-white/5 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          onClick={() => onViewChange(VIEWS.HOME)}
          className="flex items-center space-x-5 cursor-pointer group"
        >
          <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-3 rounded-[1.25rem] text-white shadow-2xl shadow-indigo-500/30 group-hover:rotate-12 transition-all duration-500">
            <Sparkles size={30} />
          </div>
          <span className="font-black text-4xl tracking-tighter text-white uppercase italic">
            Decor<span className="text-indigo-500">.ai</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {isAdminMode ? (
            <div className="flex items-center space-x-3 bg-slate-900/40 border border-slate-800/50 p-2.5 rounded-[2rem] shadow-2xl">
              <button
                onClick={() => onViewChange(VIEWS.ADMIN)}
                className={`px-6 py-3 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  view === VIEWS.ADMIN
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                Console
              </button>
              <button
                onClick={() => onViewChange(VIEWS.GALLERY)}
                className={`px-6 py-3 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  view === VIEWS.GALLERY
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                Vault
              </button>
              <button
                onClick={onLogout}
                className="p-3 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all"
              >
                <X size={22}/>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-3 p-3 px-8 bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 text-slate-500 hover:text-indigo-400 rounded-2xl transition-all font-black text-[11px] uppercase tracking-[0.3em] group shadow-2xl active:scale-95"
            >
              <Settings
                size={20}
                className="group-hover:rotate-180 transition-transform duration-700"
              />
              <span>แอดมิน</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
