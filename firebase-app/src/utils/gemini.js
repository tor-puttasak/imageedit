import { GEMINI_API_KEY, GEMINI_API_URL } from '../config/constants';

export const generateImageWithGemini = async (sourceImage, prompt, onProgress) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key') {
    throw new Error('กรุณาตั้งค่า Gemini API Key ใน environment variables');
  }

  const base64Data = sourceImage.split(',')[1];

  const payload = {
    contents: [{
      parts: [
        {
          text: `Style Instruction: ${prompt}. Process the input image and return the styled version.`
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Data
          }
        }
      ]
    }],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  };

  const callAI = async (retryCount = 0) => {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'API call failed');
      }

      const result = await response.json();
      const base64 = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

      if (!base64) {
        throw new Error('No image data in response');
      }

      return `data:image/png;base64,${base64}`;
    } catch (error) {
      if (retryCount < 5) {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return callAI(retryCount + 1);
      }
      throw error;
    }
  };

  return callAI();
};

export const downloadImage = (imageUrl, filename = `art-${Date.now()}.png`) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  link.click();
};
