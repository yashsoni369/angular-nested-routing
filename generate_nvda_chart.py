#!/usr/bin/env python3
"""
Robust NVDA last-week chart generator.
Tries Yahoo (with headers), then Stooq, then synthetic fallback.
Generates `nvda_last_week.svg`, `nvda_last_week_thumb.svg`, and `nvda_last_week.json`.
No external Python packages required.
"""
import csv
import datetime
import time
import urllib.request
import urllib.error
import sys
import json
import random


def fetch_url(url, headers=None, timeout=20):
    req = urllib.request.Request(url, headers=(headers or {}))
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode('utf-8')


def fetch_csv_sources(ticker, period_days=7):
    now = datetime.datetime.utcnow()
    period2 = int(time.mktime(now.timetuple()))
    start = now - datetime.timedelta(days=period_days)
    period1 = int(time.mktime(start.timetuple()))
    urls = []
    # Yahoo
    urls.append((f"https://query1.finance.yahoo.com/v7/finance/download/{ticker}?period1={period1}&period2={period2}&interval=1d&events=history&includeAdjustedClose=true",
                 {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'}))
    # Stooq (uses lowercase symbol with .US)
    urls.append((f"https://stooq.com/q/d/l/?s={ticker.lower()}.us&i=d", {'User-Agent': 'curl/7.80.0'}))

    last_exc = None
    for url, headers in urls:
        try:
            print('Trying', url, file=sys.stderr)
            text = fetch_url(url, headers=headers)
            if text and 'Date' in text:
                return text
        except urllib.error.HTTPError as he:
            last_exc = he
            print('HTTPError', he.code, file=sys.stderr)
            if he.code == 429:
                # short backoff
                time.sleep(1)
        except Exception as e:
            last_exc = e
            print('Fetch exception', e, file=sys.stderr)
    if last_exc:
        raise last_exc
    raise RuntimeError('No sources returned CSV')


def parse_csv(csv_text):
    rows = list(csv.reader(csv_text.splitlines()))
    if not rows:
        return []
    header = rows[0]
    data = []
    try:
        idx_date = header.index('Date')
    except ValueError:
        idx_date = 0
    # try multiple possible close headers
    close_candidates = ['Close','close','Last']
    idx_close = None
    for c in close_candidates:
        if c in header:
            idx_close = header.index(c); break
    if idx_close is None:
        idx_close = 4
    for r in rows[1:]:
        if len(r) <= max(idx_date, idx_close):
            continue
        date_s = r[idx_date]
        close_s = r[idx_close]
        if close_s in ('', 'null', 'NaN'):
            continue
        try:
            dt = datetime.datetime.strptime(date_s, '%Y-%m-%d').date()
            close = float(close_s)
            data.append((dt, close))
        except Exception:
            continue
    return data


def synthetic_points(period_days=7, start_price=600.0):
    # Generate last N calendar days but keep weekdays only
    pts = []
    today = datetime.date.today()
    d = today - datetime.timedelta(days=period_days-1)
    price = start_price
    for i in range(period_days*2):
        cur = d + datetime.timedelta(days=i)
        if cur.weekday() >= 5:
            continue
        # small random walk
        change = random.uniform(-3.5, 3.5)
        price = max(1.0, price + change)
        pts.append((cur, round(price, 2)))
        if len(pts) >= 7:
            break
    return pts


def generate_svg(points, out_path, ticker, width=1000, height=420):
    margin = { 'left': 70, 'right': 30, 'top': 50, 'bottom': 80 }
    inner_w = width - margin['left'] - margin['right']
    inner_h = height - margin['top'] - margin['bottom']

    dates = [p[0] for p in points]
    vals = [p[1] for p in points]
    n = len(points)
    min_v = min(vals)
    max_v = max(vals)
    if max_v - min_v < 1e-6:
        max_v = min_v + 1.0

    def x_of(i):
        if n == 1:
            return margin['left'] + inner_w/2
        return margin['left'] + (i) * (inner_w / (n-1))
    def y_of(v):
        return margin['top'] + (max_v - v) / (max_v - min_v) * inner_h

    pts = [f"{x_of(i):.2f},{y_of(v):.2f}" for i,(d,v) in enumerate(points)]
    poly = ' '.join(pts)

    y_ticks = 5
    y_values = [min_v + (max_v-min_v) * i / (y_ticks-1) for i in range(y_ticks)]

    if n <=5:
        label_idx = list(range(n))
    else:
        label_idx = [0, n//4, n//2, (3*n)//4, n-1]
    label_idx = sorted(set(label_idx))

    svg_lines = []
    svg_lines.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">')
    svg_lines.append(f'<rect width="100%" height="100%" fill="#ffffff"/>')
    svg_lines.append(f'<text x="{width/2}" y="24" text-anchor="middle" font-family="sans-serif" font-size="16">{ticker} — Last {n} Days</text>')

    for i, yv in enumerate(y_values):
        y = y_of(yv)
        svg_lines.append(f'<line x1="{margin["left"]}" y1="{y:.2f}" x2="{width-margin["right"]}" y2="{y:.2f}" stroke="#f2f4f8" stroke-width="1"/>')
        svg_lines.append(f'<text x="{margin["left"]-10}" y="{y+4:.2f}" text-anchor="end" font-family="monospace" font-size="12">{yv:.2f}</text>')

    svg_lines.append(f'<line x1="{margin["left"]}" y1="{margin["top"]+inner_h}" x2="{width-margin["right"]}" y2="{margin["top"]+inner_h}" stroke="#000" stroke-width="1"/>')

    for i in label_idx:
        x = x_of(i)
        lbl = dates[i].strftime('%Y-%m-%d')
        svg_lines.append(f'<text x="{x:.2f}" y="{margin["top"]+inner_h+20}" text-anchor="middle" font-family="sans-serif" font-size="12">{lbl}</text>')
        svg_lines.append(f'<line x1="{x:.2f}" y1="{margin["top"]+inner_h}" x2="{x:.2f}" y2="{margin["top"]+inner_h+5}" stroke="#000" stroke-width="1"/>')

    svg_lines.append(f'<polyline points="{poly}" fill="none" stroke="#a0c4ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>')
    svg_lines.append(f'<polyline points="{poly}" fill="none" stroke="#0b66ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>')

    for i,(d,v) in enumerate(points):
        x = x_of(i); y = y_of(v)
        svg_lines.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="3.5" fill="#0b66ff"/>')

    last_x = x_of(n-1); last_y = y_of(vals[-1])
    svg_lines.append(f'<rect x="{last_x+8}" y="{last_y-12}" rx="4" ry="4" fill="#0b66ff" opacity="0.9"/>')
    svg_lines.append(f'<text x="{last_x+12}" y="{last_y+2}" font-family="sans-serif" font-size="12" fill="#fff">{vals[-1]:.2f}</text>')

    svg_lines.append('</svg>')

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(svg_lines))


def summarize(points, ticker):
    dates = [p[0].isoformat() for p in points]
    vals = [p[1] for p in points]
    summary = {
        'ticker': ticker,
        'start_date': dates[0] if dates else None,
        'end_date': dates[-1] if dates else None,
        'points': len(points),
        'min': min(vals) if vals else None,
        'max': max(vals) if vals else None,
        'first': vals[0] if vals else None,
        'last': vals[-1] if vals else None,
    }
    if summary['first'] is not None and summary['last'] is not None:
        try:
            summary['pct_change'] = (summary['last'] - summary['first'])/summary['first']*100.0
        except Exception:
            summary['pct_change'] = None
    return summary


def main():
    ticker = 'NVDA'
    try:
        csv_text = fetch_csv_sources(ticker, period_days=14)
        points = parse_csv(csv_text)
        # If source returned more than needed, take last 7 trading days
        points = sorted(points, key=lambda x: x[0])
        if len(points) > 7:
            points = points[-7:]
        if not points:
            raise RuntimeError('No parsed points')
        source = 'remote'
    except Exception as e:
        print('Remote fetch failed:', e, file=sys.stderr)
        print('Falling back to synthetic data', file=sys.stderr)
        points = synthetic_points(period_days=14, start_price=600.0)
        points = points[:7]
        source = 'synthetic'

    svg_path = 'nvda_last_week.svg'
    svg_thumb = 'nvda_last_week_thumb.svg'
    json_path = 'nvda_last_week.json'
    generate_svg(points, svg_path, ticker, width=1000, height=420)
    generate_svg(points, svg_thumb, ticker, width=600, height=260)
    summary = summarize(points, ticker)
    summary['source'] = source
    with open(json_path, 'w', encoding='utf-8') as jf:
        json.dump(summary, jf, indent=2)
    print('Wrote', svg_path, svg_thumb, json_path, file=sys.stderr)

if __name__ == '__main__':
    main()
