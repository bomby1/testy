# 🚀 Quick Start Guide

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Server
```bash
npm start
```

The server will start at `http://localhost:3000`

### 3. Test Vercel Functions Locally
```bash
npx vercel dev
```

This will start a local Vercel development server.

## Deploy to Vercel

### One-Command Deploy
```bash
npx vercel --prod
```

That's it! Your site will be live on Vercel.

## Features Overview

### 📊 Main Dashboard
- Stock watchlist management
- Real-time price updates
- Support level tracking
- Excel import/export

### 📈 Advanced Chart Page
- Full-page TradingView-style charts
- Technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands)
- Drawing tools
- Volume analysis
- Zoom & fullscreen controls

### 🌙 Dark Mode
- Click the moon/sun button (bottom-right)
- Preference saved automatically

### 📱 Mobile Responsive
- Card layout on mobile devices
- Hamburger menu for navigation
- Touch-friendly controls

## Navigation

All pages accessible via the navigation menu:
- Dashboard
- Advanced Chart (NEW!)
- Support Stocks
- RSI + Support
- Support Prediction
- Stoploss Tracker
- Consolidation Scanner
- Consolidation Analyzer
- Enhanced Trendline Scanner
- Institutional Activity
- Big Player Accumulation
- Weekly Heatmap
- IPO & Rights
- Trading Signals

## API Endpoints

- `/api/stocks` - Get all stock data
- `/api/prices` - Get current prices

## Tips

1. **Dark Mode**: Toggle with the floating button (bottom-right)
2. **Scroll to Top**: Click the ↑ button when scrolling down
3. **Mobile Menu**: Click the hamburger icon on mobile
4. **Advanced Chart**: Select a stock from the sidebar to view chart
5. **Indicators**: Enable/disable technical indicators in the chart sidebar

## Troubleshooting

### API Not Working
Make sure the serverless functions are deployed:
```bash
vercel --prod
```

### Styles Not Loading
Clear browser cache and reload:
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Dark Mode Not Saving
Check if localStorage is enabled in your browser.

## Support

For issues or questions, check:
- `VERCEL_DEPLOYMENT.md` - Deployment guide
- `MODERNIZATION_SUMMARY.md` - Feature overview

---

**Happy Trading! 📈**
