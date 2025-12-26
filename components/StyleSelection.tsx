'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Style {
  id: string
  name: string
  prompt: string
  order: number
}

interface StyleSelectionProps {
  onStyleSelect: (styleId: string | null, customPrompt?: string) => void
  selectedStyleId?: string | null
}

export default function StyleSelection({ onStyleSelect, selectedStyleId }: StyleSelectionProps) {
  const [styles, setStyles] = useState<Style[]>([])
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStyles()
  }, [])

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

  const handleStyleClick = (styleId: string) => {
    setShowCustomPrompt(false)
    setCustomPrompt('')
    onStyleSelect(styleId)
  }

  const handleCustomPromptClick = () => {
    setShowCustomPrompt(true)
    onStyleSelect(null)
  }

  const handleCustomPromptChange = (value: string) => {
    setCustomPrompt(value)
    onStyleSelect(null, value)
  }

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">กำลังโหลด...</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>เลือกสไตล์</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {styles.map((style) => (
              <Button
                key={style.id}
                variant={selectedStyleId === style.id ? 'default' : 'outline'}
                onClick={() => handleStyleClick(style.id)}
                className="h-auto py-4 px-4 flex-col items-start"
              >
                <span className="font-semibold">{style.name}</span>
                <span className="text-xs text-left mt-1 line-clamp-2 opacity-70">
                  {style.prompt}
                </span>
              </Button>
            ))}

            <Button
              variant={showCustomPrompt ? 'default' : 'outline'}
              onClick={handleCustomPromptClick}
              className="h-auto py-4 px-4 flex-col items-start"
            >
              <span className="font-semibold">Custom Prompt</span>
              <span className="text-xs text-left mt-1 opacity-70">
                สร้างสไตล์ของคุณเอง
              </span>
            </Button>
          </div>

          {showCustomPrompt && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="customPrompt">Custom Prompt</Label>
              <Textarea
                id="customPrompt"
                placeholder="ใส่ prompt ของคุณเอง..."
                value={customPrompt}
                onChange={(e) => handleCustomPromptChange(e.target.value)}
                rows={4}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
