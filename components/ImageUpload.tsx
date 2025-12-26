'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, Camera, FolderOpen } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  selectedImage?: File | null
}

export default function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleGooglePicker = () => {
    // Initialize Google Picker
    const picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS_IMAGES)
      .setOAuthToken(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '')
      .setDeveloperKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '')
      .setAppId(process.env.NEXT_PUBLIC_GOOGLE_APP_ID || '')
      .setCallback((data: any) => {
        if (data.action === google.picker.Action.PICKED) {
          const fileId = data.docs[0].id
          // Download the file using Google Drive API
          downloadGoogleDriveFile(fileId)
        }
      })
      .build()
    picker.setVisible(true)
  }

  const downloadGoogleDriveFile = async (fileId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          },
        }
      )
      const blob = await response.blob()
      const file = new File([blob], 'google-drive-image.jpg', { type: blob.type })
      handleFileSelect(file)
    } catch (error) {
      console.error('Error downloading from Google Drive:', error)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">อัพโหลดรูปภาพ</h3>

        {preview ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-lg overflow-hidden border">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setPreview(null)
                onImageSelect(null as any)
              }}
              className="w-full"
            >
              เลือกรูปใหม่
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              variant="outline"
              className="h-32 flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8" />
              <span>อัพโหลดจากเครื่อง</span>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex-col gap-2"
              onClick={() => cameraInputRef.current?.click()}
            >
              <Camera className="w-8 h-8" />
              <span>ถ่ายรูป</span>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex-col gap-2"
              onClick={handleGooglePicker}
            >
              <FolderOpen className="w-8 h-8" />
              <span>Google Drive</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

// Google Picker types
declare global {
  interface Window {
    google: any
  }
  const google: any
}
