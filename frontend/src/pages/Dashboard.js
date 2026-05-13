import React, { useEffect, useState } from 'react';
import { gamesAPI, analysisAPI, betsAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [todayGames, setTodayGames] = useState([]);
  const [valueBets, setValueBets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        const [gamesRes, valueBetsRes, statsRes] = await Promise.all([
          gamesAPI.getAll({ date: today }),
          analysisAPI.getValueBets({ minEV: 0.05, limit: 5 }),
          betsAPI.getStats(),
        ]);

        // Filter out Elite League games
        const filteredGames = (gamesRes.data.data || []).filter(
          game => game.league !== 'elite'
        );

        setTodayGames(filteredGames);
        setValueBets(valueBetsRes.data.data || []);
        setStats(statsRes.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏀 Basketball Betting Analyzer</h1>
        <p>Professional Sports Analytics & Value Betting Platform</p>
      </div>

      {error && <div className="error-alert">{error}</div>}

      {stats && (
        <div className="stats-overview">
          <div className="stat-item">
            <h3>Win Rate</h3>
            <p className="stat-value">{(stats.winRate * 100).toFixed(1)}%</p>
          </div>
          <div className="stat-item">
            <h3>ROI</h3>
            <p className="stat-value">{(stats.roi * 100).toFixed(1)}%</p>
          </div>
          <div className="stat-item">
            <h3>Total Bets</h3>
            <p className="stat-value">{stats.totalBets}</p>
          </div>
          <div className="stat-item">
            <h3>Profit Factor</h3>
            <p className="stat-value">{stats.profitFactor.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        <section className="section">
          <h2>📅 Today's Games</h2>
          <div className="games-list">
            {todayGames.length === 0 ? (
              <p>No games today</p>
            ) : (
              todayGames.map((game) => (
                <div key={game.id} className="game-item">
                  <span>{game.homeTeam} vs {game.awayTeam}</span>
                  <span className="status">{game.status}</span>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="section">
          <h2>💰 Top Value Bets</h2>
          <div className="value-bets-list">
            {valueBets.length === 0 ? (
              <p>No value bets found</p>
            ) : (
              valueBets.map((bet) => (
                <div key={bet.gameId} className="value-bet-item">
                  <div className="bet-info">
                    <span className="bet-name">{bet.bet}</span>
                    <span className="ev-badge">EV: {(bet.expectedValue * 100).toFixed(1)}%</span>
                  </div>
                  <div className="probabilities">
                    <span>Actual: {(bet.actualProb * 100).toFixed(0)}%</span>
                    <span>Implied: {(bet.impliedProb * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
