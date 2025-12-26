'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else {
      setLoading(false)
    }
  }, [status, router])

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="space-x-4">
              <Link href="/">
                <Button variant="ghost">หน้าหลัก</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            สวัสดี, {session?.user?.name || session?.user?.email}
          </h2>
          <p className="text-gray-600">จัดการระบบ AI Image Style Transfer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/styles">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>จัดการสไตล์</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">เพิ่ม แก้ไข หรือลบสไตล์ต่างๆ</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/gallery">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>ดูแกลเลอรี่</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">ดูภาพทั้งหมดที่สร้างโดย AI</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">สถิติ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">ดูสถิติการใช้งานระบบ</p>
              <p className="text-sm text-gray-500 mt-2">(กำลังพัฒนา)</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
