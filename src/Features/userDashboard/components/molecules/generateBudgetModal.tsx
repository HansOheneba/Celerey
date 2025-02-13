import React, { useState } from "react";
import { X, Plus, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BudgetModalProps, GeneratedBudget, BudgetArea } from "../../types";

const PREDEFINED_AREAS = [
  "Travel",
  "Entertainment",
  "Apartment",
  "Food",
  "Utilities",
];
const COLORS = ["#8BA78D", "#1B1856", "#E15B2D", "#383396", "#2E8B57"];

const GenerateBudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onGenerateBudget,
}) => {
  const [duration, setDuration] = useState("12");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [customArea, setCustomArea] = useState<string>("");
  const [stage, setStage] = useState<"select" | "generating" | "preview">(
    "select"
  );
  const [generatedBudget, setGeneratedBudget] =
    useState<GeneratedBudget | null>(null);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const addCustomArea = () => {
    if (customArea.trim() && !selectedAreas.includes(customArea.trim())) {
      setSelectedAreas((prev) => [...prev, customArea.trim()]);
      setCustomArea(""); // Reset custom area input
    }
  };

  const generateDummyBudget = (): GeneratedBudget => {
    const totalBudget = 120000;
    const areas: BudgetArea[] = selectedAreas.map((area, index) => ({
      name: area,
      percentage: Math.floor(Math.random() * 20) + 10,
      amount: totalBudget * (Math.floor(Math.random() * 20 + 10) / 100),
      color: COLORS[index % COLORS.length],
    }));

    return {
      duration: `${duration} months`,
      areas,
      totalBudget,
    };
  };

  const handleGenerate = () => {
    setStage("generating");
    setTimeout(() => {
      const budget = generateDummyBudget();
      setGeneratedBudget(budget);
      setStage("preview");
    }, 2000);
  };

  const handleRegenerate = () => {
    // Fully reset to initial state
    setStage("select");
    setSelectedAreas([]);
    setCustomArea("");
    setGeneratedBudget(null);
    setDuration("12");
  };

  const handleAcceptBudget = () => {
    if (generatedBudget) {
      onGenerateBudget(generatedBudget);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] flex flex-col relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <h2 className="text-3xl text-center font-cirka font-bold">
            Generate Budget
          </h2>
          <p className="text-sm text-center text-gray-600">
            Let us generate a budget for you based on your lifestyle
          </p>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto pr-2">
          {stage === "select" && (
            <>
              <div className="mb-4">
                <label className="block text-sm mb-2">Budget Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="12">12 months</option>
                  <option value="6">6 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Budget Areas</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {PREDEFINED_AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => toggleArea(area)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedAreas.includes(area)
                          ? "bg-navy text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>

                {/* Custom Area Input */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    placeholder="Add custom budget area"
                    className="flex-grow border rounded p-2 text-sm"
                  />
                  <button
                    onClick={addCustomArea}
                    className="bg-navy text-white p-2 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Display Selected Areas */}
                {selectedAreas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAreas.map((area) => (
                      <div
                        key={area}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        {area}
                        <button
                          onClick={() => toggleArea(area)}
                          className="ml-2 text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {stage === "generating" && (
            <div className="text-center py-12">
              <span className="text-navy text-center text-xl font-cirka">
                ✨ Please be patient while we generate your budget
              </span>
            </div>
          )}

          {stage === "preview" && generatedBudget && (
            <div>
              <div className="text-center mb-4">
                <h3 className="text-base font-medium text-navy">
                  ✨ Based on your lifestyle, we think you will like this budget
                </h3>
                <p className="text-sm text-gray-600">
                  If you don&apos;t, just{" "}
                  <span
                    className="text-navyLight hover:underline hover:cursor-pointer"
                    onClick={handleRegenerate}
                  >
                    tap to regenerate
                  </span>
                </p>
              </div>

              <div className="w-full aspect-square max-w-[250px] mx-auto mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={generatedBudget.areas}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="100%"
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {generatedBudget?.areas.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {generatedBudget?.areas.map((area, index) => (
                  <div key={area.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{area.name}</span>
                      <span className="text-gray-900">{area.percentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${area.percentage}%`,
                            backgroundColor: area.color,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        ${area.amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Always Visible */}
        <div className="mt-4 flex gap-4">
          {stage === "select" && (
            <>
              <button
                onClick={onClose}
                className="flex-1 border border-navy text-navy rounded py-2"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={selectedAreas.length === 0}
                className="flex-1 bg-navy text-white rounded py-2 disabled:opacity-50"
              >
                Generate Budget
              </button>
            </>
          )}

          {stage === "generating" && (
            <div className="w-full text-center  text-navy">
              Generating budget...
            </div>
          )}

          {stage === "preview" && (
            <>
              <button
                onClick={handleRegenerate}
                className="flex-1 border border-navy text-navy rounded py-2 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Regenerate
              </button>
              <button
                onClick={handleAcceptBudget}
                className="flex-1 bg-navy text-white rounded py-2"
              >
                Accept Budget
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateBudgetModal;
