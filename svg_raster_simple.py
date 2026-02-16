from xml.etree import ElementTree as ET
from pure_png import write_png

def hex2rgb(h):
    if not h:
        return (0,0,0)
    if h.startswith('#'):
        # support short and long hex
        if len(h)==4:
            return tuple(int(h[i]*2,16) for i in (1,2,3))
        return tuple(int(h[i:i+2],16) for i in (1,3,5))
    return (0,0,0)


def parse_svg(path):
    root = ET.parse(path).getroot()
    w = int(float(root.get('width',1000)))
    h = int(float(root.get('height',420)))
    background=(255,255,255)
    lines=[]
    polylines=[]
    circles=[]
    for el in root:
        tag = el.tag.split('}')[-1]
        if tag=='rect' and el.get('fill'):
            background=hex2rgb(el.get('fill'))
        if tag=='line':
            lines.append((float(el.get('x1')),float(el.get('y1')),float(el.get('x2')),float(el.get('y2')),hex2rgb(el.get('stroke'))))
        if tag=='polyline':
            pts = [(float(x),float(y)) for x,y in (p.split(',') for p in el.get('points').split(' '))]
            polylines.append((pts,hex2rgb(el.get('stroke'))))
        if tag=='circle':
            circles.append((float(el.get('cx')),float(el.get('cy')),float(el.get('r')),hex2rgb(el.get('fill'))))
    return w,h,background,lines,polylines,circles


def draw_line(pixels,w,h,x1,y1,x2,y2,color):
    # Bresenham simple
    x1=int(round(x1)); y1=int(round(y1)); x2=int(round(x2)); y2=int(round(y2))
    dx=abs(x2-x1); sx=1 if x1<x2 else -1
    dy=-abs(y2-y1); sy=1 if y1<y2 else -1
    err=dx+dy
    while True:
        if 0<=x1<w and 0<=y1<h:
            idx=(y1*w + x1)*3
            pixels[idx:idx+3]=bytes(color)
        if x1==x2 and y1==y2: break
        e2=2*err
        if e2>=dy:
            err+=dy; x1+=sx
        if e2<=dx:
            err+=dx; y1+=sy


def draw_circle(pixels,w,h,cx,cy,r,color):
    cx=int(round(cx)); cy=int(round(cy)); r=int(round(r))
    for y in range(cy-r,cy+r+1):
        for x in range(cx-r,cx+r+1):
            if 0<=x<w and 0<=y<h:
                if (x-cx)**2+(y-cy)**2<=r*r:
                    idx=(y*w+x)*3
                    pixels[idx:idx+3]=bytes(color)


def raster(path,outpath,size=None):
    w,h,background,lines,polylines,circles=parse_svg(path)
    if size:
        W,H = size
        sx=W/w; sy=H/h
    else:
        W,H=w,h; sx=sy=1
    pixels = bytearray([background[0],background[1],background[2]]*(W*H))
    for x1,y1,x2,y2,col in lines:
        draw_line(pixels,W,H,x1*sx,y1*sy,x2*sx,y2*sy,col)
    for pts,col in polylines:
        for a,b in zip(pts,pts[1:]):
            draw_line(pixels,W,H,a[0]*sx,a[1]*sy,b[0]*sx,b[1]*sy,col)
    for cx,cy,r,col in circles:
        draw_circle(pixels,W,H,cx*sx,cy*sy,r*sx,col)
    write_png(outpath,W,H,pixels)

if __name__=='__main__':
    raster('nvda_last_week.svg','nvda_last_week.png')
    raster('nvda_last_week_thumb.svg','nvda_last_week_thumb.png',size=(300,126))
    print('WROTE nvda_last_week.png and thumb')
