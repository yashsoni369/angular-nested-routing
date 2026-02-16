from PIL import Image, ImageDraw
import xml.etree.ElementTree as ET

def parse_svg(path):
    tree = ET.parse(path)
    root = tree.getroot()
    w = int(float(root.get('width', '1000')))
    h = int(float(root.get('height', '420')))
    elems = []
    ns = {'svg':'http://www.w3.org/2000/svg'}
    for line in root.findall('svg:line', ns):
        elems.append(('line', {k:float(v) for k,v in line.attrib.items()}))
    for poly in root.findall('svg:polyline', ns):
        pts = [(float(x),float(y)) for x,y in (p.split(',') for p in poly.get('points').split(' '))]
        attrs = dict(poly.attrib)
        attrs['points']=pts
        elems.append(('polyline', attrs))
    for circ in root.findall('svg:circle', ns):
        attrs = dict(circ.attrib)
        elems.append(('circle', attrs))
    for rect in root.findall('svg:rect', ns):
        attrs = dict(rect.attrib)
        elems.append(('rect', attrs))
    return w,h,elems


def draw_svg(path,outpath,size=None):
    w,h,elems = parse_svg(path)
    if size:
        img = Image.new('RGBA', size, (255,255,255,255))
        scale_x = size[0]/w
        scale_y = size[1]/h
    else:
        img = Image.new('RGBA', (w,h), (255,255,255,255))
        scale_x=scale_y=1.0
    draw = ImageDraw.Draw(img)
    def sx(x): return x*scale_x
    def sy(y): return y*scale_y
    for t,attr in elems:
        if t=='rect' and 'fill' in attr:
            col = attr.get('fill','#fff')
            if col.startswith('#'):
                col = tuple(int(col[i:i+2],16) for i in (1,3,5))+(255,)
            else:
                col=(255,255,255,255)
            x = float(attr.get('x',0)); y=float(attr.get('y',0)); w0=float(attr.get('width', w)); h0=float(attr.get('height', h))
            draw.rectangle([sx(x),sy(y),sx(x+w0),sy(y+h0)],fill=col)
        if t=='line':
            x1,y1,x2,y2 = attr['x1'],attr['y1'],attr['x2'],attr['y2']
            col = attr.get('stroke','#000')
            if col.startswith('#'):
                col = tuple(int(col[i:i+2],16) for i in (1,3,5))+(255,)
            draw.line([sx(x1),sy(y1),sx(x2),sy(y2)],fill=col,width=int(float(attr.get('stroke-width',1))*scale_x))
        if t=='polyline':
            pts = attr['points']
            scaled = [(sx(x),sy(y)) for x,y in pts]
            col = attr.get('stroke','#000')
            if col.startswith('#'):
                col = tuple(int(col[i:i+2],16) for i in (1,3,5))+(255,)
            width = int(float(attr.get('stroke-width',2))*scale_x)
            draw.line(scaled,fill=col,width=width)
        if t=='circle':
            cx=float(attr.get('cx')); cy=float(attr.get('cy')); r=float(attr.get('r'))
            fill = attr.get('fill')
            if fill and fill.startswith('#'):
                col = tuple(int(fill[i:i+2],16) for i in (1,3,5))+(255,)
                draw.ellipse([sx(cx-r),sy(cy-r),sx(cx+r),sy(cy+r)],fill=col)
    img.convert('RGB').save(outpath,'PNG')

if __name__=='__main__':
    import sys
    paths = ['nvda_last_week.svg','nvda_last_week_thumb.svg']
    for p in paths:
        try:
            out = p.rsplit('.',1)[0]+'.png'
            if p.endswith('thumb.svg'):
                draw_svg(p,out,size=(300,126))
            else:
                draw_svg(p,out)
            print('WROTE',out)
        except Exception as e:
            print('FAILED',p,e)
