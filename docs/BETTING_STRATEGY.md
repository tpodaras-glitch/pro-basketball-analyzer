# Betting Strategy Guide - Pro Basketball Analyzer

## Core Principles

### 1. Value First
- Only bet when **Actual Probability > Implied Probability**
- Calculate Expected Value on every bet
- Minimum EV threshold: 5% (configurable)

### 2. Bankroll Protection
- Never risk more than 5% of bankroll on single bet
- Use Kelly Criterion or proportional sizing
- Maintain strict loss limits

### 3. Long-term Focus
- Win rate > 52% on -110 odds is profitable
- Variance is normal - track monthly, not daily
- Volume matters: 100+ bets to validate strategy

## Bet Sizing Strategies

### Kelly Criterion

**Formula**: `f* = (bp - q) / b`

Where:
- `f*` = Fraction of bankroll to bet
- `b` = Decimal odds - 1
- `p` = Actual probability
- `q` = 1 - p (probability of loss)

**Example**:
- Bankroll: $1000
- Odds: -110 (1.909 decimal)
- Actual probability: 60%
- `b` = 0.909
- `p` = 0.60, `q` = 0.40
- `f*` = (0.909 × 0.60 - 0.40) / 0.909 = 0.304 (30.4%)
- **Bet: $304**

⚠️ **Use Fractional Kelly**: 
- Full Kelly is aggressive (variance)
- Use 25% Kelly for safety: $304 × 0.25 = $76
- This reduces volatility while maintaining edge

### Flat Betting

**Fixed unit system**:
- Set 1 unit = fixed $ amount (e.g., $50)
- Bet 1 unit on all bets regardless of edge
- Simple, reduces variance

**Pros**: 
- Easy to execute
- Lower variance
- Mental clarity

**Cons**: 
- Suboptimal growth
- Doesn't leverage strong edges

### Proportional Betting

**Scale bet size with confidence/edge**:

| Confidence | EV | Units |
|------------|-----|-------|
| 50-55% | 0-5% | 1 |
| 55-60% | 5-10% | 1.5 |
| 60-65% | 10-15% | 2 |
| 65%+ | 15%+ | 2.5 |

**Benefits**:
- Maximizes profitable edges
- Controls risk
- Balances growth and variance

## Value Bet Detection

### Step 1: Get Odds
```
Decimal Odds: 1.909 (American -110)
Implied Probability = 1 / 1.909 = 0.524 (52.4%)
```

### Step 2: Estimate Actual Probability

Use:
- Historical ATS records
- Team stats (pace, offense/defense rating)
- Head-to-head matchups
- Injury reports
- Trends (home/away, back-to-back)
- Line movement

**Example**: Lakers vs Celtics
- Lakers ATS (last 10 games): 7-3 (70%)
- Home court advantage: +3 points
- Key player healthy: Yes
- Trend: Winning
- **Estimated win probability: 62%**

### Step 3: Calculate Expected Value

```
EV = (Win Probability × Profit) - (Loss Probability × Stake)
EV = (0.62 × 90) - (0.38 × 100)
EV = 55.80 - 38 = $17.80 per $100 bet
EV% = 17.80% expected return
```

**Decision**: 
- EV > 5% → **BET** ✓
- EV < 0% → **SKIP** ✗

## Game Analysis Framework

### 1. Team Form (40% weight)
```
Last 10 games:
- W-L record
- ATS record
- Point differential
- Home vs Away splits
- Trend direction
```

### 2. Matchup Analysis (30% weight)
```
Key Positions:
- PG vs PG
- SG vs SG
- SF vs SF
- PF vs PF
- C vs C

Advantage Calculation:
- Individual player stats
- Defensive specialist impact
- Depth (bench quality)
```

### 3. Pace & Style (15% weight)
```
- Tempo difference
- Defensive intensity
- Transition opportunities
- Pick & roll frequency
```

### 4. Health & Availability (10% weight)
```
- Injuries (O, Q, D status)
- Back-to-back impact
- Player minutes trends
```

### 5. External Factors (5% weight)
```
- Travel distance & time
- National TV impact
- Playoff/seeding implications
```

## Line Movement Strategy

### What It Means
```
Opening Line: Lakers -5
Current Line: Lakers -6.5

→ Money has come in on Lakers
→ Consensus believes Lakers stronger than opened
→ Closing line matters for your decision
```

### Action on Line Movement

| Movement | Signal | Action |
|----------|--------|--------|
| Line moves your way | Softer odds | Fade (less confident) |
| Line moves against you | Sharper odds | Follow (more confident) |
| Reverse movement | Market correction | Re-evaluate |
| Sharp activity | Pros on game | Higher conviction |

## Specific Bet Types

### Spread Bets (-110 odds)
```
Lakers -5 (-110)
- Win if Lakers win by 6+ points
- Lose if Lakers win by 4 or less, or lose
- Push if Lakers win by exactly 5

Expected to win 52.4%+ of the time with edge
```

### Total Bets (Over/Under)
```
Total 215.5 Over (-110)
- Win if combined score > 215.5
- Lose if combined score < 215.5
- Push if exactly 215.5

Analyze: Pace, defensive rating, tempo
```

### Moneyline Bets
```
Lakers: -200 (implied 66.7% win prob)
Celtics: +170 (implied 37.0% win prob)

Riskier on favorites
Higher EV often on underdogs (if overpriced)
```

## Risk Management Rules

1. **Maximum bet size**: 5% of bankroll
2. **Daily loss limit**: 10% of bankroll
3. **Consecutive loss stop**: After 3 consecutive losses, review strategy
4. **Minimum EV threshold**: 5%
5. **Confidence requirement**: Only bet 60%+ confidence games

## Performance Metrics to Track

### Daily
- Bets placed
- Wins/losses
- Units risked/won

### Weekly
- Win rate
- ROI
- ATS record by league

### Monthly
- Profit/loss
- Performance by bet type
- Performance by league
- Consistency

### Quarterly
- Overall ROI
- Strategy effectiveness
- Adjustments needed

## Common Mistakes to Avoid

✗ **Chasing losses**: Betting bigger after losses
✗ **Ignoring bankroll rules**: Betting over limits
✗ **Revenge betting**: Emotional bets on bad beats
✗ **Favorites bias**: Overweighting popular teams
✗ **No EV calculation**: Betting hunches instead of math
✗ **Insufficient data**: Betting before doing analysis
✗ **Overconfidence**: Betting outside expertise (leagues)

## Seasonal Patterns

### NBA
- **October-November**: Regular season opening, line adjustment period
- **December-January**: Teams stabilize, reliable trends emerge
- **February-March**: Trade deadline impact, playoff race tightens
- **April**: Playoff seeding, load management, inconsistency

### Greek Basketball
- **October-April**: Regular season (different calendar)
- **May-June**: Playoffs
- **Summer**: Off-season

**Strategy**: Focus betting on December-March when patterns are clearest

---

**Remember**: Disciplined bankroll management + patient value hunting = Long-term profits.
