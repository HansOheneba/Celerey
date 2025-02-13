import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  sectionNumber?: number;
  sectionTitle?: string;
  nextSectionTitle?: string;
  isSectionComplete?: boolean;
  isNextSectionComplete?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  sectionNumber,
  sectionTitle,
  nextSectionTitle,
  isSectionComplete,
  isNextSectionComplete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader className="pt-5">
          <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-medium font-cirka text-center">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500 text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {sectionNumber !== undefined && sectionTitle && (
          <div className="max-w-lg mx-auto flex items-center justify-center p-5">
            {/* Current Section Indicator */}
            <div className="flex items-center">
              <div
                className={`text-xs mr-1 font-light flex items-center justify-center w-6 h-6 rounded-full ${
                  isSectionComplete
                    ? "bg-blue-900 text-white"
                    : "bg-white border-blue-900 border text-blue-900"
                }`}
              >
                {sectionNumber}
              </div>
              <h3
                className={`font-light text-sm ${
                  isSectionComplete ? "text-blue-900" : "text-gray-500"
                }`}
              >
                {sectionTitle}
              </h3>
            </div>

            {/* Line between sections (only if there is a next section) */}
            {nextSectionTitle && (
              <div
                className={`w-32 h-[2px] my-auto mx-1 ${
                  isSectionComplete ? "bg-blue-900" : "bg-gray-300"
                }`}
              ></div>
            )}

            {/* Next Section Indicator (only if there is a next section) */}
            {nextSectionTitle && (
              <div className="flex items-center">
                <div
                  className={`text-xs mr-1 font-light flex items-center justify-center w-6 h-6 rounded-full ${
                    isNextSectionComplete
                      ? "bg-blue-900 text-white"
                      : "bg-white border-blue-900 border text-blue-900"
                  }`}
                >
                  {sectionNumber + 1}
                </div>
                <h3
                  className={`font-light text-sm ${
                    isNextSectionComplete ? "text-blue-900" : "text-gray-500"
                  }`}
                >
                  {nextSectionTitle}
                </h3>
              </div>
            )}
          </div>
        )}

        <div className="max-w-md w-full mx-auto px-4 mt-6 sm:px-0">
          {children}

          <div className="flex gap-4 mt-10">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Back
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-navy hover:bg-navyLight text-white"
              disabled={!isSectionComplete}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
