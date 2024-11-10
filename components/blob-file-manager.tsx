'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, File, Trash2 } from 'lucide-react'

interface FileInfo {
  url: string
  pathname: string
  contentType: string
  uploadedAt: string
}

export default function BlobFileManager() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/blob')
      if (!response.ok) throw new Error('Failed to fetch files')
      const data = await response.json()
      setFiles(data.files)
    } catch (err) {
      setError('Failed to fetch files')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/blob', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const newFile = await response.json()
      setFiles(prevFiles => [...prevFiles, newFile])
    } catch (err) {
      setError('Failed to upload file')
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    try {
      const response = await fetch(`/api/blob?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Delete failed')

      setFiles(prevFiles => prevFiles.filter(file => file.url !== url))
    } catch (err) {
      setError('Failed to delete file')
      console.error(err)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Vercel Blob File Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="flex-grow"
            />
            <Button disabled={isUploading}>
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload
            </Button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <File className="h-4 w-4" />
                  <span className="flex-grow truncate">{file.pathname}</span>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}