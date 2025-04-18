"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import Image from "next/image"

export function ImageUpload() {
  const [images, setImages] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-2 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 bg-white/80 hover:bg-white/90 rounded-full z-10"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Image
                src={image || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            </CardContent>
          </Card>
        ))}
        <Card className="border-dashed">
          <CardContent className="p-2 flex items-center justify-center h-full min-h-[6rem]">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Upload</span>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
