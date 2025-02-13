import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Custom DatePicker component
const CustomDatePicker: React.FC<{
  label: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  required?: boolean;
}> = ({ label, value, onChange, placeholder, required }) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      <label className="text-gray-900 w-1/3">{label}</label>
      <div className="w-2/3">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent 
            placeholder-gray-400 appearance-none"
        />
      </div>
    </div>
  );
};

// handle date range
interface MiniIncomeStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (startDate: string, endDate: string) => void;
}

const MiniIncomeStatementModal: React.FC<MiniIncomeStatementModalProps> = ({
  isOpen,
  onClose,
  onDownload,
}) => {
  // State for start and end dates
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  // Handle download action with date range
  const handleDownload = () => {
    if (startDate && endDate) {
      onDownload(startDate, endDate);
      onClose();
    }
  };

  // Validate if end date is after start date
  const isValidDateRange = React.useMemo(() => {
    if (!startDate || !endDate) return false;
    return new Date(endDate) > new Date(startDate);
  }, [startDate, endDate]);

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setStartDate("");
      setEndDate("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-cirka text-2xl text-center font-normal">
            Generate Mini-Income Statement
          </DialogTitle>
          <p className="text-gray-600 text-sm text-center mt-2">
            Select date range for your statement
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            <CustomDatePicker
              label="Start duration"
              value={startDate}
              onChange={setStartDate}
              required
            />
            <CustomDatePicker
              label="End duration"
              value={endDate}
              onChange={setEndDate}
              required
            />
            {startDate && endDate && !isValidDateRange && (
              <p className="text-red-500 text-sm">
                End date must be after start date
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              type="button"
              className="flex-1 bg-[#1B1856] hover:bg-[#1B1856]/90"
              onClick={handleDownload}
              disabled={!startDate || !endDate || !isValidDateRange}
            >
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MiniIncomeStatementModal;