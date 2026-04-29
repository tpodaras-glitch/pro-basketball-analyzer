import React, { useEffect, useState } from 'react';
import { gamesAPI } from '../services/api';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Games.css';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [league, setLeague] = useState('nba');
  const [status, setStatus] = useState('upcoming');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await gamesAPI.getAll({ league, status });
        setGames(response.data.data || []);
      } catch (err) {
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [league, status]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="games-page">
      <h1>🏀 Games</h1>

      <div className="filters">
        <select value={league} onChange={(e) => setLeague(e.target.value)}>
          <option value="nba">NBA</option>
          <option value="gbl">Greek League</option>
          <option value="elite">Elite Group</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
