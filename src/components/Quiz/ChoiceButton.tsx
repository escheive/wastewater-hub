import { Button } from "@/components/ui/button"

type Props = {
  choice: string
  onSelect: (value: string) => void
  isSelected: boolean
}

export default function ChoiceButton({ choice, onSelect, isSelected }: Props) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      onClick={() => onSelect(choice)}
      className="w-full justify-start"
    >
      {choice}
    </Button>
  )
}
