import { Button } from '@/components/ui/button'
import { Option } from '@/Features/onboarding/types'
import { RiskOptionsScreenProps } from '@/Features/onboarding/types'
import { OptionCard } from '@/Features/onboarding/components/molecules/riskOptionCard'
import { useOnboardingStore } from '@/Features/onboarding/state'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/ui/spinner'
import { useDashboardStore } from '@/Features/userDashboard/state'

const OPTIONS: Option[] = [
  {
    id: 0,
    key: '50-upwards',
    title: '',
    description: 'More than 50%',
  },
  {
    id: 1,
    key: '25-50',
    title: '',
    description: '25% to 50%',
  },
  {
    id: 2,
    key: '10-25',
    title: '',
    description: '10% to 25%',
  },
  {
    id: 3,
    key: 'less-than-10',
    title: '',
    description: 'Less than 10%',
  },
]

export const IlliquidInvestmentScreen: React.FC<RiskOptionsScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const { loading, saveRiskInfo, resetOnboarding } = useOnboardingStore()
  const { populateDashboardData } = useDashboardStore()

  const router = useRouter()

  const handleOptionSelect = (option: Option) => {
    onChange(option)
  }

  const saveRisk = async () => {
    try {
      await saveRiskInfo()
      await populateDashboardData()
      resetOnboarding()
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        What proportion of your investments are you willing to have invested in
        illiquid assets?
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
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={saveRisk}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!value || loading}
        >
         {loading && <Spinner/>} Continue
        </Button>
      </div>
    </div>
  )
}
