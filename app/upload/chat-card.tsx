import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatePresence, motion } from "framer-motion"

interface ChatCardProps {
  chatMessages: string[]
  newMessage: string
  setNewMessage: (value: string) => void
  onSendMessage: () => void
}

export default function ChatCard({ chatMessages, newMessage, setNewMessage, onSendMessage }: ChatCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow w-full rounded-md border p-4 mb-4">
          <AnimatePresence>
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-2"
              >
                {message}
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          />
          <Button onClick={onSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}