import React, { useState, useEffect } from "react";
import { differenceInCalendarMonths, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmergencyPlan } from "../../types";

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

interface EmergencyFundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditEmergency: (plan: EmergencyPlan) => void;
  initialData?: EmergencyPlan;
}

interface EmergencyFormData {
  name: string;
  currentDuration: string;
  targetDuration: string;
  durationStart: string;
  durationEnd: string;
  goalDuration: string;
  durationLeft: string;
}

const EmergencyFundModal: React.FC<EmergencyFundModalProps> = ({
  isOpen,
  onClose,
  onEditEmergency,
  initialData,
}) => {
  const [formData, setFormData] = useState<EmergencyFormData>(() => ({
    name: initialData?.name || "Emergency Fund",
    currentDuration: initialData?.duration.toString() || "",
    targetDuration: initialData?.targetDuration.toString() || "",
    durationStart: initialData?.durationStart || "",
    durationEnd: initialData?.durationEnd || "",
    goalDuration: initialData?.goalDuration.toString() || "",
    durationLeft: initialData?.durationLeft.toString() || "",
  }));

  // Calculate durations when dates change
  const calculateDurations = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return { goalDuration: "0", durationLeft: "0" };

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const now = new Date();

    const goalDuration = Math.max(0, differenceInCalendarMonths(end, start));
    const durationLeft = Math.max(0, differenceInCalendarMonths(end, now));

    return {
      goalDuration: goalDuration.toString(),
      durationLeft: durationLeft.toString(),
    };
  };

  // Reset form when modal opens or initial data changes
  useEffect(() => {
    if (isOpen && initialData) {
      const updatedFormData = {
        name: initialData.name,
        currentDuration: initialData.duration.toString(),
        targetDuration: initialData?.targetDuration.toString(),
        durationStart: initialData.durationStart,
        durationEnd: initialData.durationEnd,
        goalDuration: initialData.goalDuration.toString(),
        durationLeft: initialData.durationLeft.toString(),
      };

      if (updatedFormData.durationStart && updatedFormData.durationEnd) {
        const { goalDuration, durationLeft } = calculateDurations(
          updatedFormData.durationStart,
          updatedFormData.durationEnd
        );
        updatedFormData.goalDuration = goalDuration;
        updatedFormData.durationLeft = durationLeft;
      }

      setFormData(updatedFormData);
    }
  }, [isOpen, initialData]);

  // Update durations when start or end dates change
  useEffect(() => {
    if (formData.durationStart && formData.durationEnd) {
      const { goalDuration, durationLeft } = calculateDurations(
        formData.durationStart,
        formData.durationEnd
      );

      setFormData((prev) => ({
        ...prev,
        goalDuration,
        durationLeft,
      }));
    }
  }, [formData.durationStart, formData.durationEnd]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic date validation
    if (new Date(formData.durationStart) >= new Date(formData.durationEnd)) {
      alert("End date must be after start date");
      return;
    }

    // Calculate progress percentage
    const progress =
      (parseFloat(formData.currentDuration) /
        parseFloat(formData.targetDuration)) *
      100;

    const updatedPlan: EmergencyPlan = {
      name: "Emergency Fund",
      duration: parseFloat(formData.currentDuration),
      targetDuration: parseFloat(formData.targetDuration),
      progress: Math.min(progress, 100),
      durationStart: formData.durationStart,
      durationEnd: formData.durationEnd,
      goalDuration: parseInt(formData.goalDuration),
      durationLeft: parseInt(formData.durationLeft),
    };

    onEditEmergency(updatedPlan);
    onClose();
  };

  // Prevent unintended modal closure
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-[500px] p-0 max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="px-8 py-4 space-y-2">
          <DialogTitle className="text-2xl text-center font-cirka">
            Modify Emergency Fund
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Enter your new emergency goal
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pb-6 space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">Name of goal</label>
            <Input
              value="Emergency Fund"
              disabled
              className="w-2/3 rounded-lg border-gray-200"
            />
          </div>

          {/* Target Duration */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">Target duration</label>
            <Input
              type="number"
              placeholder="e.g., 6 months"
              value={formData.targetDuration}
              onChange={(e) =>
                setFormData({ ...formData, targetDuration: e.target.value })
              }
              required
              min="0.1"
              step="0.1"
              className="w-2/3 rounded-lg border-gray-200"
            />
          </div>

          {/* Current Duration */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">Current duration</label>
            <Input
              type="number"
              placeholder="e.g., 2 months"
              value={formData.currentDuration}
              onChange={(e) =>
                setFormData({ ...formData, currentDuration: e.target.value })
              }
              required
              min="0"
              step="0.1"
              className="w-2/3 rounded-lg border-gray-200"
            />
          </div>

          {/* Start Date Picker */}
          <CustomDatePicker
            label="Select month to start goal"
            value={formData.durationStart}
            onChange={(date) =>
              setFormData({ ...formData, durationStart: date })
            }
            placeholder="Select start date"
            required
          />

          {/* End Date Picker */}
          <CustomDatePicker
            label="Deadline for goal"
            value={formData.durationEnd}
            onChange={(date) => setFormData({ ...formData, durationEnd: date })}
            placeholder="Select end date"
            required
          />

          {/* Goal Duration */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">
              Goal Duration (months)
            </label>
            <Input
              type="number"
              value={formData.goalDuration}
              readOnly
              className="w-2/3 rounded-lg border-gray-200 bg-gray-50"
            />
          </div>

          {/* Duration Left */}
          <div className="flex items-center justify-between space-x-4">
            <label className="text-gray-900 w-1/3">
              Duration Left (months)
            </label>
            <Input
              type="number"
              value={formData.durationLeft}
              onChange={(e) =>
                setFormData({ ...formData, durationLeft: e.target.value })
              }
              className="w-2/3 rounded-lg border-gray-200"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-lg"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-navy hover:bg-navyLight"
            >
              Add Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyFundModal;
