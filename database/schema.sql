-- Pro Basketball Analyzer Database Schema
-- SQLite Database

-- ============================================
-- TEAMS
-- ============================================
CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    league TEXT NOT NULL CHECK(league IN ('nba', 'gbl', 'elite')),
    city TEXT,
    country TEXT,
    abbreviation TEXT NOT NULL,
    founded_year INTEGER,
    arena TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teams_league ON teams(league);

-- ============================================
-- PLAYERS
-- ============================================
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    team_id INTEGER NOT NULL,
    position TEXT,
    jersey_number INTEGER,
    height TEXT,
    weight TEXT,
    birth_date TEXT,
    country TEXT,
    nba_draft_year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE INDEX idx_players_team ON players(team_id);
CREATE INDEX idx_players_name ON players(name);

-- ============================================
-- INJURY REPORTS
-- ============================================
CREATE TABLE IF NOT EXISTS injuries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Out', 'Questionable', 'Doubtful', 'Day-to-Day')),
    reason TEXT,
    expected_return TEXT,
    impact_level TEXT CHECK(impact_level IN ('High', 'Medium', 'Low')),
    reported_date TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id)
);

CREATE INDEX idx_injuries_player ON injuries(player_id);
CREATE INDEX idx_injuries_status ON injuries(status);

-- ============================================
-- GAMES
-- ============================================
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    external_id TEXT UNIQUE,
    league TEXT NOT NULL CHECK(league IN ('nba', 'gbl', 'elite')),
    game_date TEXT NOT NULL,
    game_time TEXT,
    home_team_id INTEGER NOT NULL,
    away_team_id INTEGER NOT NULL,
    status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'live', 'completed')),
    final_home_score INTEGER,
    final_away_score INTEGER,
    venue TEXT,
    season INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id)
);

CREATE INDEX idx_games_date ON games(game_date);
CREATE INDEX idx_games_league ON games(league);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_teams ON games(home_team_id, away_team_id);

-- ============================================
-- ODDS (Historical)
-- ============================================
CREATE TABLE IF NOT EXISTS odds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    sportsbook TEXT NOT NULL,
    home_moneyline REAL,
    away_moneyline REAL,
    spread REAL,
    spread_home_odds REAL,
    spread_away_odds REAL,
    total REAL,
    over_odds REAL,
    under_odds REAL,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE INDEX idx_odds_game ON odds(game_id);
CREATE INDEX idx_odds_sportsbook ON odds(sportsbook);
CREATE INDEX idx_odds_timestamp ON odds(timestamp);

-- ============================================
-- TEAM STATISTICS
-- ============================================
CREATE TABLE IF NOT EXISTS team_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    game_id INTEGER,
    season INTEGER,
    games_played INTEGER,
    pace REAL,
    offensive_rating REAL,
    defensive_rating REAL,
    net_rating REAL,
    true_shooting_pct REAL,
    assist_ratio REAL,
    turnover_ratio REAL,
    rebound_ratio REAL,
    three_pt_attempt_rate REAL,
    three_pt_pct REAL,
    ft_pct REAL,
    home_wins INTEGER,
    home_losses INTEGER,
    away_wins INTEGER,
    away_losses INTEGER,
    ats_wins INTEGER,
    ats_losses INTEGER,
    ou_overs INTEGER,
    ou_unders INTEGER,
    last_10_record TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE INDEX idx_team_stats_team ON team_stats(team_id);
CREATE INDEX idx_team_stats_season ON team_stats(season);

-- ============================================
-- HEAD TO HEAD
-- ============================================
CREATE TABLE IF NOT EXISTS head_to_head (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team1_id INTEGER NOT NULL,
    team2_id INTEGER NOT NULL,
    league TEXT NOT NULL,
    all_time_team1_wins INTEGER,
    all_time_team2_wins INTEGER,
    season_team1_wins INTEGER,
    season_team2_wins INTEGER,
    team1_ats_wins INTEGER,
    team2_ats_wins INTEGER,
    last_10_matchups TEXT, -- JSON
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team1_id) REFERENCES teams(id),
    FOREIGN KEY (team2_id) REFERENCES teams(id)
);

CREATE INDEX idx_h2h_teams ON head_to_head(team1_id, team2_id);

-- ============================================
-- BETS (User Betting Activity)
-- ============================================
CREATE TABLE IF NOT EXISTS bets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    bet_type TEXT NOT NULL CHECK(bet_type IN ('spread', 'moneyline', 'total', 'parlay', 'prop')),
    selection TEXT NOT NULL, -- e.g., 'home_spread', 'away_moneyline', 'over_total'
    odds REAL NOT NULL,
    odds_decimal REAL NOT NULL,
    stake REAL NOT NULL,
    expected_value REAL,
    ev_percentage REAL,
    confidence REAL CHECK(confidence >= 0 AND confidence <= 1),
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'won', 'lost', 'push', 'void')),
    result_profit REAL,
    notes TEXT,
    placed_date TIMESTAMP NOT NULL,
    result_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE INDEX idx_bets_status ON bets(status);
CREATE INDEX idx_bets_date ON bets(placed_date);
CREATE INDEX idx_bets_game ON bets(game_id);

-- ============================================
-- BANKROLL TRACKING
-- ============================================
CREATE TABLE IF NOT EXISTS bankroll (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry_date TEXT NOT NULL UNIQUE,
    starting_balance REAL NOT NULL,
    current_balance REAL NOT NULL,
    total_wagered REAL,
    total_won REAL,
    total_lost REAL,
    net_profit REAL,
    roi_percentage REAL,
    bets_placed INTEGER DEFAULT 0,
    bets_won INTEGER DEFAULT 0,
    bets_lost INTEGER DEFAULT 0,
    win_rate REAL,
    consecutive_wins INTEGER DEFAULT 0,
    consecutive_losses INTEGER DEFAULT 0,
    max_streak_wins INTEGER,
    max_streak_losses INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bankroll_date ON bankroll(entry_date);

-- ============================================
-- ANALYSIS RESULTS
-- ============================================
CREATE TABLE IF NOT EXISTS game_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    predicted_home_probability REAL,
    predicted_away_probability REAL,
    confidence_score REAL,
    strength_of_schedule REAL,
    injury_impact_home REAL,
    injury_impact_away REAL,
    matchup_advantage TEXT, -- 'home', 'away', 'neutral'
    trend_analysis TEXT, -- JSON: home trend, away trend
    recommended_bet TEXT,
    recommended_odds_decimal REAL,
    analysis_timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE INDEX idx_analysis_game ON game_analysis(game_id);

-- ============================================
-- PERFORMANCE STATISTICS
-- ============================================
CREATE TABLE IF NOT EXISTS performance_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    period TEXT NOT NULL CHECK(period IN ('daily', 'weekly', 'monthly', 'yearly')),
    period_start_date TEXT NOT NULL,
    period_end_date TEXT NOT NULL,
    total_bets INTEGER,
    winning_bets INTEGER,
    losing_bets INTEGER,
    push_bets INTEGER,
    win_rate REAL,
    roi REAL,
    total_profit REAL,
    total_loss REAL,
    net_profit REAL,
    profit_factor REAL,
    avg_odds REAL,
    best_bet REAL,
    worst_bet REAL,
    by_league TEXT, -- JSON: { nba: {wins, losses}, gbl: {...}, elite: {...} }
    by_bet_type TEXT, -- JSON: { spread: {...}, moneyline: {...}, total: {...} }
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_perf_stats_period ON performance_stats(period, period_start_date);

-- ============================================
-- SYSTEM SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default settings
INSERT OR IGNORE INTO settings (setting_key, setting_value, description) VALUES
('default_bankroll', '1000', 'Starting bankroll amount in $'),
('kelly_fraction', '0.25', 'Kelly criterion fraction (0.25 = 25% Kelly)'),
('min_ev_threshold', '0.05', 'Minimum expected value threshold (0.05 = 5%)'),
('max_bet_percentage', '0.05', 'Maximum bet size as percentage of bankroll'),
('daily_loss_limit', '0.10', 'Daily loss limit as percentage of bankroll'),
('default_strategy', 'kelly', 'Default betting strategy (kelly, flat, proportional)'),
('min_confidence', '0.60', 'Minimum confidence to place bet (0.0-1.0)'),
('enabled_leagues', 'nba,gbl,elite', 'Comma-separated list of enabled leagues');

-- ============================================
-- API KEYS (for external services)
-- ============================================
CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT NOT NULL UNIQUE,
    api_key TEXT NOT NULL,
    last_tested TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Create Views for Easy Queries
-- ============================================

-- Active games (upcoming + live)
CREATE VIEW IF NOT EXISTS active_games AS
SELECT 
    g.id,
    g.league,
    g.game_date,
    g.game_time,
    ht.name as home_team,
    at.name as away_team,
    g.status,
    g.venue
FROM games g
JOIN teams ht ON g.home_team_id = ht.id
JOIN teams at ON g.away_team_id = at.id
WHERE g.status IN ('scheduled', 'live')
ORDER BY g.game_date, g.game_time;

-- Today's games
CREATE VIEW IF NOT EXISTS todays_games AS
SELECT 
    g.id,
    g.league,
    g.game_date,
    g.game_time,
    ht.name as home_team,
    at.name as away_team,
    g.status
FROM games g
JOIN teams ht ON g.home_team_id = ht.id
JOIN teams at ON g.away_team_id = at.id
WHERE DATE(g.game_date) = DATE('now')
ORDER BY g.game_time;

-- Pending bets
CREATE VIEW IF NOT EXISTS pending_bets AS
SELECT 
    b.id,
    b.bet_type,
    b.selection,
    b.odds,
    b.stake,
    b.expected_value,
    b.ev_percentage,
    b.confidence,
    g.game_date,
    ht.name as home_team,
    at.name as away_team
FROM bets b
JOIN games g ON b.game_id = g.id
JOIN teams ht ON g.home_team_id = ht.id
JOIN teams at ON g.away_team_id = at.id
WHERE b.status = 'pending'
ORDER BY g.game_date;

-- Completed bets summary
CREATE VIEW IF NOT EXISTS completed_bets_summary AS
SELECT 
    COUNT(*) as total_bets,
    SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as wins,
    SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) as losses,
    SUM(CASE WHEN status = 'push' THEN 1 ELSE 0 END) as pushes,
    ROUND(100.0 * SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) / COUNT(*), 2) as win_rate_pct,
    SUM(stake) as total_risked,
    SUM(result_profit) as total_profit,
    ROUND(100.0 * SUM(result_profit) / SUM(stake), 2) as roi_pct
FROM bets
WHERE status IN ('won', 'lost', 'push');
