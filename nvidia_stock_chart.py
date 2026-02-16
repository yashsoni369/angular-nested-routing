#!/usr/bin/env python3
"""
NVIDIA (NVDA) Last Week Stock Trend Chart Generator
Fetches the last 5 trading days of NVIDIA stock data and generates
trend chart images (line chart, candlestick chart, and volume chart).
"""

import yfinance as yf
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend for image generation
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.ticker as mticker
from matplotlib.patches import FancyBboxPatch
from datetime import datetime, timedelta
import numpy as np
import os

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nvidia_charts')
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fetch_nvidia_data():
    """Fetch NVIDIA stock data for the last trading week."""
    ticker = yf.Ticker("NVDA")

    # Fetch 10 calendar days to ensure we get at least 5 trading days
    end_date = datetime.now()
    start_date = end_date - timedelta(days=10)

    df = ticker.history(start=start_date.strftime('%Y-%m-%d'),
                        end=end_date.strftime('%Y-%m-%d'),
                        interval='1d')

    # Keep only the last 5 trading days
    df = df.tail(5)

    if df.empty:
        raise ValueError("No stock data retrieved for NVIDIA. Market may be closed or data unavailable.")

    print(f"Fetched {len(df)} trading days of NVIDIA data:")
    print(f"  Date range: {df.index[0].strftime('%Y-%m-%d')} to {df.index[-1].strftime('%Y-%m-%d')}")
    print(f"  Open range:  ${df['Open'].min():.2f} - ${df['Open'].max():.2f}")
    print(f"  Close range: ${df['Close'].min():.2f} - ${df['Close'].max():.2f}")
    print(f"  High:  ${df['High'].max():.2f}")
    print(f"  Low:   ${df['Low'].min():.2f}")
    print()
    print(df[['Open', 'High', 'Low', 'Close', 'Volume']].to_string())
    print()

    return df


def create_line_chart(df):
    """Generate a line chart showing NVIDIA closing price trend."""
    fig, ax = plt.subplots(figsize=(12, 6))

    dates = df.index
    close_prices = df['Close'].values

    # Gradient fill under the line
    ax.plot(dates, close_prices, color='#76b900', linewidth=2.5, marker='o',
            markersize=8, markerfacecolor='white', markeredgecolor='#76b900',
            markeredgewidth=2, zorder=5, label='Close Price')
    ax.fill_between(dates, close_prices, alpha=0.15, color='#76b900')

    # Annotate each point with the price
    for i, (date, price) in enumerate(zip(dates, close_prices)):
        offset = 10 if i % 2 == 0 else -18
        ax.annotate(f'${price:.2f}',
                    xy=(date, price),
                    xytext=(0, offset),
                    textcoords='offset points',
                    ha='center', va='bottom' if offset > 0 else 'top',
                    fontsize=9, fontweight='bold', color='#333333',
                    bbox=dict(boxstyle='round,pad=0.3', facecolor='white',
                              edgecolor='#76b900', alpha=0.8))

    # Calculate price change
    price_change = close_prices[-1] - close_prices[0]
    pct_change = (price_change / close_prices[0]) * 100
    change_color = '#00c853' if price_change >= 0 else '#ff1744'
    change_symbol = '+' if price_change >= 0 else ''

    ax.set_title(f'NVIDIA (NVDA) Stock Price - Last Week\n'
                 f'Weekly Change: {change_symbol}${price_change:.2f} ({change_symbol}{pct_change:.2f}%)',
                 fontsize=14, fontweight='bold', pad=15, color='#333333')

    ax.set_xlabel('Date', fontsize=11, color='#555555')
    ax.set_ylabel('Price (USD)', fontsize=11, color='#555555')

    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d\n%a'))
    ax.yaxis.set_major_formatter(mticker.FormatStrFormatter('$%.2f'))

    ax.grid(True, alpha=0.3, linestyle='--')
    ax.set_facecolor('#fafafa')
    fig.patch.set_facecolor('white')

    # Add padding to y-axis
    y_margin = (close_prices.max() - close_prices.min()) * 0.15
    if y_margin == 0:
        y_margin = close_prices.max() * 0.02
    ax.set_ylim(close_prices.min() - y_margin, close_prices.max() + y_margin)

    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color('#cccccc')
    ax.spines['bottom'].set_color('#cccccc')

    plt.tight_layout()
    filepath = os.path.join(OUTPUT_DIR, 'nvidia_line_chart.png')
    fig.savefig(filepath, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Line chart saved: {filepath}")
    return filepath


def create_candlestick_chart(df):
    """Generate a candlestick chart for NVIDIA stock."""
    fig, ax = plt.subplots(figsize=(12, 6))

    dates = df.index
    opens = df['Open'].values
    highs = df['High'].values
    lows = df['Low'].values
    closes = df['Close'].values

    # Width of candlestick body
    width = 0.6

    for i in range(len(dates)):
        date_num = mdates.date2num(dates[i])

        # Determine color: green if close >= open, red otherwise
        if closes[i] >= opens[i]:
            color = '#00c853'
            body_bottom = opens[i]
            body_height = closes[i] - opens[i]
        else:
            color = '#ff1744'
            body_bottom = closes[i]
            body_height = opens[i] - closes[i]

        # Ensure minimum body height for visibility
        if body_height < 0.01:
            body_height = 0.3

        # Draw the wick (high-low line)
        ax.plot([date_num, date_num], [lows[i], highs[i]],
                color=color, linewidth=1.5, zorder=3)

        # Draw the body
        rect = plt.Rectangle((date_num - width/2, body_bottom), width, body_height,
                              facecolor=color, edgecolor=color, linewidth=1, zorder=4, alpha=0.9)
        ax.add_patch(rect)

    ax.set_xlim(mdates.date2num(dates[0]) - 1, mdates.date2num(dates[-1]) + 1)

    all_prices = np.concatenate([opens, highs, lows, closes])
    y_margin = (all_prices.max() - all_prices.min()) * 0.15
    if y_margin == 0:
        y_margin = all_prices.max() * 0.02
    ax.set_ylim(all_prices.min() - y_margin, all_prices.max() + y_margin)

    # Calculate weekly change
    price_change = closes[-1] - closes[0]
    pct_change = (price_change / closes[0]) * 100
    change_symbol = '+' if price_change >= 0 else ''

    ax.set_title(f'NVIDIA (NVDA) Candlestick Chart - Last Week\n'
                 f'O: ${opens[-1]:.2f}  H: ${highs[-1]:.2f}  L: ${lows[-1]:.2f}  C: ${closes[-1]:.2f}',
                 fontsize=14, fontweight='bold', pad=15, color='#333333')

    ax.set_xlabel('Date', fontsize=11, color='#555555')
    ax.set_ylabel('Price (USD)', fontsize=11, color='#555555')

    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d\n%a'))
    ax.xaxis.set_major_locator(mdates.DayLocator())
    ax.yaxis.set_major_formatter(mticker.FormatStrFormatter('$%.2f'))

    ax.grid(True, alpha=0.3, linestyle='--')
    ax.set_facecolor('#fafafa')
    fig.patch.set_facecolor('white')

    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color('#cccccc')
    ax.spines['bottom'].set_color('#cccccc')

    # Legend
    from matplotlib.lines import Line2D
    legend_elements = [
        Line2D([0], [0], color='#00c853', marker='s', markersize=10, linestyle='',
               markerfacecolor='#00c853', label='Bullish (Close > Open)'),
        Line2D([0], [0], color='#ff1744', marker='s', markersize=10, linestyle='',
               markerfacecolor='#ff1744', label='Bearish (Close < Open)')
    ]
    ax.legend(handles=legend_elements, loc='upper left', framealpha=0.9, fontsize=9)

    plt.tight_layout()
    filepath = os.path.join(OUTPUT_DIR, 'nvidia_candlestick_chart.png')
    fig.savefig(filepath, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Candlestick chart saved: {filepath}")
    return filepath


def create_volume_chart(df):
    """Generate a combined price + volume chart."""
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8), height_ratios=[3, 1],
                                     sharex=True, gridspec_kw={'hspace': 0.05})

    dates = df.index
    closes = df['Close'].values
    volumes = df['Volume'].values
    opens = df['Open'].values

    # Top panel: Price line
    ax1.plot(dates, closes, color='#76b900', linewidth=2.5, marker='o',
             markersize=7, markerfacecolor='white', markeredgecolor='#76b900',
             markeredgewidth=2, zorder=5)
    ax1.fill_between(dates, closes, alpha=0.1, color='#76b900')

    for i, (date, price) in enumerate(zip(dates, closes)):
        ax1.annotate(f'${price:.2f}',
                     xy=(date, price),
                     xytext=(0, 12),
                     textcoords='offset points',
                     ha='center', fontsize=9, fontweight='bold', color='#333333')

    price_change = closes[-1] - closes[0]
    pct_change = (price_change / closes[0]) * 100
    change_symbol = '+' if price_change >= 0 else ''

    ax1.set_title(f'NVIDIA (NVDA) Price & Volume - Last Week\n'
                  f'Weekly Change: {change_symbol}${price_change:.2f} ({change_symbol}{pct_change:.2f}%)',
                  fontsize=14, fontweight='bold', pad=15, color='#333333')
    ax1.set_ylabel('Price (USD)', fontsize=11, color='#555555')
    ax1.yaxis.set_major_formatter(mticker.FormatStrFormatter('$%.2f'))
    ax1.grid(True, alpha=0.3, linestyle='--')
    ax1.set_facecolor('#fafafa')

    y_margin = (closes.max() - closes.min()) * 0.2
    if y_margin == 0:
        y_margin = closes.max() * 0.02
    ax1.set_ylim(closes.min() - y_margin, closes.max() + y_margin)

    ax1.spines['top'].set_visible(False)
    ax1.spines['right'].set_visible(False)
    ax1.spines['bottom'].set_visible(False)
    ax1.spines['left'].set_color('#cccccc')

    # Bottom panel: Volume bars
    colors = ['#00c853' if closes[i] >= opens[i] else '#ff1744' for i in range(len(dates))]
    ax2.bar(dates, volumes, color=colors, alpha=0.7, width=0.6)

    # Format volume labels
    for i, (date, vol) in enumerate(zip(dates, volumes)):
        vol_label = f'{vol/1e6:.1f}M' if vol >= 1e6 else f'{vol/1e3:.0f}K'
        ax2.annotate(vol_label,
                     xy=(date, vol),
                     xytext=(0, 5),
                     textcoords='offset points',
                     ha='center', fontsize=8, color='#555555')

    ax2.set_xlabel('Date', fontsize=11, color='#555555')
    ax2.set_ylabel('Volume', fontsize=11, color='#555555')
    ax2.xaxis.set_major_formatter(mdates.DateFormatter('%b %d\n%a'))
    ax2.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, p: f'{x/1e6:.0f}M' if x >= 1e6 else f'{x/1e3:.0f}K'))
    ax2.grid(True, alpha=0.3, linestyle='--', axis='y')
    ax2.set_facecolor('#fafafa')

    ax2.spines['top'].set_visible(False)
    ax2.spines['right'].set_visible(False)
    ax2.spines['left'].set_color('#cccccc')
    ax2.spines['bottom'].set_color('#cccccc')

    fig.patch.set_facecolor('white')
    plt.tight_layout()
    filepath = os.path.join(OUTPUT_DIR, 'nvidia_volume_chart.png')
    fig.savefig(filepath, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Volume chart saved: {filepath}")
    return filepath


def create_summary_dashboard(df):
    """Generate a comprehensive summary dashboard."""
    fig = plt.figure(figsize=(14, 10))

    # Create grid
    gs = fig.add_gridspec(3, 2, hspace=0.35, wspace=0.3)

    dates = df.index
    opens = df['Open'].values
    highs = df['High'].values
    lows = df['Low'].values
    closes = df['Close'].values
    volumes = df['Volume'].values

    # --- Panel 1: Price trend (top-left, spans 2 columns) ---
    ax1 = fig.add_subplot(gs[0, :])
    ax1.plot(dates, closes, color='#76b900', linewidth=2.5, marker='o',
             markersize=8, markerfacecolor='white', markeredgecolor='#76b900',
             markeredgewidth=2, zorder=5)
    ax1.fill_between(dates, closes, alpha=0.12, color='#76b900')

    for i, (date, price) in enumerate(zip(dates, closes)):
        ax1.annotate(f'${price:.2f}', xy=(date, price), xytext=(0, 12),
                     textcoords='offset points', ha='center', fontsize=9,
                     fontweight='bold', color='#333333')

    price_change = closes[-1] - closes[0]
    pct_change = (price_change / closes[0]) * 100
    change_symbol = '+' if price_change >= 0 else ''
    change_color = '#00c853' if price_change >= 0 else '#ff1744'

    ax1.set_title(f'NVIDIA (NVDA) Weekly Dashboard  |  '
                  f'Change: {change_symbol}${price_change:.2f} ({change_symbol}{pct_change:.2f}%)',
                  fontsize=13, fontweight='bold', color='#333333')
    ax1.set_ylabel('Close Price (USD)', fontsize=10)
    ax1.yaxis.set_major_formatter(mticker.FormatStrFormatter('$%.2f'))
    ax1.xaxis.set_major_formatter(mdates.DateFormatter('%b %d (%a)'))
    ax1.grid(True, alpha=0.3, linestyle='--')
    ax1.set_facecolor('#fafafa')
    y_margin = (closes.max() - closes.min()) * 0.2
    if y_margin == 0:
        y_margin = closes.max() * 0.02
    ax1.set_ylim(closes.min() - y_margin, closes.max() + y_margin)
    ax1.spines['top'].set_visible(False)
    ax1.spines['right'].set_visible(False)

    # --- Panel 2: Daily returns (middle-left) ---
    ax2 = fig.add_subplot(gs[1, 0])
    daily_returns = ((closes[1:] - closes[:-1]) / closes[:-1]) * 100
    return_dates = dates[1:]
    colors_ret = ['#00c853' if r >= 0 else '#ff1744' for r in daily_returns]
    bars = ax2.bar(range(len(return_dates)), daily_returns, color=colors_ret, alpha=0.8, width=0.6)

    for i, (bar, ret) in enumerate(zip(bars, daily_returns)):
        ax2.annotate(f'{ret:+.2f}%', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                     xytext=(0, 5 if ret >= 0 else -12),
                     textcoords='offset points', ha='center', fontsize=9, fontweight='bold')

    ax2.set_xticks(range(len(return_dates)))
    ax2.set_xticklabels([d.strftime('%b %d') for d in return_dates], fontsize=8)
    ax2.set_title('Daily Returns (%)', fontsize=11, fontweight='bold', color='#333333')
    ax2.set_ylabel('Return (%)', fontsize=10)
    ax2.axhline(y=0, color='#999999', linewidth=0.8, linestyle='-')
    ax2.grid(True, alpha=0.3, linestyle='--', axis='y')
    ax2.set_facecolor('#fafafa')
    ax2.spines['top'].set_visible(False)
    ax2.spines['right'].set_visible(False)

    # --- Panel 3: Volume (middle-right) ---
    ax3 = fig.add_subplot(gs[1, 1])
    vol_colors = ['#00c853' if closes[i] >= opens[i] else '#ff1744' for i in range(len(dates))]
    ax3.bar(range(len(dates)), volumes, color=vol_colors, alpha=0.7, width=0.6)

    for i, vol in enumerate(volumes):
        vol_label = f'{vol/1e6:.1f}M' if vol >= 1e6 else f'{vol/1e3:.0f}K'
        ax3.annotate(vol_label, xy=(i, vol), xytext=(0, 5),
                     textcoords='offset points', ha='center', fontsize=8, color='#555555')

    ax3.set_xticks(range(len(dates)))
    ax3.set_xticklabels([d.strftime('%b %d') for d in dates], fontsize=8)
    ax3.set_title('Trading Volume', fontsize=11, fontweight='bold', color='#333333')
    ax3.set_ylabel('Volume', fontsize=10)
    ax3.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, p: f'{x/1e6:.0f}M'))
    ax3.grid(True, alpha=0.3, linestyle='--', axis='y')
    ax3.set_facecolor('#fafafa')
    ax3.spines['top'].set_visible(False)
    ax3.spines['right'].set_visible(False)

    # --- Panel 4: High-Low range (bottom-left) ---
    ax4 = fig.add_subplot(gs[2, 0])
    for i in range(len(dates)):
        color = '#00c853' if closes[i] >= opens[i] else '#ff1744'
        ax4.plot([i, i], [lows[i], highs[i]], color=color, linewidth=3, solid_capstyle='round')
        ax4.plot(i, closes[i], 'o', color=color, markersize=6, zorder=5)

    ax4.set_xticks(range(len(dates)))
    ax4.set_xticklabels([d.strftime('%b %d') for d in dates], fontsize=8)
    ax4.set_title('Daily High-Low Range', fontsize=11, fontweight='bold', color='#333333')
    ax4.set_ylabel('Price (USD)', fontsize=10)
    ax4.yaxis.set_major_formatter(mticker.FormatStrFormatter('$%.2f'))
    ax4.grid(True, alpha=0.3, linestyle='--')
    ax4.set_facecolor('#fafafa')
    ax4.spines['top'].set_visible(False)
    ax4.spines['right'].set_visible(False)

    # --- Panel 5: Summary stats (bottom-right) ---
    ax5 = fig.add_subplot(gs[2, 1])
    ax5.axis('off')

    stats_text = (
        f"NVIDIA (NVDA) Weekly Summary\n"
        f"{'='*35}\n\n"
        f"Period: {dates[0].strftime('%b %d')} - {dates[-1].strftime('%b %d, %Y')}\n\n"
        f"Open:          ${opens[0]:.2f}\n"
        f"Close:         ${closes[-1]:.2f}\n"
        f"Week High:     ${highs.max():.2f}\n"
        f"Week Low:      ${lows.min():.2f}\n"
        f"Change:        {change_symbol}${price_change:.2f} ({change_symbol}{pct_change:.2f}%)\n"
        f"Avg Volume:    {volumes.mean()/1e6:.1f}M\n"
        f"Total Volume:  {volumes.sum()/1e6:.1f}M\n"
        f"Volatility:    ${(highs - lows).mean():.2f} avg range"
    )

    ax5.text(0.05, 0.95, stats_text, transform=ax5.transAxes,
             fontsize=10, verticalalignment='top', fontfamily='monospace',
             bbox=dict(boxstyle='round,pad=0.5', facecolor='#f0f0f0',
                       edgecolor='#cccccc', alpha=0.9))

    fig.patch.set_facecolor('white')
    fig.suptitle('', fontsize=0)  # Ensure no extra title

    plt.tight_layout()
    filepath = os.path.join(OUTPUT_DIR, 'nvidia_dashboard.png')
    fig.savefig(filepath, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Dashboard saved: {filepath}")
    return filepath


def main():
    print("=" * 60)
    print("  NVIDIA (NVDA) Stock Trend Chart Generator")
    print("  Generating charts for the last trading week...")
    print("=" * 60)
    print()

    # Fetch data
    df = fetch_nvidia_data()

    # Generate all charts
    print("\nGenerating charts...\n")
    files = []
    files.append(create_line_chart(df))
    files.append(create_candlestick_chart(df))
    files.append(create_volume_chart(df))
    files.append(create_summary_dashboard(df))

    print("\n" + "=" * 60)
    print("  All charts generated successfully!")
    print("=" * 60)
    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"\nGenerated files:")
    for f in files:
        size = os.path.getsize(f)
        print(f"  - {os.path.basename(f)} ({size/1024:.1f} KB)")
    print()


if __name__ == '__main__':
    main()
