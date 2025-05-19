import React from "react";

export default function ResultsSummary({ winProb, placeOnlyProb, loseProb, bonusValue }) {
  return (
    <div className="text-gray-700 text-sm mb-2">
      <b>Probabilities:</b> Win: {winProb}%, Place (2nd/3rd): {placeOnlyProb}%, Lose (4th+): {loseProb}%.<br />
      <b>Bonus bet cash value:</b> ${bonusValue.toFixed(2)}
    </div>
  );
}
