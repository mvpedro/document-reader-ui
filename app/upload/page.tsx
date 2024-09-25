"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import FileUploadArea from "./file-upload-area"
import OptionsAndExecute from "./options-and-execute"
import ApiResultCard from "./api-result-card"
import ChatCard from "./chat-card"

export default function FileUploadAndChat() {
  const [file, setFile] = useState<File | null>(null)
  const [option, setOption] = useState<string>("")
  const [apiResult, setApiResult] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const { toast } = useToast()

  const handleFileUpload = useCallback((selectedFile: File) => {
    toast({
      title: "Uploading file...",
      description: "Please wait while we process your file.",
    })
    setTimeout(() => {
      setFile(selectedFile)
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} has been uploaded.`,
        variant: "default",
      })
    }, 2000)
  }, [toast])

  const handleFileDelete = useCallback(() => {
    setFile(null)
  }, [])

  const handleExecute = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      let response;
      if (process.env.NODE_ENV === 'production') {
        response = await fetch(
          "https://flask-b-bd804e71c25f.herokuapp.com/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );
      } else {
        response = await fetch("/api/mock-upload", {
          method: "POST",
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setApiResult(data.text);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, newMessage])
      setNewMessage("")
    }
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex p-4 flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full md:w-2/3 space-y-4"
      >
        <FileUploadArea file={file} onFileUpload={handleFileUpload} onFileDelete={handleFileDelete} />
        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OptionsAndExecute option={option} setOption={setOption} onExecute={handleExecute} />
              <ApiResultCard apiResult={apiResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full md:w-1/3"
      >
        <ChatCard
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
        />
      </motion.div>
    </motion.div>
  )
}