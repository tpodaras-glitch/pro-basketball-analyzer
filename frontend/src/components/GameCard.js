import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GameCard.css';

const GameCard = ({ game }) => {
  return (
    <Link to={`/analysis/${game.id}`} className="game-card">
      <div className="game-info">
        <div className="team home">
          <p className="team-name">{game.homeTeam}</p>
        </div>
        <div className="vs">VS</div>
        <div className="team away">
          <p className="team-name">{game.awayTeam}</p>
        </div>
      </div>

      <div className="game-details">
        <p className="date">{new Date(game.date).toLocaleDateString()}</p>
        <span className={`status ${game.status}`}>{game.status}</span>
      </div>

      {game.odds && (
        <div className="odds-info">
          <span>Spread: {game.odds.spread}</span>
          <span>Total: {game.odds.total}</span>
        </div>
      )}
    </Link>
  );
};

export default GameCard;
