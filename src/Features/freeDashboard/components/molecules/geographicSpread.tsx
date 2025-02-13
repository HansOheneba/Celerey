'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import { MoreHorizontal } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import VectorMap with SSR disabled
const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((mod) => mod.VectorMap),
  { ssr: false },
)

// Import `worldMill` statically, as it's just data, not a React component
import { worldMill } from '@react-jvectormap/world'
import { countries } from '@/Features/onboarding/countries'

export const GeographicSpread: React.FC<{ assetCountries: string[] }> = ({
  assetCountries,
}: {
  assetCountries: string[]
}) => {
  const mapData: { [key: string]: number } = {}

  assetCountries?.map((country, index) => (mapData[country] = index + 1))

  const colorScale = {
    min: 1,
    max: 4,
    values: mapData,
    scale: ['#FF1493', '#0f0251', '#DB00FF', '#E15B2D'],
  }

  const findCountry = (code: string) => {
    return countries.find((country) => country.code === code)
  }

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-[#1C1F33]">Geographic Spread</h2>
        <button>
          <MoreHorizontal className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <div className="h-[240px] relative mb-4">
        <VectorMap
          map={worldMill}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
          regionStyle={{
            initial: {
              fill: '#F3F4F6',
              stroke: '#E5E7EB',
              strokeWidth: 0.5,
              fillOpacity: 1,
            },
            hover: {
              fillOpacity: 0.8,
            },
          }}
          series={{
            regions: [
              {
                scale: colorScale.scale,
                values: colorScale.values,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                min: colorScale.min,
                max: colorScale.max,
                normalizeFunction: 'polynomial',
              },
            ],
          }}
          onRegionTipShow={() => false}
        />
      </div>

      <div className="flex justify-start items-center gap-x-4 flex-wrap">
        {Object.keys(mapData).map((key: string, index) => (
          <div key={index} className="flex items-center">
            <div style={{background: colorScale.scale[index]}} className={`w-2.5 h-2.5 rounded-full  mr-2`} />
            <span className="text-sm text-gray-600">
              {findCountry(key)?.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
