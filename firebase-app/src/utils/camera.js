export const startCamera = async (videoRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return stream;
  } catch (error) {
    console.error('Camera access error:', error);
    throw new Error('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้งานกล้อง');
  }
};

export const stopCamera = (videoRef) => {
  if (videoRef.current?.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  }
};

export const captureImage = (videoRef, canvasRef) => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas) {
    throw new Error('Video or canvas ref not available');
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);

  return canvas.toDataURL('image/png');
};
