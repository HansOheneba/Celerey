import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyScreenProps } from "@/Features/onboarding/types";

const CURRENCY_OPTIONS = [
  "US Dollar (USD)",
  "Euro (EUR)",
  "British Pound (GBP)",
  "Japanese Yen (JPY)",
  "Canadian Dollar (CAD)",
  "Australian Dollar (AUD)",
  "Swiss Franc (CHF)",
  "Chinese Yuan (CNY)",
  "Indian Rupee (INR)",
  "South African Rand (ZAR)",
  "Nigerian Naira (NGN)",
  "Ghanaian Cedi (GHS)",
  "Kenyan Shilling (KES)",
  "Egyptian Pound (EGP)",
  "Botswana Pula (BWP)",
  "Moroccan Dirham (MAD)",
  "Ugandan Shilling (UGX)",
  "Tanzanian Shilling (TZS)",
  "Zimbabwean Dollar (ZWL)",
  "Brazilian Real (BRL)",
  // we can add more Currencies...
];
export const CurrencyScreen = ({
  value,
  onChange,
  onBack,
  onContinue,
}:CurrencyScreenProps) => {
  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cirka mb-4">
          Let&apos;s talk about your finances, income, expenses, assets and
          liabilities
        </h1>
        <p className="text-gray-600">
          Choose your currency to submit your financial details
        </p>
      </div>
      <div className="space-y-4 mb-12">
        {/* Primary Currency Dropdown */}
        <Select value={value} onValueChange={(val) => onChange(val)}>
          <SelectTrigger className="w-full text-left h-12">
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCY_OPTIONS.map((currency) => (
              <SelectItem
                key={currency}
                value={currency.toLowerCase()}
                className="cursor-pointer hover:bg-purple-50"
              >
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!value}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
