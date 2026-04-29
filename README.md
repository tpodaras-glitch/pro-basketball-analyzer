# Pro Basketball Analyzer

🏀 **Professional Basketball Betting Analysis Platform**

A comprehensive web application for analyzing basketball games (NBA, Greek GBL, Elite Group) with professional betting analytics, value bet detection, and bankroll management.

## 🏆 Features

### Game Analysis
- ✅ Team form & trends analysis
- ✅ Injury reports & roster impact
- ✅ Head-to-head statistics
- ✅ Pace of play analysis
- ✅ Matchup analytics (guard vs guard, center vs center, etc.)
- ✅ Home/Away splits
- ✅ Back-to-back game fatigue

### Betting Analytics
- ✅ **Value Bet Detection**: Actual probability vs Implied probability (odds)
- ✅ **Line Movement Tracking**: Identify market reactions
- ✅ **ATS Records** (Against The Spread)
- ✅ **Over/Under Trends**
- ✅ **Odds Comparison**: Multiple sportsbooks
- ✅ **Expected Value (EV)** calculations

### Bankroll Management
- ✅ **Kelly Criterion** calculation
- ✅ **Flat Betting** strategy
- ✅ **Proportional Betting** system
- ✅ **Bankroll Tracking**: Daily, monthly, yearly stats
- ✅ **Risk Management**: Stop-loss alerts
- ✅ **ROI & Win Rate** metrics

### Supported Leagues
- 🏀 **NBA** (American Basketball Association)
- 🇬🇷 **Greek Basket League (GBL)**
- 🇬🇷 **Greek Elite Group (A1 Ethniki)**

## 🏗️ Project Structure

```
pro-basketball-analyzer/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client services
│   │   ├── hooks/            # Custom React hooks
│   │   ├── context/          # Context API (global state)
│   │   ├── utils/            # Utility functions
│   │   └── styles/           # CSS/Tailwind styles
│   ├── package.json
│   └── .env.example
│
├── backend/                  # Node.js Express API server
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Database models
│   │   ├── middleware/       # Express middleware
│   │   ├── services/         # Business services
│   │   ├── utils/            # Utility functions
│   │   └── config/           # Configuration
│   ├── package.json
│   └── .env.example
│
├── analytics/                # Python analytics engine
│   ├── models/
│   │   ├── predictor.py      # ML/Statistical models
│   │   ├── odds_analyzer.py  # Odds analysis
│   │   └── value_detector.py # Value bet detection
│   ├── data_processors/
│   │   ├── nba_processor.py
│   │   ├── gbl_processor.py
│   │   └── elite_processor.py
│   ├── apis/
│   │   ├── espn_client.py
│   │   ├── nba_stats_client.py
│   │   ├── odds_client.py
│   │   └── gbl_client.py
│   ├── requirements.txt
│   └── main.py
│
├── database/
│   ├── schema.sql            # SQLite database schema
│   └── migrations/           # Database migrations
│
├── docs/
│   ├── API.md                # API documentation
│   ├── SETUP.md              # Setup instructions
│   ├── BETTING_STRATEGY.md   # Betting strategies guide
│   └── DATABASE.md           # Database documentation
│
├── docker-compose.yml        # Docker setup
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.9+
- SQLite3
- Docker (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/tpodaras-glitch/pro-basketball-analyzer.git
cd pro-basketball-analyzer

# Setup frontend
cd frontend
npm install
npm start

# Setup backend (new terminal)
cd backend
npm install
npm run dev

# Setup analytics engine (new terminal)
cd analytics
pip install -r requirements.txt
python main.py
```

## 📊 Database Models

### Core Tables
- `games` - Game information (NBA, GBL, Elite Group)
- `teams` - Team data & statistics
- `players` - Player information & stats
- `injuries` - Injury reports
- `odds` - Historical odds data
- `bets` - User bet tracking
- `bankroll` - Bankroll history
- `statistics` - Calculated metrics & trends

## 🏀 Betting Strategies Implemented

1. **Kelly Criterion**: f* = (bp - q) / b
   - Optimal bet sizing based on edge
   - Risk-adjusted for different confidence levels

2. **Flat Betting**: Fixed units regardless of edge
   - Consistent stake across all bets
   - Lower variance, slower growth

3. **Proportional Betting**: Unit size scales with edge
   - More aggressive on strong edges
   - Better risk management

## 📈 Value Bet Detection

```
Implied Probability = 1 / Decimal Odds
Value Exists When: Actual Probability > Implied Probability
Expected Value = (Actual Prob × Profit) - (Loss Prob × Stake)
```

## 🔗 APIs & Data Sources

### NBA
- ESPN NBA API
- NBA Stats API
- Odds APIs (multiple sportsbooks)

### Greek Basketball
- GBL Official API
- Elite Group Official API
- Betting odds aggregators

## 📝 License

MIT License - See LICENSE file

## ⚠️ Disclaimer

This is a **research and analysis tool**. Betting involves risk. Always gamble responsibly.
- Start with small stakes
- Never bet more than you can afford to lose
- Use professional bankroll management
- This tool provides analysis, not guaranteed predictions

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md

---

**Made for serious, analytical basketball bettors only.** 🏀📊