import React, { useEffect, useState } from 'react';
import { bankrollAPI, betsAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Bankroll.css';

const BankrollPage = () => {
  const [bankrollStatus, setBankrollStatus] = useState(null);
  const [bankrollHistory, setBankrollHistory] = useState([]);
  const [bettingStats, setBettingStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statusRes, historyRes, statsRes] = await Promise.all([
          bankrollAPI.getStatus(),
          bankrollAPI.getHistory(30),
          betsAPI.getStats(),
        ]);

        setBankrollStatus(statusRes.data.data);
        setBankrollHistory(historyRes.data.data || []);
        setBettingStats(statsRes.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!bankrollStatus) return <div>No bankroll data</div>;

  return (
    <div className="bankroll-page">
      <h1>💵 Bankroll Management</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Current Balance</h3>
          <p className="amount">${bankrollStatus.currentBalance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Profit/Loss</h3>
          <p className={`amount ${bankrollStatus.profit >= 0 ? 'positive' : 'negative'}`}>
            ${bankrollStatus.profit.toFixed(2)}
          </p>
        </div>
        <div className="stat-card">
          <h3>ROI</h3>
          <p className={`amount ${bankrollStatus.roiPercentage >= 0 ? 'positive' : 'negative'}`}>
            {bankrollStatus.roiPercentage.toFixed(1)}%
          </p>
        </div>
        <div className="stat-card">
          <h3>Win Rate</h3>
          <p className="amount">{(bankrollStatus.winRate * 100).toFixed(1)}%</p>
        </div>
        <div className="stat-card">
          <h3>Total Bets</h3>
          <p className="amount">{bankrollStatus.totalBets}</p>
        </div>
        <div className="stat-card">
          <h3>Consecutive Wins</h3>
          <p className="amount">{bankrollStatus.consecutiveWins}</p>
        </div>
      </div>

      {bankrollHistory.length > 0 && (
        <div className="chart-container">
          <h3>Balance History (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bankrollHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="entry_date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current_balance" stroke="#8884d8" name="Balance" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {bettingStats && (
        <div className="chart-container">
          <h3>Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[bettingStats]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalBets" fill="#82ca9d" name="Total Bets" />
              <Bar dataKey="wins" fill="#8884d8" name="Wins" />
              <Bar dataKey="losses" fill="#ffc658" name="Losses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BankrollPage;
