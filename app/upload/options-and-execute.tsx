import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OptionsAndExecuteProps {
  option: string
  setOption: (value: string) => void
  onExecute: () => void
  isExecuteDisabled: boolean
}

export default function OptionsAndExecute({ option, setOption, onExecute, isExecuteDisabled }: OptionsAndExecuteProps) {
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
                <SelectItem value="autor">Autor</SelectItem>
                <SelectItem value="reu">Réu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onExecute} className="w-full" disabled={isExecuteDisabled}>
            Executar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}