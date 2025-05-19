export function calcProb(odds) {
  if (isNaN(odds) || odds <= 0) return 0; // Prevent division by zero or invalid odds
  return 1 / odds;
}

export function calcBreakdown({
  betOdds,
  placeOdds,
  layOdds,
  stake,
  bonusConversion,
  commission = 0.05,
  layMax = 100,
  step = 5,
}) {
  // Defensive checks
  if (
    isNaN(betOdds) || betOdds <= 0 ||
    isNaN(placeOdds) || placeOdds <= 0 ||
    isNaN(layOdds) || layOdds <= 0 ||
    isNaN(stake) || stake <= 0 ||
    isNaN(bonusConversion) || bonusConversion < 0 || bonusConversion > 1 ||
    isNaN(commission) || commission < 0 || commission > 1 ||
    isNaN(layMax) || layMax <= 0 ||
    isNaN(step) || step <= 0
  ) {
    return {
      winProb: 0,
      placeOnlyProb: 0,
      loseProb: 0,
      bonusValue: 0,
      breakdown: [],
      optimalLay: 0,
    };
  }

  const winProbValue = calcProb(betOdds); // Use this for EV calculation (raw probability)
  const placeProbValue = calcProb(placeOdds); // Use this for EV calculation (raw probability)
  const placeOnlyProbValue = Math.max(0, placeProbValue - winProbValue); // Raw probability
  const loseProbValue = Math.max(0, 1 - placeProbValue); // Raw probability

  const bonusValue = Math.round(stake * bonusConversion * 100) / 100;

  const allLays = [];
  let minVariance = Infinity;
  let bestLay = 0;

  const variances = [];

  for (let lay = 0; lay <= layMax; lay += step) {
    const layLiability = lay * (layOdds - 1);
    const layWin = lay * (1 - commission);
    const winProfit = +(stake * (betOdds - 1) - layLiability).toFixed(2);
    const placeProfit = +(-stake + layWin + bonusValue).toFixed(2);
    const loseProfit = +(-stake + layWin).toFixed(2);

    const profits = [winProfit, placeProfit, loseProfit];
    const mean = profits.reduce((a, b) => a + b, 0) / 3; // This is arithmetic mean, not expected value
    const variance =
      profits.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 3;

    variances.push(variance);

    if (variance < minVariance) {
      minVariance = variance;
      bestLay = lay;
    }

    // Calculate Expected Value (EV) for a single bet
    const expectedValueSingleBet =
      (winProbValue * winProfit) +
      (placeOnlyProbValue * placeProfit) +
      (loseProbValue * loseProfit);

    const expectedProfit10Bets = +(expectedValueSingleBet * 10).toFixed(2); // New calculation

    let profitCases = [], lossCases = [], breakevenCases = [];
    if (winProbValue > 0) {
      if (winProfit > 0) profitCases.push([winProbValue, winProfit]);
      else if (winProfit < 0) lossCases.push([winProbValue, winProfit]);
      else breakevenCases.push([winProbValue, winProfit]);
    }
    if (placeOnlyProbValue > 0) {
      if (placeProfit > 0) profitCases.push([placeOnlyProbValue, placeProfit]);
      else if (placeProfit < 0) lossCases.push([placeOnlyProbValue, placeProfit]);
      else breakevenCases.push([placeOnlyProbValue, placeProfit]);
    }
    if (loseProbValue > 0) {
      if (loseProfit > 0) profitCases.push([loseProbValue, loseProfit]);
      else if (loseProfit < 0) lossCases.push([loseProbValue, loseProfit]);
      else breakevenCases.push([loseProbValue, loseProfit]);
    }

    const profitPercent = profitCases.reduce((a, b) => a + b[0], 0) * 100;
    const lossPercent = lossCases.reduce((a, b) => a + b[0], 0) * 100;
    const profitAmounts = profitCases.map((p) => `$${p[1].toFixed(2)}`).join(", ");
    const lossAmounts = lossCases.map((p) => `$${p[1].toFixed(2)}`).join(", ");
    const breakevenPercent = breakevenCases.reduce((a, b) => a + b[0], 0) * 100;
    const breakevenAmounts = breakevenCases.map((p) => `$${p[1].toFixed(2)}`).join(", ");

    allLays.push({
      lay,
      winProfit,
      placeProfit,
      loseProfit,
      layLiability: +layLiability.toFixed(2),
      profitPercent: profitPercent.toFixed(1),
      profitAmounts,
      lossPercent: lossPercent.toFixed(1),
      lossAmounts,
      breakevenPercent: breakevenPercent.toFixed(1),
      breakevenAmounts,
      mean, // Note: 'mean' here is the arithmetic mean of profits, not EV
      variance,
      expectedProfit10Bets, // Added new property
    });
  }

  const minVar = Math.min(...variances);
  const maxVar = Math.max(...variances);
  const varRange = maxVar - minVar || 1;

  const breakdown = allLays.map(row => {
    let risk = "Mid";
    if (row.variance <= minVar + varRange / 3) risk = "Low";
    else if (row.variance >= minVar + (2 * varRange) / 3) risk = "High";
    return { ...row, risk };
  });

  return {
    winProb: (winProbValue * 100).toFixed(1),             // Display probability
    placeOnlyProb: (placeOnlyProbValue * 100).toFixed(1), // Display probability
    loseProb: (loseProbValue * 100).toFixed(1),           // Display probability
    bonusValue,
    breakdown,
    optimalLay: bestLay,
  };
}
