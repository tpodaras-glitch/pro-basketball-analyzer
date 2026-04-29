# Setup Guide - Pro Basketball Analyzer

## Prerequisites

- **Node.js**: v16.0.0 or higher
- **Python**: 3.9 or higher
- **SQLite3**: Built-in on most systems
- **npm** or **yarn**: For package management
- **pip**: For Python packages

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/tpodaras-glitch/pro-basketball-analyzer.git
cd pro-basketball-analyzer
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your API keys:
- ESPN API
- NBA Stats API
- Betting Odds API

### 3. Setup Database

```bash
cd database
sqlite3 basketball.db < schema.sql
cd ..
```

### 4. Setup Frontend (React)

```bash
cd frontend
npm install
```

Create `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000
```

Start development server:
```bash
npm start
```

Visit: `http://localhost:3000`

### 5. Setup Backend (Node.js)

```bash
cd backend
npm install
```

Create `.env`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=sqlite:../database/basketball.db
```

Start server:
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

### 6. Setup Analytics Engine (Python)

```bash
cd analytics
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

Service runs on: `http://localhost:5001`

## Docker Setup (Alternative)

```bash
docker-compose up --build
```

All services start automatically:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Analytics: http://localhost:5001

## API Keys Configuration

### ESPN API
1. Visit: https://developer.espn.com
2. Register account
3. Get API key
4. Add to `.env`: `API_KEY_ESPN=your_key`

### NBA Stats API
- No key required
- Direct access to stats.nba.com

### Odds API
1. Visit: https://the-odds-api.com
2. Get free tier API key
3. Add to `.env`: `API_KEY_ODDS=your_key`

### Greek Basketball APIs
- GBL: Check official GBL website for API access
- Elite Group: Contact for API documentation

## Verification

### Check all services running:

```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:5000/api/health

# Analytics
curl http://localhost:5001/health
```

## Troubleshooting

### Port Already in Use
```bash
# Find what's using the port (macOS/Linux)
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Error
```bash
# Reset database
rm database/basketball.db
cd database
sqlite3 basketball.db < schema.sql
```

### Python Virtual Environment Issues
```bash
# Recreate venv
cd analytics
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Next Steps

1. Read [API Documentation](./API.md)
2. Configure betting strategies in settings
3. Start with paper trading
4. Load historical data
5. Analyze games
6. Track bets

---

**Need help?** Check GitHub Issues or contact the maintainer.
