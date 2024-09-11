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

  const handleExecute = () => {
    setApiResult("Example API result with 20 lines of text.\n".repeat(20))
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