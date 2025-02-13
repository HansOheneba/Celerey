import { Button } from '@/components/ui/button'
import { Option } from '@/Features/onboarding/types'
import { RiskOptionsScreenProps } from '@/Features/onboarding/types'
import { OptionCard } from '@/Features/onboarding/components/molecules/riskOptionCard'

const OPTIONS: Option[] = [
  {
    id: 0,
    key: 'very-strong',
    title: 'Very Strong growth',
    description:
      'Seeking high returns, willing to endure significant losses for potential strong growth',
  },
  {
    id: 1,
    key: 'reasonably-strong',
    title: 'Reasonably strong growth',
    description:
      'Seeking steady growth, willing to endure losses for long-term capital preservation.',
  },
  {
    id: 2,
    key: 'moderate',
    title: 'Moderate growth',
    description:
      'Seeking moderate growth, accepting some risk for potential capital fluctuations.',
  },
  {
    id: 3,
    key: 'slow-and-steady',
    title: 'Slow and steady growth',
    description:
      'Prioritizing capital preservation over growth, minimizing risk to avoid negative changes',
  },
]

export const RiskToleranceScreen: React.FC<RiskOptionsScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
  enableBack = true,
}) => {
  const handleOptionSelect = (option: any) => {
    onChange(option)
  }

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        Let&apos;s test that theory, shall we? <br /> Which of the following
        statement best describes your risk tolerance?
      </h1>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value.key === option.key}
            onClick={() => handleOptionSelect(option)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        {enableBack && (
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
        )}
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!value}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
