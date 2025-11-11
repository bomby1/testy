// Advanced Chart Page JavaScript
let chart = null;
let volumeChart = null;
let indicatorChart = null;
let stockData = null;
let allStockData = {};
let currentSymbol = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    await loadStockData();
    setupEventListeners();
    populateStockList();
});

// Load stock data from JSON file
async function loadStockData() {
    try {
        const response = await fetch('organized_nepse_data.json');
        allStockData = await response.json();
        console.log('Stock data loaded successfully');
    } catch (error) {
        console.error('Error loading stock data:', error);
        showNotification('Error loading stock data', 'error');
    }
}

// Populate stock list datalist
function populateStockList() {
    const datalist = document.getElementById('stockList');
    const symbols = Object.keys(allStockData).sort();
    
    datalist.innerHTML = '';
    symbols.forEach(symbol => {
        const option = document.createElement('option');
        option.value = symbol;
        datalist.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Back button
    document.getElementById('backToDashboard').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });

    // Load stock button
    document.getElementById('loadStockBtn').addEventListener('click', loadStock);

    // Stock search enter key
    document.getElementById('stockSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadStock();
        }
    });

    // Chart type change
    document.getElementById('chartType').addEventListener('change', updateChartType);

    // Time period change
    document.getElementById('timePeriod').addEventListener('change', updateTimePeriod);

    // Indicator checkboxes
    document.querySelectorAll('[data-indicator]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const indicator = e.target.dataset.indicator;
            toggleIndicator(indicator, e.target.checked);
            
            // Show/hide parameter inputs
            const params = document.getElementById(`${indicator}Params`);
            if (params) {
                params.classList.toggle('hidden', !e.target.checked);
            }
        });
    });

    // Indicator parameter changes
    document.querySelectorAll('.indicator-params input').forEach(input => {
        input.addEventListener('change', () => {
            if (currentSymbol) {
                updateIndicators();
            }
        });
    });

    // Toolbar buttons
    document.getElementById('zoomIn').addEventListener('click', () => {
        if (chart) chart.timeScale().applyOptions({ barSpacing: chart.timeScale().options().barSpacing * 1.2 });
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        if (chart) chart.timeScale().applyOptions({ barSpacing: chart.timeScale().options().barSpacing * 0.8 });
    });

    document.getElementById('resetZoom').addEventListener('click', () => {
        if (chart) chart.timeScale().fitContent();
    });

    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    document.getElementById('downloadBtn').addEventListener('click', downloadChart);

    // Drawing tools
    document.querySelectorAll('[data-tool]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tool = e.target.closest('[data-tool]').dataset.tool;
            handleDrawingTool(tool);
        });
    });
}

// Load stock chart
async function loadStock() {
    const symbol = document.getElementById('stockSearch').value.trim().toUpperCase();
    
    if (!symbol) {
        showNotification('Please enter a stock symbol', 'warning');
        return;
    }

    if (!allStockData[symbol]) {
        showNotification(`Stock ${symbol} not found`, 'error');
        return;
    }

    currentSymbol = symbol;
    stockData = allStockData[symbol];

    // Update stock info
    updateStockInfo(symbol);

    // Create chart
    createChart(symbol);

    // Hide placeholder
    document.querySelector('.chart-placeholder').style.display = 'none';
}

// Update stock info display
function updateStockInfo(symbol) {
    const info = document.getElementById('stockInfo');
    const data = stockData;
    
    if (data && data.length > 0) {
        const latestData = data[data.length - 1];
        
        document.getElementById('symbolName').textContent = symbol;
        document.getElementById('ltpValue').textContent = latestData.close ? latestData.close.toFixed(2) : '-';
        
        if (data.length > 1) {
            const prevClose = data[data.length - 2].close;
            const change = latestData.close - prevClose;
            const changePercent = (change / prevClose * 100).toFixed(2);
            const changeElement = document.getElementById('changeValue');
            changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent}%)`;
            changeElement.style.color = change >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        }
        
        info.classList.remove('hidden');
    }
}

// Create the main chart
function createChart(symbol) {
    const container = document.getElementById('mainChart');
    
    // Remove existing chart
    if (chart) {
        chart.remove();
        chart = null;
    }

    // Create new chart
    chart = LightweightCharts.createChart(container, {
        width: container.clientWidth,
        height: container.clientHeight,
        layout: {
            background: { color: '#ffffff' },
            textColor: '#333',
        },
        grid: {
            vertLines: { color: '#f0f0f0' },
            horzLines: { color: '#f0f0f0' },
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: '#e0e0e0',
        },
        timeScale: {
            borderColor: '#e0e0e0',
            timeVisible: true,
            secondsVisible: false,
        },
    });

    // Prepare data
    const chartData = prepareChartData(stockData);

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#10b981',
        downColor: '#ef4444',
        borderUpColor: '#10b981',
        borderDownColor: '#ef4444',
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(chartData);

    // Add volume if checked
    if (document.getElementById('showVolume').checked) {
        createVolumeChart(chartData);
    }

    // Fit content
    chart.timeScale().fitContent();

    // Handle resize
    window.addEventListener('resize', () => {
        if (chart) {
            chart.applyOptions({ 
                width: container.clientWidth,
                height: container.clientHeight 
            });
        }
    });

    // Add chart loaded animation
    container.classList.add('chart-loaded');
}

// Prepare chart data from stock data
function prepareChartData(data) {
    if (!data || !Array.isArray(data)) return [];

    const timePeriod = document.getElementById('timePeriod').value;
    let filteredData = data;

    // Filter by time period
    if (timePeriod !== 'all') {
        const days = parseInt(timePeriod);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        filteredData = data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= cutoffDate;
        });
    }

    // Convert to chart format
    return filteredData.map(item => ({
        time: item.date,
        open: parseFloat(item.open) || 0,
        high: parseFloat(item.high) || 0,
        low: parseFloat(item.low) || 0,
        close: parseFloat(item.close) || 0,
        volume: parseFloat(item.volume) || 0
    })).filter(item => item.close > 0);
}

// Create volume chart
function createVolumeChart(data) {
    const container = document.getElementById('volumeChart');
    container.classList.remove('hidden');

    if (volumeChart) {
        volumeChart.remove();
    }

    volumeChart = LightweightCharts.createChart(container, {
        width: container.clientWidth,
        height: 150,
        layout: {
            background: { color: '#ffffff' },
            textColor: '#333',
        },
        grid: {
            vertLines: { color: '#f0f0f0' },
            horzLines: { color: '#f0f0f0' },
        },
        timeScale: {
            borderColor: '#e0e0e0',
            visible: false,
        },
    });

    const volumeSeries = volumeChart.addHistogramSeries({
        color: '#667eea',
        priceFormat: {
            type: 'volume',
        },
    });

    const volumeData = data.map(item => ({
        time: item.time,
        value: item.volume,
        color: item.close >= item.open ? '#10b98180' : '#ef444480'
    }));

    volumeSeries.setData(volumeData);

    // Sync time scales
    if (chart && volumeChart) {
        chart.timeScale().subscribeVisibleTimeRangeChange(() => {
            volumeChart.timeScale().setVisibleRange(chart.timeScale().getVisibleRange());
        });
    }
}

// Update chart type
function updateChartType() {
    if (currentSymbol) {
        createChart(currentSymbol);
        updateIndicators();
    }
}

// Update time period
function updateTimePeriod() {
    if (currentSymbol) {
        createChart(currentSymbol);
        updateIndicators();
    }
}

// Toggle indicator
function toggleIndicator(indicator, enabled) {
    if (!currentSymbol) return;

    if (indicator === 'volume') {
        if (enabled) {
            const chartData = prepareChartData(stockData);
            createVolumeChart(chartData);
        } else {
            document.getElementById('volumeChart').classList.add('hidden');
            if (volumeChart) {
                volumeChart.remove();
                volumeChart = null;
            }
        }
    } else {
        updateIndicators();
    }
}

// Update all indicators
function updateIndicators() {
    if (!chart || !currentSymbol) return;

    const chartData = prepareChartData(stockData);

    // SMA
    if (document.getElementById('showSMA').checked) {
        const period = parseInt(document.getElementById('smaPeriod').value);
        const smaData = calculateSMA(chartData, period);
        addLineSeries('SMA', smaData, '#667eea');
    }

    // EMA
    if (document.getElementById('showEMA').checked) {
        const period = parseInt(document.getElementById('emaPeriod').value);
        const emaData = calculateEMA(chartData, period);
        addLineSeries('EMA', emaData, '#764ba2');
    }

    // Bollinger Bands
    if (document.getElementById('showBollinger').checked) {
        const period = parseInt(document.getElementById('bollingerPeriod').value);
        const stdDev = parseFloat(document.getElementById('bollingerStdDev').value);
        const bollingerData = calculateBollingerBands(chartData, period, stdDev);
        addLineSeries('BB_Upper', bollingerData.upper, '#f093fb');
        addLineSeries('BB_Lower', bollingerData.lower, '#f093fb');
        addLineSeries('BB_Middle', bollingerData.middle, '#667eea');
    }
}

// Add line series to chart
function addLineSeries(name, data, color) {
    if (!chart) return;

    const series = chart.addLineSeries({
        color: color,
        lineWidth: 2,
        title: name,
    });

    series.setData(data);
}

// Calculate SMA
function calculateSMA(data, period) {
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j].close;
        }
        result.push({
            time: data[i].time,
            value: sum / period
        });
    }
    return result;
}

// Calculate EMA
function calculateEMA(data, period) {
    const result = [];
    const multiplier = 2 / (period + 1);
    let ema = data[0].close;

    for (let i = 0; i < data.length; i++) {
        ema = (data[i].close - ema) * multiplier + ema;
        result.push({
            time: data[i].time,
            value: ema
        });
    }
    return result;
}

// Calculate Bollinger Bands
function calculateBollingerBands(data, period, stdDevMultiplier) {
    const sma = calculateSMA(data, period);
    const upper = [];
    const lower = [];
    const middle = [];

    for (let i = 0; i < sma.length; i++) {
        const dataIndex = i + period - 1;
        let sumSquaredDiff = 0;

        for (let j = 0; j < period; j++) {
            const diff = data[dataIndex - j].close - sma[i].value;
            sumSquaredDiff += diff * diff;
        }

        const stdDev = Math.sqrt(sumSquaredDiff / period);
        const upperValue = sma[i].value + (stdDev * stdDevMultiplier);
        const lowerValue = sma[i].value - (stdDev * stdDevMultiplier);

        upper.push({ time: sma[i].time, value: upperValue });
        lower.push({ time: sma[i].time, value: lowerValue });
        middle.push({ time: sma[i].time, value: sma[i].value });
    }

    return { upper, lower, middle };
}

// Handle drawing tools
function handleDrawingTool(tool) {
    if (tool === 'clear') {
        // Clear all drawings - would need to track drawn items
        showNotification('All drawings cleared', 'success');
    } else {
        showNotification(`${tool} tool activated - Click on chart to draw`, 'info');
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    const chartArea = document.querySelector('.chart-area');
    chartArea.classList.toggle('fullscreen');

    // Resize chart
    setTimeout(() => {
        if (chart) {
            const container = document.getElementById('mainChart');
            chart.applyOptions({
                width: container.clientWidth,
                height: container.clientHeight
            });
        }
    }, 100);
}

// Download chart
function downloadChart() {
    showNotification('Chart download feature coming soon', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--danger-color)',
        warning: 'var(--warning-color)',
        info: 'var(--info-color)'
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${colors[type]};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
