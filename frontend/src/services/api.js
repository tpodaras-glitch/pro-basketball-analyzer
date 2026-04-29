import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Games API
export const gamesAPI = {
  getAll: (params) => apiClient.get('/games', { params }),
  getById: (id) => apiClient.get(`/games/${id}`),
  create: (data) => apiClient.post('/games', data),
  updateResult: (id, data) => apiClient.put(`/games/${id}/result`, data),
};

// Odds API
export const oddsAPI = {
  getLatest: (gameId) => apiClient.get(`/odds/game/${gameId}/latest`),
  getHistory: (gameId) => apiClient.get(`/odds/game/${gameId}/history`),
  record: (data) => apiClient.post('/odds', data),
};

// Bets API
export const betsAPI = {
  getAll: (params) => apiClient.get('/bets', { params }),
  getById: (id) => apiClient.get(`/bets/${id}`),
  create: (data) => apiClient.post('/bets', data),
  updateResult: (id, data) => apiClient.put(`/bets/${id}/result`, data),
  getStats: () => apiClient.get('/bets/stats/summary'),
};

// Bankroll API
export const bankrollAPI = {
  getStatus: () => apiClient.get('/bankroll'),
  getHistory: (days) => apiClient.get(`/bankroll/history/${days}`),
  suggestBet: (data) => apiClient.post('/bankroll/suggest-bet', data),
};

// Analysis API
export const analysisAPI = {
  getValueBets: (params) => apiClient.get('/analysis/value-bets', { params }),
  getGameAnalysis: (gameId) => apiClient.get(`/analysis/game/${gameId}`),
  predict: (gameId) => apiClient.get(`/analysis/predict/${gameId}`),
};

// Teams API
export const teamsAPI = {
  getAll: (params) => apiClient.get('/teams', { params }),
  getById: (id) => apiClient.get(`/teams/${id}`),
};

export default apiClient;
