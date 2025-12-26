'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Loader2, Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Style {
  id: string
  name: string
  prompt: string
  isActive: boolean
  order: number
}

export default function StylesManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [styles, setStyles] = useState<Style[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    prompt: '',
    order: 0,
  })

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else {
      fetchStyles()
    }
  }, [status, router])

  const fetchStyles = async () => {
    try {
      const response = await fetch('/api/styles')
      const data = await response.json()
      setStyles(data)
    } catch (error) {
      console.error('Error fetching styles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/styles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create style')

      setCreating(false)
      setFormData({ name: '', prompt: '', order: 0 })
      fetchStyles()
    } catch (error) {
      console.error('Error creating style:', error)
      alert('เกิดข้อผิดพลาดในการสร้างสไตล์')
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/styles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update style')

      setEditingId(null)
      setFormData({ name: '', prompt: '', order: 0 })
      fetchStyles()
    } catch (error) {
      console.error('Error updating style:', error)
      alert('เกิดข้อผิดพลาดในการอัพเดทสไตล์')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบสไตล์นี้?')) return

    try {
      const response = await fetch(`/api/styles/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete style')

      fetchStyles()
    } catch (error) {
      console.error('Error deleting style:', error)
      alert('เกิดข้อผิดพลาดในการลบสไตล์')
    }
  }

  const handleEdit = (style: Style) => {
    setEditingId(style.id)
    setFormData({
      name: style.name,
      prompt: style.prompt,
      order: style.order,
    })
    setCreating(false)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setCreating(false)
    setFormData({ name: '', prompt: '', order: 0 })
  }

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
            <Link href="/admin/dashboard">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับ Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">จัดการสไตล์</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button onClick={() => { setCreating(true); setEditingId(null); }}>
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มสไตล์ใหม่
          </Button>
        </div>

        {(creating || editingId) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{creating ? 'เพิ่มสไตล์ใหม่' : 'แก้ไขสไตล์'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">ชื่อสไตล์</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="เช่น Anime Style"
                />
              </div>

              <div>
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  placeholder="ใส่ prompt สำหรับสไตล์นี้..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="order">ลำดับการแสดงผล</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => creating ? handleCreate() : handleUpdate(editingId!)}
                  disabled={!formData.name || !formData.prompt}
                >
                  {creating ? 'สร้าง' : 'อัพเดท'}
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  ยกเลิก
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {styles.map((style) => (
            <Card key={style.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{style.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{style.prompt}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>ลำดับ: {style.order}</span>
                      <span>สถานะ: {style.isActive ? '✓ Active' : '✗ Inactive'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(style)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(style.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {styles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">ยังไม่มีสไตล์ เพิ่มสไตล์แรกของคุณเลย!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
