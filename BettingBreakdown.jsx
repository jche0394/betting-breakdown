import React, { useState, useMemo, useEffect } from "react";
import { calcBreakdown } from "./utils/bettingCalculations.js"; // Point to utils and include .js

import InputForm from "./InputForm.jsx"; // Import local components
import ResultsSummary from "./ResultsSummary.jsx";
import ProfitChart from "./ProfitChart.jsx";
import DataTable from "./DataTable.jsx";

export default function BettingBreakdown() {
  const [inputs, setInputs] = useState({
    betOdds: 2,
    placeOdds: 1.5,
    layOdds: 3.0,
    stake: 50,
    bonusConversion: 0.7, // Stored as 0-1
    commission: 0.1,    // Stored as 0-1
    layMax: 100,
    step: 5,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const {
      betOdds,
      placeOdds,
      layOdds,
      stake,
      bonusConversion,
      commission,
      layMax,
      step,
    } = inputs;

    if (
      !betOdds || !placeOdds || !layOdds || !stake || bonusConversion === null || bonusConversion === undefined || commission === null || commission === undefined || !layMax || !step || // Check for null/undefined explicitly for 0-100 range fields
      betOdds <= 1 ||
      placeOdds <= 1 ||
      layOdds <= 1 ||
      stake <= 0 ||
      bonusConversion < 0 || bonusConversion > 1 || // Validate 0-1 range
      commission < 0 || commission > 1 ||     // Validate 0-1 range
      layMax <= 0 ||
      step <= 0
    ) {
      setError("Please enter valid positive numbers. Odds must be >1. Percentages 0-100.");
    } else if (step > layMax) {
      setError("Lay Step Size cannot be greater than Max Lay Amount.");
    }
    else {
      setError("");
    }
  }, [inputs]);

  const {
    winProb,
    placeOnlyProb,
    loseProb,
    bonusValue,
    breakdown,
    optimalLay,
  } = useMemo(() => calcBreakdown(inputs), [inputs]);

  const handleInputChange = (fieldName, value) => {
    let processedValue = +value; // Convert to number
    if (fieldName === "bonusConversion" || fieldName === "commission") {
      processedValue = +value / 100; // Convert from % to 0-1 range
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: processedValue,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-2 py-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Gym Bros Betting Breakdown Calculator</h2>
        <InputForm
          inputs={inputs}
          onInputChange={handleInputChange}
          error={error}
        />
        {!error && ( // Only show summary and actions if no error
          <>
            <ResultsSummary
              winProb={winProb}
              placeOnlyProb={placeOnlyProb}
              loseProb={loseProb}
              bonusValue={bonusValue}
            />
          </>
        )}
      </div>

      {!error && breakdown && breakdown.length > 0 && (
        <>
         <DataTable
            data={breakdown}
            winProb={winProb}
            placeOnlyProb={placeOnlyProb}
            loseProb={loseProb}
            optimalLay={optimalLay}
          />
        <br></br>
          <ProfitChart data={breakdown} />
          
        </>
      )}
       {!error && breakdown && breakdown.length > 0 && (
         <p className="text-xs text-gray-500 mt-4 text-center">
         </p>
       )}
    </div>
  );
}
