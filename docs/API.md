# API Documentation - Pro Basketball Analyzer

## Base URL

```
http://localhost:5000/api/v1
```

## Authentication

Currently no authentication (development). In production, JWT tokens will be used.

## Endpoints

### Games

#### Get All Games
```
GET /games
```

Query Parameters:
- `league`: 'nba' | 'gbl' | 'elite' (optional)
- `date`: YYYY-MM-DD (optional)
- `status`: 'upcoming' | 'live' | 'completed' (optional)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "game_001",
      "league": "nba",
      "date": "2026-04-29",
      "homeTeam": "Lakers",
      "awayTeam": "Celtics",
      "status": "upcoming",
      "homeTeamId": 1,
      "awayTeamId": 2
    }
  ]
}
```

#### Get Game Details
```
GET /games/:gameId
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "game_001",
    "league": "nba",
    "date": "2026-04-29",
    "homeTeam": {
      "id": 1,
      "name": "Lakers",
      "stats": {
        "pace": 102.5,
        "offenseRating": 112.3,
        "defenseRating": 108.1
      }
    },
    "awayTeam": {
      "id": 2,
      "name": "Celtics",
      "stats": {
        "pace": 101.2,
        "offenseRating": 115.4,
        "defenseRating": 106.2
      }
    },
    "odds": {
      "homeMoneyline": -110,
      "awayMoneyline": -110,
      "spread": -5.5,
      "total": 215.5
    }
  }
}
```

### Odds

#### Get Odds for Game
```
GET /odds/:gameId
```

Response:
```json
{
  "success": true,
  "data": {
    "gameId": "game_001",
    "sportsbooks": [
      {
        "name": "DraftKings",
        "homeMoneyline": -110,
        "awayMoneyline": -110,
        "spread": -5.5,
        "total": 215.5,
        "timestamp": "2026-04-29T10:00:00Z"
      }
    ]
  }
}
```

### Analysis

#### Get Value Bets
```
GET /analysis/value-bets
```

Query Parameters:
- `minEV`: 0.05 (5% minimum expected value)
- `league`: 'nba' | 'gbl' | 'elite'

Response:
```json
{
  "success": true,
  "data": [
    {
      "gameId": "game_001",
      "bet": "Lakers -5.5",
      "impliedProb": 0.523,
      "actualProb": 0.58,
      "expectedValue": 0.087,
      "recommendedOdds": -115,
      "currentOdds": -110,
      "edge": 5.7,
      "confidence": 0.85
    }
  ]
}
```

#### Get Game Analysis
```
GET /analysis/game/:gameId
```

Response:
```json
{
  "success": true,
  "data": {
    "gameId": "game_001",
    "matchups": [
      {
        "position": "PG",
        "homePlayer": "LeBron James",
        "awayPlayer": "Jayson Tatum",
        "homeAdvantage": -2.1
      }
    ],
    "trends": {
      "homeATS": { "wins": 25, "losses": 20, "percentage": 0.556 },
      "awayATS": { "wins": 18, "losses": 27, "percentage": 0.400 },
      "homeOUTrend": { "overs": 28, "unders": 17 }
    },
    "injuries": [
      {
        "player": "Anthony Davis",
        "team": "Lakers",
        "status": "Out",
        "impact": "High"
      }
    ]
  }
}
```

### Bankroll Management

#### Get Bankroll Status
```
GET /bankroll
```

Response:
```json
{
  "success": true,
  "data": {
    "currentBalance": 2500,
    "initialBalance": 2000,
    "profit": 500,
    "roiPercentage": 25,
    "winRate": 0.58,
    "totalBets": 100,
    "consecutiveWins": 5,
    "consecutiveLosses": 2
  }
}
```

#### Get Suggested Bet Size
```
POST /bankroll/suggest-bet
```

Request Body:
```json
{
  "confidence": 0.75,
  "expectedValue": 0.08,
  "strategy": "kelly"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "recommendedUnits": 2,
    "recommendedAmount": 100,
    "strategy": "kelly",
    "potentialProfit": 87.50,
    "potentialLoss": 100,
    "roi": 8.75
  }
}
```

### Bets

#### Create Bet
```
POST /bets
```

Request Body:
```json
{
  "gameId": "game_001",
  "betType": "spread",
  "selection": "home",
  "odds": -110,
  "stake": 100,
  "expectedValue": 0.08,
  "confidence": 0.75,
  "notes": "Lakers strong at home"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "betId": "bet_001",
    "status": "pending",
    "createdAt": "2026-04-29T10:00:00Z"
  }
}
```

#### Get All Bets
```
GET /bets
```

Query Parameters:
- `status`: 'pending' | 'won' | 'lost' | 'push'
- `league`: 'nba' | 'gbl' | 'elite'
- `startDate`: YYYY-MM-DD
- `endDate`: YYYY-MM-DD

#### Update Bet Result
```
PUT /bets/:betId/result
```

Request Body:
```json
{
  "result": "won",
  "profit": 90.91
}
```

### Statistics

#### Get Performance Stats
```
GET /statistics/performance
```

Query Parameters:
- `period`: 'daily' | 'weekly' | 'monthly' | 'all'

Response:
```json
{
  "success": true,
  "data": {
    "totalBets": 100,
    "wins": 58,
    "losses": 42,
    "winRate": 0.58,
    "roi": 0.25,
    "profit": 500,
    "profitFactor": 1.45
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid game ID",
  "code": "INVALID_INPUT"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Game not found",
  "code": "NOT_FOUND"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "code": "SERVER_ERROR"
}
```

---

**Last Updated**: 2026-04-29
