/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import FileUploadArea from './file-upload-area'
import OptionsAndExecute from './options-and-execute'
import ApiResultCard from './api-result-card'
import ChatCard from './chat-card'

type ChatMessage = {
  text: string;
  sender: 'user' | 'ai';
};

export default function FileUploadAndChat() {
  const [file, setFile] = useState<File | null>(null)
  const [option, setOption] = useState<string>("")
  const [embedId, setEmbedId] = useState<string | null>(null)
  const [apiResult, setApiResult] = useState<string>("")
  const [hasApiResponse, setHasApiResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("")
  const { toast } = useToast()

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile)
    toast({
      title: "Arquivo carregado",
      description: `${selectedFile.name} foi carregado com sucesso.`,
    })
  }

  const handleFileDelete = () => {
    setFile(null)
  }

  const handleExecute = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('option', option);

    try {
      setIsLoading(true);
      const response = await fetch('/api/mock-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setApiResult(data.text);
      setHasApiResponse(true);

      setEmbedId(data.embedId);

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && embedId) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: newMessage,
            embedId: embedId,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        const data = await response.json()
        setChatMessages([...chatMessages, { text: newMessage, sender: 'user' }, { text: data.response, sender: 'ai' }])
        setNewMessage("")
      } catch (error) {
        console.error('Error sending message:', error)
        toast({
          title: "Erro",
          description: "Falha ao enviar mensagem. Por favor, tente novamente.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <FileUploadArea file={file} onFileUpload={handleFileUpload} onFileDelete={handleFileDelete} />
          <OptionsAndExecute
            option={option}
            setOption={setOption}
            onExecute={handleExecute}
            isExecuteDisabled={!file || !option}
          />
          <ApiResultCard apiResult={apiResult} />
        </div>
        <ChatCard
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          isDisabled={!embedId}
        />
      </div>
    </div>
  )
}