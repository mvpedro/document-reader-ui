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
            <Label htmlFor="option">Escolha uma opção</Label>
            <Select onValueChange={setOption} value={option}>
              <SelectTrigger id="option">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Autor</SelectItem>
                <SelectItem value="option2">Réu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onExecute} className="w-full">Enviar</Button>
        </div>
      </CardContent>
    </Card>
  )
}