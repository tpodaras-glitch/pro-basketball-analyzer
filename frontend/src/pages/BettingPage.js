import React, { useState } from 'react';
import { useEffect } from 'react';
import { bankrollAPI, betsAPI } from '../services/api';
import BetForm from '../components/BetForm';
import KellyCriterionCalculator from '../components/KellyCriterionCalculator';
import '../styles/Betting.css';

const BettingPage = () => {
  const [bankroll, setBankroll] = useState(null);
  const [recentBets, setRecentBets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bankrollRes, betsRes] = await Promise.all([
          bankrollAPI.getStatus(),
          betsAPI.getAll({ status: 'pending', limit: 5 }),
        ]);
        setBankroll(bankrollRes.data.data);
        setRecentBets(betsRes.data.data || []);
      } catch (err) {
        console.error('Error fetching betting data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="betting-page">
      <h1>🎯 Place Bet</h1>

      <div className="betting-container">
        <div className="left-column">
          <BetForm bankroll={bankroll} />
        </div>

        <div className="right-column">
          <KellyCriterionCalculator bankroll={bankroll} />
          
          <div className="recent-bets">
            <h3>Pending Bets</h3>
            {recentBets.length === 0 ? (
              <p>No pending bets</p>
            ) : (
              <ul>
                {recentBets.map((bet) => (
                  <li key={bet.id}>
                    <span>{bet.selection}</span>
                    <span>${bet.stake}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingPage;
