import { Camera, Upload } from 'lucide-react';
import { VIEWS } from '../config/constants';

export const HomeView = ({ onViewChange, onImageSelect }) => {
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => {
        onImageSelect(f.target.result);
        onViewChange(VIEWS.EDITOR);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-16 p-6 min-h-[70vh]">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl">
          Decor<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">.ai</span>
        </h1>
        <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
          เปลี่ยนภาพถ่ายธรรมดาให้เป็นผลงานศิลปะระดับโลก <br className="hidden md:block"/>
          ด้วยขุมพลังปัญญาประดิษฐ์ยุคใหม่
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl px-4">
        <button
          onClick={() => onViewChange(VIEWS.CAMERA)}
          className="group relative overflow-hidden flex flex-col items-center justify-center p-14 bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 text-white rounded-[3.5rem] transition-all hover:shadow-[0_0_80px_rgba(99,102,241,0.15)] shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Camera size={64} className="mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-2xl font-black tracking-tight uppercase">Open Camera</span>
        </button>

        <label className="group relative overflow-hidden flex flex-col items-center justify-center p-14 bg-slate-900/60 border border-white/5 hover:border-purple-500/40 text-white rounded-[3.5rem] transition-all cursor-pointer hover:shadow-[0_0_80px_rgba(168,85,247,0.15)] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Upload size={64} className="mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-2xl font-black tracking-tight uppercase">Upload File</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>
    </div>
  );
};
