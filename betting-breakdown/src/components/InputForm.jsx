import React from "react";

export default function InputForm({ inputs, onInputChange, error }) {
  const handleFieldChange = (fieldName, value) => {
    onInputChange(fieldName, value);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow p-6 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Input field */}
        <label className="flex flex-col font-medium text-gray-700">
          Win Odds
          <input
            type="number"
            step="0.01"
            min="1.01"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.betOdds}
            onChange={(e) => handleFieldChange("betOdds", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Place Odds
          <input
            type="number"
            step="0.01"
            min="1.01"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.placeOdds}
            onChange={(e) => handleFieldChange("placeOdds", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Betfair Lay Odds
          <input
            type="number"
            step="0.01"
            min="1.01"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.layOdds}
            onChange={(e) => handleFieldChange("layOdds", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Back Stake
          <input
            type="number"
            step="1"
            min="0.01"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.stake}
            onChange={(e) => handleFieldChange("stake", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Bonus Conversion (%)
          <input
            type="number"
            step="1"
            min="0"
            max="100"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.bonusConversion * 100}
            onChange={(e) => handleFieldChange("bonusConversion", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Betfair Commission (%)
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.commission * 100}
            onChange={(e) => handleFieldChange("commission", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Max Lay Amount
          <input
            type="number"
            step="1"
            min="1"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.layMax}
            onChange={(e) => handleFieldChange("layMax", e.target.value)}
          />
        </label>
        <label className="flex flex-col font-medium text-gray-700">
          Lay Step Size
          <input
            type="number"
            step="1"
            min="1"
            className="mt-2 bg-white rounded-md border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 transition"
            value={inputs.step}
            onChange={(e) => handleFieldChange("step", e.target.value)}
          />
        </label>
      </div>
      {error && (
        <div className="mt-4 mb-2 text-red-500 text-sm text-center">{error}</div>
      )}
    </div>
  );
}
