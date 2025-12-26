import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateImageWithGemini(
  imageBuffer: Buffer,
  prompt: string,
  userText?: string
): Promise<string> {
  try {
    // Use Gemini's imagen model for image generation
    // Note: As of now, Gemini API might not directly support image generation
    // This is a placeholder - you may need to use Imagen API separately
    // or integrate with other Google AI services

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    // Convert image buffer to base64
    const base64Image = imageBuffer.toString('base64')

    // Build the full prompt
    let fullPrompt = prompt
    if (userText) {
      fullPrompt += `\n\nInclude the text "${userText}" in the generated image.`
    }

    const result = await model.generateContent([
      fullPrompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    // This is a simplified version - actual implementation may differ
    // based on the specific Gemini/Imagen API capabilities
    return text
  } catch (error) {
    console.error('Error generating image with Gemini:', error)
    throw new Error('Failed to generate image')
  }
}

export async function analyzeImage(imageBuffer: Buffer): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const base64Image = imageBuffer.toString('base64')

    const result = await model.generateContent([
      'Describe this image in detail.',
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
    ])

    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error analyzing image:', error)
    throw new Error('Failed to analyze image')
  }
}
