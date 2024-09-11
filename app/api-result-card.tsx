import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ApiResultCardProps {
  apiResult: string
}

export default function ApiResultCard({ apiResult }: ApiResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Result</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <pre>{apiResult}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}