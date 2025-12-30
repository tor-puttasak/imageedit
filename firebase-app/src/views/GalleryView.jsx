import { ArrowLeft, ImageIcon, Download, Trash2 } from 'lucide-react';
import { VIEWS } from '../config/constants';
import { downloadImage } from '../utils/gemini';

export const GalleryView = ({ gallery, onBack, onDeleteImage, onSuccess }) => {
  const handleDelete = async (imageId) => {
    if (window.confirm('ลบรูปภาพนี้ออกจากคลังถาวร?')) {
      await onDeleteImage(imageId);
      onSuccess('ลบรูปภาพออกจากคลังแล้ว');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-between border-b border-slate-800 pb-10">
        <button
          onClick={onBack}
          className="p-5 bg-slate-900 text-slate-400 hover:text-white rounded-[1.5rem] transition-all border border-slate-800 shadow-2xl active:scale-90"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="text-center">
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Artifact Archive</h2>
          <p className="text-indigo-500 font-black text-[12px] uppercase tracking-[0.4em] mt-2">
            {gallery.length} Entities Recorded
          </p>
        </div>
        <div className="w-20"></div>
      </div>

      {gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-52 space-y-6 opacity-20">
          <ImageIcon size={120} className="text-slate-500"/>
          <p className="font-black text-2xl uppercase tracking-[0.5em]">Vault Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#0a0f1e] rounded-[3.5rem] overflow-hidden border border-slate-800 hover:border-indigo-500/40 transition-all shadow-2xl hover:shadow-indigo-500/15"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={item.generatedUrl}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Artifact"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <div className="flex space-x-4 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                    <button
                      onClick={() => downloadImage(item.generatedUrl, `vault-${item.id}.png`)}
                      className="flex-1 py-3 bg-white text-[#020617] hover:bg-indigo-100 rounded-2xl flex items-center justify-center space-x-2 text-xs font-black uppercase transition-all shadow-xl"
                    >
                      <Download size={18}/>
                      <span>Extract</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-rose-500/20 backdrop-blur-xl hover:bg-rose-500 text-rose-400 hover:text-white rounded-2xl border border-rose-500/20 transition-all shadow-xl"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#0a0f1e]/90 border-t border-slate-800/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase rounded-full border border-indigo-500/20 tracking-widest">
                    {item.styleName}
                  </span>
                  <span className="text-[10px] text-slate-600 font-black uppercase tracking-tighter">
                    {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : 'Pending'}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500 line-clamp-2 italic leading-relaxed font-semibold">
                  "{item.prompt}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
