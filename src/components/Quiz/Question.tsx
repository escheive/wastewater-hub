type Props = {
  question: string
}

export default function Question({ question }: Props) {
  return <h2 className="text-xl font-semibold mb-4">{question}</h2>
}
