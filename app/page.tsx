'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'
import StyleSelection from '@/components/StyleSelection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState<string>('')
  const [userText, setUserText] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    setGeneratedImageUrl(null)
  }

  const handleStyleSelect = (styleId: string | null, prompt?: string) => {
    setSelectedStyleId(styleId)
    if (prompt) {
      setCustomPrompt(prompt)
    } else {
      setCustomPrompt('')
    }
  }

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert('กรุณาเลือกรูปภาพก่อน')
      return
    }

    if (!selectedStyleId && !customPrompt) {
      alert('กรุณาเลือกสไตล์หรือใส่ custom prompt')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      if (selectedStyleId) {
        formData.append('styleId', selectedStyleId)
      }
      if (customPrompt) {
        formData.append('customPrompt', customPrompt)
      }
      if (userText) {
        formData.append('userText', userText)
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setGeneratedImageUrl(data.generatedImageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
      alert('เกิดข้อผิดพลาดในการสร้างภาพ')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImageUrl) return

    const link = document.createElement('a')
    link.href = generatedImageUrl
    link.download = 'generated-image.jpg'
    link.click()
  }

  const handleShare = async (platform: 'facebook' | 'twitter' | 'line') => {
    if (!generatedImageUrl) return

    const text = 'Check out my AI-generated image!'
    const url = window.location.origin + '/gallery'

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, '_blank')
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">AI Image Style Transfer</h1>
            <div className="space-x-4">
              <Link href="/gallery">
                <Button variant="ghost">Gallery</Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="ghost">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
            />

            <StyleSelection
              onStyleSelect={handleStyleSelect}
              selectedStyleId={selectedStyleId}
            />

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userText">ข้อความของคุณ (ไม่จำเป็น)</Label>
                  <Input
                    id="userText"
                    placeholder="ใส่ชื่อหรือข้อความที่ต้องการให้ปรากฏในรูป..."
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={loading || !selectedImage || (!selectedStyleId && !customPrompt)}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      กำลังสร้างภาพ...
                    </>
                  ) : (
                    'สร้างภาพ'
                  )}
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">ผลลัพธ์</h3>
              {generatedImageUrl ? (
                <div className="space-y-4">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden border">
                    <img
                      src={generatedImageUrl}
                      alt="Generated"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={handleDownload} variant="outline" className="w-full">
                      ดาวน์โหลด
                    </Button>
                    <Button onClick={() => handleShare('facebook')} variant="outline" className="w-full">
                      แชร์ Facebook
                    </Button>
                    <Button onClick={() => handleShare('twitter')} variant="outline" className="w-full">
                      แชร์ Twitter
                    </Button>
                    <Button onClick={() => handleShare('line')} variant="outline" className="w-full">
                      แชร์ LINE
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                  <p className="text-gray-400">รอการสร้างภาพ...</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
