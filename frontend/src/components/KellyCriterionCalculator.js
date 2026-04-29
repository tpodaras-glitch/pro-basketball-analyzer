import React, { useState } from 'react';
import '../styles/KellyCriterion.css';

const KellyCriterionCalculator = ({ bankroll }) => {
  const [inputs, setInputs] = useState({
    probability: 0.6,
    oddsDecimal: 1.909,
    kellyFraction: 0.25,
  });

  const calculateKelly = () => {
    const { probability, oddsDecimal, kellyFraction } = inputs;
    const b = oddsDecimal - 1;
    const q = 1 - probability;
    const fullKelly = (b * probability - q) / b;
    const fractionalKelly = fullKelly * kellyFraction;
    
    if (!bankroll) return null;

    return {
      fullKelly: Math.max(0, fullKelly),
      fractionalKelly: Math.max(0, fractionalKelly),
      recommendedBet: Math.max(0, bankroll.currentBalance * fractionalKelly),
    };
  };

  const kelly = calculateKelly();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  return (
    <div className="kelly-calculator">
      <h3>Kelly Criterion Calculator</h3>

      <div className="input-group">
        <label>Probability:</label>
        <input
          type="range"
          name="probability"
          value={inputs.probability}
          onChange={handleChange}
          min="0"
          max="1"
          step="0.01"
        />
        <span>{(inputs.probability * 100).toFixed(0)}%</span>
      </div>

      <div className="input-group">
        <label>Odds (Decimal):</label>
        <input
          type="number"
          name="oddsDecimal"
          value={inputs.oddsDecimal}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <div className="input-group">
        <label>Kelly Fraction:</label>
        <input
          type="range"
          name="kellyFraction"
          value={inputs.kellyFraction}
          onChange={handleChange}
          min="0"
          max="1"
          step="0.05"
        />
        <span>{(inputs.kellyFraction * 100).toFixed(0)}%</span>
      </div>

      {kelly && (
        <div className="results">
          <div className="result-item">
            <span>Full Kelly:</span>
            <strong>{(kelly.fullKelly * 100).toFixed(2)}%</strong>
          </div>
          <div className="result-item">
            <span>Fractional Kelly ({(inputs.kellyFraction * 100).toFixed(0)}%):</span>
            <strong>{(kelly.fractionalKelly * 100).toFixed(2)}%</strong>
          </div>
          {bankroll && (
            <div className="result-item highlight">
              <span>Recommended Bet:</span>
              <strong>${kelly.recommendedBet.toFixed(2)}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KellyCriterionCalculator;
