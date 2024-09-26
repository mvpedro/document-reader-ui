import { useRef, useCallback } from "react"
import { Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadAreaProps {
  file: File | null
  onFileUpload: (file: File) => void
  onFileDelete: () => void
}

export default function FileUploadArea({ file, onFileUpload, onFileDelete }: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      onFileUpload(file)
    } else {
      alert("Por favor, selecione apenas arquivos PDF.")
    }
  }, [onFileUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        onFileUpload(file)
      } else {
        alert("Por favor, selecione apenas arquivos PDF.")
      }
    }
  }, [onFileUpload])
  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <Card>
      <CardContent className="p-6">
        {!file ? (
          <div
            onClick={handleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="flex flex-col items-center justify-center h-40 cursor-pointer"
          >
            <Upload className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Arraste e solte um arquivo PDF aqui ou clique para selecionar</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf"
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size="icon" onClick={onFileDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}