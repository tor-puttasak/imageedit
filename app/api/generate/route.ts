import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToGCS } from '@/lib/storage'
import { generateImageWithGemini } from '@/lib/gemini'
import { generateFileName } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const styleId = formData.get('styleId') as string
    const customPrompt = formData.get('customPrompt') as string | null
    const userText = formData.get('userText') as string | null

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await imageFile.arrayBuffer()
    const imageBuffer = Buffer.from(arrayBuffer)

    // Upload original image to GCS
    const originalFileName = generateFileName('original', 'jpg')
    const originalImageUrl = await uploadToGCS(
      imageBuffer,
      originalFileName,
      imageFile.type
    )

    // Get style prompt if styleId provided
    let prompt = customPrompt || ''
    let styleName = 'Custom'

    if (styleId && !customPrompt) {
      const style = await prisma.style.findUnique({
        where: { id: styleId },
      })

      if (!style) {
        return NextResponse.json(
          { error: 'Style not found' },
          { status: 404 }
        )
      }

      prompt = style.prompt
      styleName = style.name
    }

    // Generate new image with Gemini
    // Note: This is a placeholder - actual image generation with Gemini
    // may require different approach or additional APIs
    const generatedImageData = await generateImageWithGemini(
      imageBuffer,
      prompt,
      userText || undefined
    )

    // For now, we'll use the original image URL as generated
    // You'll need to implement actual image generation logic
    // based on Gemini API's capabilities or use Imagen API
    const generatedFileName = generateFileName('generated', 'jpg')
    const generatedImageUrl = originalImageUrl // Placeholder

    // Save to database
    const generatedImage = await prisma.generatedImage.create({
      data: {
        originalImageUrl,
        generatedImageUrl,
        styleName,
        styleId: styleId || null,
        userText,
        customPrompt,
      },
    })

    return NextResponse.json({
      id: generatedImage.id,
      originalImageUrl: generatedImage.originalImageUrl,
      generatedImageUrl: generatedImage.generatedImageUrl,
      styleName: generatedImage.styleName,
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
