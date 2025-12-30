import { useState } from 'react';
import { ArrowLeft, Sparkles, Download, Loader2 } from 'lucide-react';
import { VIEWS } from '../config/constants';
import { generateImageWithGemini, downloadImage } from '../utils/gemini';

export const EditorView = ({
  sourceImage,
  styles,
  onBack,
  onSuccess,
  onError,
  user,
  addToGallery,
}) => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styles[0] || null);
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerate = async () => {
    const prompt = selectedStyle ? selectedStyle.prompt : customPrompt;

    if (!prompt) {
      onError('กรุณาเลือกสไตล์หรือใส่ prompt');
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateImageWithGemini(sourceImage, prompt);
      setGeneratedImage(result);

      // Save to gallery
      await addToGallery({
        generatedUrl: result,
        prompt: prompt,
        styleName: selectedStyle?.name || 'Custom',
        userId: user.uid,
      });

      onSuccess('เนรมิตภาพใหม่สำเร็จ!');
    } catch (error) {
      console.error('Generation error:', error);
      onError(error.message || 'ระบบ AI ขัดข้อง กรุณาลองใหม่ภายหลัง');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    downloadImage(generatedImage);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12 animate-in slide-in-from-bottom duration-700">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-4 bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all border border-slate-800 shadow-xl active:scale-90"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Magic Studio</h2>
        <div className="w-16"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Preview Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative bg-[#0a0f1e] border-8 border-slate-900/50 rounded-[4rem] overflow-hidden aspect-square flex items-center justify-center shadow-2xl group">
            {loading ? (
              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <Loader2 size={100} className="animate-spin text-indigo-500 opacity-20" />
                  <Sparkles size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 animate-pulse" />
                </div>
                <p className="text-indigo-400 font-black tracking-[0.4em] text-sm animate-pulse uppercase">
                  Neural Processing...
                </p>
              </div>
            ) : (
              <img
                src={generatedImage || sourceImage}
                className="w-full h-full object-contain transition-opacity duration-500"
                alt="Result"
              />
            )}
          </div>

          {generatedImage && (
            <button
              onClick={handleDownload}
              className="w-full py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-[2rem] font-black text-2xl shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center space-x-4 active:scale-[0.98]"
            >
              <Download size={32} />
              <span>COLLECT ARTWORK</span>
            </button>
          )}
        </div>

        {/* Controls Section */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h3 className="text-slate-500 font-black uppercase tracking-[0.3em] text-[12px] ml-2">
              Select Style Preset
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {styles.length === 0 ? (
                <div className="col-span-2 p-10 bg-slate-900/30 rounded-3xl text-center text-slate-600 font-bold border border-dashed border-slate-800 animate-pulse italic">
                  No Styles Available
                </div>
              ) : (
                styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setSelectedStyle(style);
                      setCustomPrompt('');
                    }}
                    className={`p-6 rounded-[2.5rem] text-left transition-all border-2 relative overflow-hidden group ${
                      selectedStyle?.id === style.id
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_40px_rgba(99,102,241,0.2)]'
                        : 'border-slate-800 bg-slate-900/30 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-5xl mb-3 transition-transform group-hover:scale-110 duration-500">
                      {style.icon}
                    </div>
                    <div className="font-black text-lg tracking-tight truncate">{style.name}</div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-slate-500 font-black uppercase tracking-[0.3em] text-[12px] ml-2">
              Manual Control
            </h3>
            <textarea
              value={customPrompt}
              onChange={(e) => {
                setCustomPrompt(e.target.value);
                setSelectedStyle(null);
              }}
              placeholder="Ex: 'ภาพวาดพาสเทลสไตล์โมเดิร์น'..."
              className="w-full p-8 bg-slate-900/40 border border-slate-800 text-white rounded-[2.5rem] focus:ring-4 focus:ring-indigo-500/20 outline-none h-40 text-lg placeholder:text-slate-700 transition-all shadow-inner"
            />
          </div>

          <button
            disabled={loading || (!selectedStyle && !customPrompt)}
            onClick={handleGenerate}
            className={`w-full py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center space-x-4 transition-all ${
              loading || (!selectedStyle && !customPrompt)
                ? 'bg-slate-800 text-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:scale-[1.03] shadow-[0_20px_60px_rgba(99,102,241,0.3)] active:scale-95'
            }`}
          >
            <Sparkles size={32} />
            <span>TRANSMUTE IMAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
