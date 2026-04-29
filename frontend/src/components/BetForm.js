import React, { useState } from 'react';
import '../styles/BetForm.css';

const BetForm = ({ bankroll }) => {
  const [formData, setFormData] = useState({
    gameId: '',
    betType: 'spread',
    selection: 'home',
    odds: -110,
    stake: '',
    confidence: 0.6,
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting bet:', formData);
    // TODO: Call API to place bet
  };

  return (
    <form className="bet-form" onSubmit={handleSubmit}>
      <h3>Place a Bet</h3>

      <div className="form-group">
        <label>Game ID:</label>
        <input
          type="text"
          name="gameId"
          value={formData.gameId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Bet Type:</label>
        <select name="betType" value={formData.betType} onChange={handleChange}>
          <option value="spread">Spread</option>
          <option value="moneyline">Moneyline</option>
          <option value="total">Total (O/U)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Selection:</label>
        <select name="selection" value={formData.selection} onChange={handleChange}>
          <option value="home">Home</option>
          <option value="away">Away</option>
          <option value="over">Over</option>
          <option value="under">Under</option>
        </select>
      </div>

      <div className="form-group">
        <label>Odds:</label>
        <input
          type="number"
          name="odds"
          value={formData.odds}
          onChange={handleChange}
          step="0.5"
        />
      </div>

      <div className="form-group">
        <label>Stake ($):</label>
        <input
          type="number"
          name="stake"
          value={formData.stake}
          onChange={handleChange}
          min="0"
          step="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Confidence:</label>
        <input
          type="range"
          name="confidence"
          value={formData.confidence}
          onChange={handleChange}
          min="0"
          max="1"
          step="0.05"
        />
        <span>{(formData.confidence * 100).toFixed(0)}%</span>
      </div>

      <div className="form-group">
        <label>Notes:</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
      </div>

      <button type="submit" className="btn btn-primary">
        Place Bet
      </button>
    </form>
  );
};

export default BetForm;
