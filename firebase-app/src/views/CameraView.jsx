import { useEffect, useRef } from 'react';
import { startCamera, stopCamera, captureImage } from '../utils/camera';
import { VIEWS } from '../config/constants';

export const CameraView = ({ onCapture, onViewChange, onImageSelect }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera(videoRef).catch((error) => {
      console.error('Camera error:', error);
      alert(error.message);
      onViewChange(VIEWS.HOME);
    });

    return () => {
      stopCamera(videoRef);
    };
  }, [onViewChange]);

  const handleCapture = () => {
    try {
      const imageData = captureImage(videoRef, canvasRef);
      stopCamera(videoRef);
      onImageSelect(imageData);
      onViewChange(VIEWS.EDITOR);
    } catch (error) {
      console.error('Capture error:', error);
      alert('ไม่สามารถถ่ายภาพได้ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleBack = () => {
    stopCamera(videoRef);
    onViewChange(VIEWS.HOME);
  };

  return (
    <div className="flex flex-col items-center space-y-14 py-10 animate-in zoom-in-95 duration-700">
      <div className="relative rounded-[5rem] overflow-hidden shadow-[0_0_200px_rgba(99,102,241,0.3)] bg-black aspect-[3/4] max-w-md w-full border-[12px] border-slate-900/60">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute top-10 left-10 flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
          <div className="text-[11px] font-black text-white tracking-[0.4em] uppercase opacity-70">
            Live Feed
          </div>
        </div>
      </div>

      <div className="flex space-x-12 items-center">
        <button
          onClick={handleBack}
          className="text-slate-500 hover:text-white font-black tracking-[0.3em] text-xs transition-colors uppercase border-b border-transparent hover:border-white"
        >
          Back
        </button>

        <button
          onClick={handleCapture}
          className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-90 transition-all p-2 border-[10px] border-slate-900 group"
        >
          <div className="w-full h-full bg-white rounded-full border-4 border-slate-200 group-hover:bg-indigo-50 transition-colors"></div>
        </button>

        <div className="w-16"></div>
      </div>
    </div>
  );
};
