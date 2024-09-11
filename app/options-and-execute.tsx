import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OptionsAndExecuteProps {
  option: string
  setOption: (value: string) => void
  onExecute: () => void
}

export default function OptionsAndExecute({ option, setOption, onExecute }: OptionsAndExecuteProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="option">Choose an option</Label>
            <Select onValueChange={setOption} value={option}>
              <SelectTrigger id="option">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onExecute} className="w-full">Execute</Button>
        </div>
      </CardContent>
    </Card>
  )
}