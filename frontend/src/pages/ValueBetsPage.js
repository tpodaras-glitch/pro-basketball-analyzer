import React, { useEffect, useState } from 'react';
import { analysisAPI } from '../services/api';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/ValueBets.css';

const ValueBetsPage = () => {
  const [valueBets, setValueBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [league, setLeague] = useState('all');
  const [minEV, setMinEV] = useState(0.05);

  useEffect(() => {
    const fetchValueBets = async () => {
      try {
        setLoading(true);
        const params = {
          minEV,
          ...(league !== 'all' && { league }),
        };
        const response = await analysisAPI.getValueBets(params);
        setValueBets(response.data.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch value bets');
      } finally {
        setLoading(false);
      }
    };

    fetchValueBets();
  }, [league, minEV]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="value-bets-page">
      <div className="header">
        <h1>💰 Value Bets</h1>
        <p>Opportunities with positive expected value</p>
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="filters">
        <div className="filter-group">
          <label>League:</label>
          <select value={league} onChange={(e) => setLeague(e.target.value)}>
            <option value="all">All Leagues</option>
            <option value="nba">NBA</option>
            <option value="gbl">Greek League</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Min EV %:</label>
          <input
            type="number"
            value={minEV * 100}
            onChange={(e) => setMinEV(parseFloat(e.target.value) / 100)}
            min="0"
            max="50"
            step="1"
          />
        </div>
      </div>

      <div className="bets-container">
        {valueBets.length === 0 ? (
          <p className="no-data">No value bets found. Try adjusting filters.</p>
        ) : (
          valueBets.map((bet) => (
            <div key={bet.gameId} className="value-bet-card">
              <div className="bet-header">
                <h3>{bet.bet}</h3>
                <span className={`ev-badge ${bet.expectedValue > 0.15 ? 'high' : 'medium'}`}>
                  EV: {(bet.expectedValue * 100).toFixed(1)}%
                </span>
              </div>
              <div className="bet-details">
                <div className="detail">
                  <span className="label">Implied Probability:</span>
                  <span className="value">{(bet.impliedProb * 100).toFixed(1)}%</span>
                </div>
                <div className="detail">
                  <span className="label">Actual Probability:</span>
                  <span className="value ev-highlight">{(bet.actualProb * 100).toFixed(1)}%</span>
                </div>
                <div className="detail">
                  <span className="label">Current Odds:</span>
                  <span className="value">{bet.currentOdds}</span>
                </div>
                <div className="detail">
                  <span className="label">Recommended Odds:</span>
                  <span className="value">{bet.recommendedOdds}</span>
                </div>
                <div className="detail">
                  <span className="label">Confidence:</span>
                  <span className="value">{(bet.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="detail">
                  <span className="label">Edge:</span>
                  <span className="value edge">{bet.edge.toFixed(1)}%</span>
                </div>
              </div>
              <button className="btn btn-primary">Place Bet</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ValueBetsPage;
