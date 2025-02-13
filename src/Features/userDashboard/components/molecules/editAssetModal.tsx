import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { AssetType, CountryType } from '../../types'
import { countries } from '@/Features/onboarding/countries'
import { useOnboardingStore } from '@/Features/onboarding/state'
import Spinner from '@/components/ui/spinner'
import { useDashboardStore } from '../../state'

interface EditAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (assets: AssetType[], countries: CountryType[]) => void
  initialAssets?: AssetType[]
  initialCountries?: {[key:string]: number}
}

const availableCountries = [...countries]

const EditAssetModal: React.FC<EditAssetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAssets = [],
  initialCountries = [],
}) => {

  const [assets, setAssets] = useState<AssetType[]>(initialAssets)
  const [showAdditionalField, setShowAdditionalField] = useState(false)
  const [newAssetName, setNewAssetName] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<any>(
    Object.keys(initialCountries),
  )
  const [countrySearchValue, setCountrySearchValue] = useState('')
  const [userSelectedCountry, setUserSelectedCountry]: any = useState()
  const { loading, updateAssets } = useDashboardStore()

  useEffect(() => {
    setAssets(initialAssets)
    setSelectedCountries(Object.keys(initialCountries))
  }, [initialAssets, initialCountries])

  const handleAmountChange = (key: string, value: string) => {
    const newAssets = assets.map((asset) =>
      asset.key === key ? { ...asset, amount: parseFloat(value) || 0 } : asset,
    )
    setAssets(newAssets)
  }

  const handleAddAsset = () => {
    if (newAssetName.trim()) {
      const newAsset: AssetType = {
        id: `new-${Date.now()}`,
        category: newAssetName.trim(),
        amount: 0,
      }
      setAssets([...assets, newAsset])
      setNewAssetName('')
      setShowAdditionalField(false)
    }
  }

  const handleAddCountry = () => {
    if (!selectedCountries.includes(userSelectedCountry.code)) {
      setSelectedCountries([...selectedCountries, userSelectedCountry.code])
      setUserSelectedCountry(null)
      setCountrySearchValue('')
    } else {
      setUserSelectedCountry('')
      setCountrySearchValue('')
    }
  }

  const handleRemoveCountry = (index: number) => {
    const countries = [...selectedCountries]
    countries.splice(index, 1)
    setSelectedCountries(countries)
  }

  const handleSave = async () => {
    try {
      await updateAssets(assets, selectedCountries)
      onClose()
    } catch (error) {
      console.log('Error', error)
    }
  }

  const filteredCountries = availableCountries.filter((country) =>
    country.name.toLowerCase().includes(countrySearchValue.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl px-5 w-[95%] md:w-full mx-auto overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-cirka text-center mb-2">
            Edit Assets
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Modify your assets
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8"
              >
                <label className="text-base text-gray-700 min-w-0 md:min-w-[200px]">
                  {asset.category}
                </label>
                <Input
                  type="number"
                  value={asset.amount}
                  onChange={(e) =>
                    handleAmountChange(asset?.key || '', e.target.value)
                  }
                  className="w-full md:w-[200px] text-right"
                />
              </div>
            ))}

            {/* Add Additional Asset Field */}
            {/* {showAdditionalField ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
                <Input
                  type="text"
                  placeholder="Please Specify"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="w-full md:min-w-[200px]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddAsset()
                    }
                  }}
                />
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-full md:w-[200px] text-right"
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAdditionalField(true)}
                className="text-navyLight text-sm flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Additional Asset(s)
              </button>
            )} */}
          </div>

          {/* Country Selection */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
              <label className="text-base text-gray-700 md:min-w-[200px]">
                In Which Country(ies) are your assets?
              </label>
              <div className="flex-1 w-full">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search countries..."
                    value={countrySearchValue}
                    onChange={(e) => setCountrySearchValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleAddCountry}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {countrySearchValue && (
                  <div className="absolute z-10 w-[calc(100%-3rem)] md:w-[200px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setUserSelectedCountry(country)
                          setCountrySearchValue(country.name)
                        }}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCountries.map((country: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{country}</span>
                      <button
                        onClick={() => handleRemoveCountry(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full md:flex-1"
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            type="button"
            className="w-full md:flex-1 bg-navy hover:bg-navyLight"
            onClick={handleSave}
            disabled={loading}
          >
            {loading && <Spinner />} Modify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditAssetModal
