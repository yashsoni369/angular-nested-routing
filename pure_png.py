# Minimal PNG writer for RGB images (no compression libraries)
import struct,zlib

def write_png(path,w,h,pixels):
    # pixels: flat list of bytes length w*h*3
    def chunk(type,data):
        return struct.pack('>I',len(data))+type+data+struct.pack('>I',zlib.crc32(type+data)&0xffffffff)
    with open(path,'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(chunk(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0)))
        # IDAT: create raw scanlines
        raw = b''
        for y in range(h):
            raw += b'\x00' + bytes(pixels[y*w*3:(y+1)*3*w])
        comp = zlib.compress(raw)
        f.write(chunk(b'IDAT',comp))
        f.write(chunk(b'IEND',b''))
