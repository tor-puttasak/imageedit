'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'

interface GalleryImage {
  id: string
  generatedImageUrl: string
  styleName: string
  userText: string | null
  createdAt: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchImages()
  }, [page])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/images?page=${page}&limit=20`)
      const data = await response.json()
      setImages(data.images)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับหน้าหลัก
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">ยังไม่มีภาพในแกลเลอรี่</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={image.generatedImageUrl}
                      alt={image.styleName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm">{image.styleName}</p>
                    {image.userText && (
                      <p className="text-xs text-gray-500 mt-1">{image.userText}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(image.createdAt).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ก่อนหน้า
                </Button>
                <span className="flex items-center px-4">
                  หน้า {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  ถัดไป
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
