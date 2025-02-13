interface FeaturesListProps {
  features: string[];
}

export const FeaturesList = ({ features }: FeaturesListProps) => (
  <ul className="space-y-2 text-sm text-gray-600">
    {features.map((feature, index) => (
      <li key={index} className="flex items-start">
        <span className="mr-2">•</span>
        {feature}
      </li>
    ))}
  </ul>
);
