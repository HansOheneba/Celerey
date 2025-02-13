import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface DebtItem {
  category: string;
  amount: number;
}

interface EditDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (debts: DebtItem[]) => void;
  initialDebts?: DebtItem[];
}

// Helper function to format number input as currency
const formatAsCurrency = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^0-9.]/g, "");

  // Ensure only one decimal point
  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts[1] ? `.${parts[1].slice(0, 2)}` : "");

  // Format as currency
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Number(formattedValue) || 0);
};

const EditDebtModal: React.FC<EditDebtModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDebts = [
    { category: "Mortgages", amount: 13252.13 },
    { category: "Mortgages", amount: 43693.52 },
    { category: "Credit Cards", amount: 73953.05 },
    { category: "Asset Finance", amount: 85386.94 },
    { category: "Other Liabilities", amount: 85386.94 },
  ],
}) => {
  const [debts, setDebts] = useState<DebtItem[]>(initialDebts);
  const [newCategory, setNewCategory] = useState<string>("");

  // Handle amount change for existing debt items
  const handleAmountChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const updatedDebts = [...debts];
    updatedDebts[index] = {
      ...updatedDebts[index],
      amount: Number(numericValue) || 0,
    };
    setDebts(updatedDebts);
  };

  // Handle adding a new debt category
  const handleAddDebt = () => {
    if (newCategory.trim()) {
      setDebts([...debts, { category: newCategory.trim(), amount: 0 }]);
      setNewCategory("");
    }
  };

  // Calculate total debt
  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-cirka text-center font-normal">
            Edit Debt
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center">
            Modify your expenses
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Existing Debt Items */}
          {debts.map((debt, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <Input value={debt.category} readOnly className="bg-gray-50" />
              </div>
              <div className="w-40">
                <Input
                  value={formatAsCurrency(debt.amount.toString())}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  className="text-right"
                />
              </div>
            </div>
          ))}

          {/* Add New Category Input */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Please Specify"
                className="bg-gray-50"
              />
            </div>
            <div className="w-40">
              <Input disabled className="text-right bg-gray-50" />
            </div>
          </div>

          {/* Add Additional Button */}
          <button
            onClick={handleAddDebt}
            className="flex items-center gap-2 text-purple-600 text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Additional Expense(s)
          </button>
        </div>

        <DialogFooter className="flex justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => {
              onSave(debts);
              onClose();
            }}
            className="flex-1 bg-indigo-900 hover:bg-indigo-800"
          >
            Modify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDebtModal;
