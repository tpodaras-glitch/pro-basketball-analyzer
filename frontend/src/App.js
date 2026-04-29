import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import GamesPage from './pages/GamesPage';
import ValueBetsPage from './pages/ValueBetsPage';
import BettingPage from './pages/BettingPage';
import BankrollPage from './pages/BankrollPage';
import AnalysisPage from './pages/AnalysisPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/value-bets" element={<ValueBetsPage />} />
            <Route path="/betting" element={<BettingPage />} />
            <Route path="/bankroll" element={<BankrollPage />} />
            <Route path="/analysis/:gameId" element={<AnalysisPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
