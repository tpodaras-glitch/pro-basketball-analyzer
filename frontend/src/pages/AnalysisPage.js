import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { analysisAPI, gamesAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Analysis.css';

const AnalysisPage = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const [gameRes, analysisRes, predictionRes] = await Promise.all([
          gamesAPI.getById(gameId),
          analysisAPI.getGameAnalysis(gameId),
          analysisAPI.predict(gameId),
        ]);

        setGameData(gameRes.data.data);
        setAnalysis(analysisRes.data.data);
        setPrediction(predictionRes.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) fetchAnalysis();
  }, [gameId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!gameData) return <div>No game data</div>;

  return (
    <div className="analysis-page">
      <div className="game-header">
        <h1>
          {gameData.homeTeam.name} vs {gameData.awayTeam.name}
        </h1>
        <p>{gameData.date}</p>
      </div>

      <div className="analysis-grid">
        <section className="team-stats">
          <h2>Team Statistics</h2>
          <div className="stats-comparison">
            <div className="team">
              <h3>{gameData.homeTeam.name}</h3>
              <div className="stat">
                <span>Pace:</span>
                <span>{gameData.homeTeam.stats.pace}</span>
              </div>
              <div className="stat">
                <span>Offensive Rating:</span>
                <span>{gameData.homeTeam.stats.offenseRating}</span>
              </div>
              <div className="stat">
                <span>Defensive Rating:</span>
                <span>{gameData.homeTeam.stats.defenseRating}</span>
              </div>
            </div>

            <div className="team">
              <h3>{gameData.awayTeam.name}</h3>
              <div className="stat">
                <span>Pace:</span>
                <span>{gameData.awayTeam.stats.pace}</span>
              </div>
              <div className="stat">
                <span>Offensive Rating:</span>
                <span>{gameData.awayTeam.stats.offenseRating}</span>
              </div>
              <div className="stat">
                <span>Defensive Rating:</span>
                <span>{gameData.awayTeam.stats.defenseRating}</span>
              </div>
            </div>
          </div>
        </section>

        {prediction && (
          <section className="prediction">
            <h2>Prediction</h2>
            <div className="prediction-content">
              <p>
                Home Win Probability: <strong>{(prediction.homeWinProb * 100).toFixed(1)}%</strong>
              </p>
              <p>
                Away Win Probability: <strong>{(prediction.awayWinProb * 100).toFixed(1)}%</strong>
              </p>
              <p>
                Confidence: <strong>{(prediction.confidence * 100).toFixed(0)}%</strong>
              </p>
            </div>
          </section>
        )}
      </div>

      {analysis && (
        <section className="detailed-analysis">
          <h2>Detailed Analysis</h2>
          <div className="matchups">
            <h3>Key Matchups</h3>
            {analysis.matchups && analysis.matchups.map((matchup, idx) => (
              <div key={idx} className="matchup">
                <span className="position">{matchup.position}:</span>
                <span>{matchup.homePlayer} vs {matchup.awayPlayer}</span>
                <span className={`advantage ${matchup.homeAdvantage > 0 ? 'home' : 'away'}`}>
                  {matchup.homeAdvantage > 0 ? '+' : ''}{matchup.homeAdvantage.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          <div className="trends">
            <h3>Trends</h3>
            <div className="trend">
              <span>Home ATS:</span>
              <span>{analysis.trends.homeATS.wins}W - {analysis.trends.homeATS.losses}L ({(analysis.trends.homeATS.percentage * 100).toFixed(1)}%)</span>
            </div>
            <div className="trend">
              <span>Away ATS:</span>
              <span>{analysis.trends.awayATS.wins}W - {analysis.trends.awayATS.losses}L ({(analysis.trends.awayATS.percentage * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AnalysisPage;
