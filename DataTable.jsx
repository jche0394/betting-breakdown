import React from "react";

export default function DataTable({ data, winProb, placeOnlyProb, loseProb, optimalLay }) {
  if (!data || data.length === 0) return null;

  const getRowClassName = (row) => {
    let baseClasses = "transition ";
    if (row.lay === optimalLay) {
      return baseClasses + "bg-yellow-100 font-bold";
    }
    if (row.lay === 0) {
      return baseClasses + "bg-blue-50 font-semibold";
    }
    switch (row.risk) {
      case "Low":
        return baseClasses + "bg-green-100 hover:bg-green-200";
      case "High":
        return baseClasses + "bg-red-100 hover:bg-red-200";
      case "Mid":
      default:
        return baseClasses + "hover:bg-gray-50";
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-x-auto">
      <table className="w-full text-xs md:text-sm border-collapse">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th className="p-2">Lay Amount ($)</th>
            <th className="p-2">Win<br />({winProb}%)</th>
            <th className="p-2">Place<br />({placeOnlyProb}%)</th>
            <th className="p-2">Lose<br />({loseProb}%)</th>
            <th className="p-2">Liability ($)</th>
            <th className="p-2">Profit %<br /><span className="font-normal text-gray-500">(Amounts)</span></th>
            <th className="p-2">Loss %<br /><span className="font-normal text-gray-500">(Amounts)</span></th>
            <th className="p-2">Risk</th>
            <th className="p-2">Variance</th>
            {/* New Header */}
            <th className="p-2">EV x10 Bets ($)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.lay}
              className={getRowClassName(row)}
            >
              <td className="p-2 text-center">{row.lay}</td>
              <td className="p-2 text-right">${row.winProfit.toFixed(2)}</td>
              <td className="p-2 text-right">${row.placeProfit.toFixed(2)}</td>
              <td className="p-2 text-right">${row.loseProfit.toFixed(2)}</td>
              <td className="p-2 text-right">${row.layLiability.toFixed(2)}</td>
              <td className="p-2 text-right">
                {row.profitPercent}%
                <span className="text-gray-500 block">{row.profitAmounts}</span>
              </td>
              <td className="p-2 text-right">
                {row.lossPercent}%
                <span className="text-gray-500 block">{row.lossAmounts}</span>
              </td>
              <td className="p-2 text-center">{row.risk}</td>
              <td className="p-2 text-center">
                {typeof row.variance === 'number' ? row.variance.toFixed(2) : '-'}
              </td>
              {/* New Cell to display expectedProfit10Bets */}
              <td className={`p-2 text-center ${row.expectedProfit10Bets > 0 ? 'text-green-600' : row.expectedProfit10Bets < 0 ? 'text-red-600' : ''}`}>
                ${typeof row.expectedProfit10Bets === 'number' ? row.expectedProfit10Bets.toFixed(2) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 text-xs text-gray-600 border-t bg-gray-50 rounded-b-2xl">
        <span className="font-semibold text-yellow-700">Yellow row:</span> Suggested optimal lay (lowest variance). <br />
        <span className="font-semibold text-green-700">Green row:</span> Lower risk (variance). <br />
        <span className="font-semibold text-red-700">Red row:</span> Higher risk (variance). <br />
        <span className="text-gray-500">(Risk is relative to the range of variances for the current inputs)</span><br/>
        <span className="font-semibold">EV x10 Bets:</span> Expected Profit/Loss after 10 identical bets.
      </div>
    </div>
  );
}
