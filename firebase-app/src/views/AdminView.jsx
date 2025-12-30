import { useState } from 'react';
import { ImageIcon, X, Edit3, Trash2, Save } from 'lucide-react';
import { VIEWS } from '../config/constants';

export const AdminView = ({
  user,
  styles,
  onAddStyle,
  onUpdateStyle,
  onDeleteStyle,
  onViewChange,
  onLogout,
  onSuccess,
}) => {
  const [editingStyle, setEditingStyle] = useState(null);

  const handleAddStyle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await onAddStyle({
      name: formData.get('name'),
      prompt: formData.get('prompt'),
      icon: formData.get('icon'),
    });

    e.target.reset();
    onSuccess('เพิ่มสไตล์ใหม่เข้าระบบสำเร็จ');
  };

  const handleSaveStyle = async (style) => {
    await onUpdateStyle(style.id, {
      name: editingStyle.name,
      icon: editingStyle.icon,
      prompt: editingStyle.prompt,
    });
    setEditingStyle(null);
    onSuccess('บันทึกข้อมูลสไตล์เรียบร้อย');
  };

  const handleDeleteStyle = async (styleId) => {
    if (window.confirm('ยืนยันการลบสไตล์นี้ออกจากระบบ?')) {
      await onDeleteStyle(styleId);
      onSuccess('ลบสไตล์เรียบร้อย');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-800 pb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Nexus Dashboard</h2>
          <p className="text-indigo-400 font-bold italic tracking-wide uppercase text-xs">
            Authority Access: {user?.email}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => onViewChange(VIEWS.GALLERY)}
            className="flex items-center space-x-3 px-8 py-4 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-[1.5rem] font-black transition-all border border-indigo-500/20 uppercase text-sm shadow-xl active:scale-95"
          >
            <ImageIcon size={22}/>
            <span>Archive Vault</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-8 py-4 bg-slate-900 text-slate-400 hover:bg-rose-500 hover:text-white rounded-[1.5rem] font-black transition-all border border-slate-800 uppercase text-sm shadow-xl active:scale-95"
          >
            <X size={22}/>
            <span>Logoff</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Styles List */}
        <div className="lg:col-span-8 space-y-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-widest border-l-4 border-indigo-500 pl-4">
            System Presets
          </h3>
          <div className="grid gap-6">
            {styles.map((style) => (
              <div
                key={style.id}
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] hover:border-slate-700 transition-all group shadow-lg"
              >
                {editingStyle?.id === style.id ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-6">
                      <input
                        className="bg-slate-800 border-slate-700 p-4 rounded-2xl text-white font-bold text-center text-2xl"
                        value={editingStyle.icon}
                        onChange={(e) => setEditingStyle({...editingStyle, icon: e.target.value})}
                      />
                      <input
                        className="col-span-3 bg-slate-800 border-slate-700 p-4 rounded-2xl text-white font-bold"
                        value={editingStyle.name}
                        onChange={(e) => setEditingStyle({...editingStyle, name: e.target.value})}
                      />
                    </div>
                    <textarea
                      className="w-full bg-slate-800 border-slate-700 p-6 rounded-[2rem] text-white text-sm h-40 leading-relaxed"
                      value={editingStyle.prompt}
                      onChange={(e) => setEditingStyle({...editingStyle, prompt: e.target.value})}
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleSaveStyle(style)}
                        className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-[0.98] flex items-center justify-center space-x-2"
                      >
                        <Save size={20}/>
                        <span>Save Config</span>
                      </button>
                      <button
                        onClick={() => setEditingStyle(null)}
                        className="px-10 py-4 bg-slate-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest active:scale-[0.98]"
                      >
                        Abort
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <span className="text-6xl bg-slate-800/80 p-6 rounded-[2.5rem] group-hover:bg-indigo-500/10 transition-colors shadow-inner">
                        {style.icon}
                      </span>
                      <div className="space-y-2">
                        <h4 className="font-black text-white text-2xl uppercase tracking-tighter">{style.name}</h4>
                        <p className="text-xs text-slate-500 italic max-w-md line-clamp-2 leading-relaxed font-medium">
                          "{style.prompt}"
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setEditingStyle(style)}
                        className="p-4 bg-slate-800 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-2xl transition-all shadow-xl active:scale-90"
                      >
                        <Edit3 size={24}/>
                      </button>
                      <button
                        onClick={() => handleDeleteStyle(style.id)}
                        className="p-4 bg-slate-800 text-rose-400 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-xl active:scale-90"
                      >
                        <Trash2 size={24}/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Style Form */}
        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-widest border-l-4 border-purple-500 pl-4">
            Add Preset
          </h3>
          <form
            className="bg-[#0a0f1e] border-2 border-dashed border-slate-800 p-10 rounded-[3.5rem] space-y-8 shadow-2xl sticky top-32"
            onSubmit={handleAddStyle}
          >
            <div className="space-y-3 text-center">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Icon</label>
              <input
                name="icon"
                placeholder="🎨"
                required
                className="w-full bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-center text-4xl"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Label</label>
              <input
                name="name"
                placeholder="Ex: Cosmic Glitch"
                required
                className="w-full bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">AI Logic</label>
              <textarea
                name="prompt"
                placeholder="Describe the neural transformation..."
                required
                className="w-full bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 h-36 text-sm leading-relaxed"
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-[1.5rem] font-black shadow-2xl uppercase tracking-[0.2em] active:scale-[0.98]"
            >
              Deploy Preset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
