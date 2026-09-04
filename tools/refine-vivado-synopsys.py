import os
import math
from PIL import Image, ImageDraw, ImageFont

def make_refined_vivado():
    im = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Outer rounded card
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(255, 255, 255, 255))
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, outline=(225, 228, 232, 255), width=16)
    draw.rounded_rectangle([120, 120, 904, 904], radius=200, outline=(245, 246, 248, 255), width=8)
    
    # Vivado 3-facet origami pinwheel
    # Colors:
    # 1. Top facet (Lime/Chartreuse): #D0D44D (208, 212, 77)
    # 2. Left facet (Olive): #8C9118 (140, 145, 24)
    # 3. Bottom-Right facet (Pastel yellow-green): #E3E884 (227, 232, 132)
    
    # Center & scale
    # Central triangle vertices:
    # Equilateral triangle with horizontal base at bottom or top?
    # In reference:
    # Left edge of triangle is vertical!
    # Top-right is apex or horizontal top?
    # Looking at the user's reference image:
    # Left edge is vertical from (380, 420) down to (380, 700) -> attached to left olive facet!
    # Slanted top edge goes from (380, 420) to (680, 570) -> attached to top lime facet!
    # Slanted bottom edge goes from (380, 700) to (680, 570) -> attached to bottom-right facet!
    # Let's inspect the 3 vertices:
    # V1 (left-top): (380, 420)
    # V2 (left-bottom): (380, 680)
    # V3 (right-apex): (640, 520)
    
    # Let's check the facets attached to each of the 3 edges:
    # 1. Left edge [V1 -> V2]: Olive green facet attached to left
    # Outer corners: (380, 420), (380, 680), (140, 880), (140, 620)
    # 2. Top edge [V1 -> V3]: Lime green facet attached to top-right
    # Outer corners: (380, 420), (640, 520), (590, 200), (330, 100)
    # 3. Bottom edge [V2 -> V3]: Pale yellow facet attached to bottom-right
    # Outer corners: (380, 680), (640, 520), (920, 680), (660, 840)
    
    # Let's scale and center within (512, 440)
    # Scale factor ~0.82
    def trans(pts, scale=0.78, ox=512, oy=430):
        # original center ~ (480, 490)
        cx0, cy0 = 490, 490
        res = []
        for x, y in pts:
            nx = ox + (x - cx0) * scale
            ny = oy + (y - cy0) * scale
            res.append((nx, ny))
        return res

    top_poly_raw = [(380, 420), (640, 520), (590, 200), (330, 100)]
    left_poly_raw = [(380, 420), (380, 680), (140, 880), (140, 620)]
    right_poly_raw = [(380, 680), (640, 520), (920, 680), (660, 840)]

    draw.polygon(trans(top_poly_raw), fill=(208, 212, 77, 255))
    draw.polygon(trans(left_poly_raw), fill=(140, 145, 24, 255))
    draw.polygon(trans(right_poly_raw), fill=(227, 232, 132, 255))

    # Bottom title banner
    draw.rounded_rectangle([250, 785, 774, 860], radius=20, fill=(24, 28, 34, 255))
    try:
        sub_font = ImageFont.truetype("arialbd.ttf", 38)
        draw.text((512, 822), "XILINX VIVADO", fill=(255, 255, 255, 255), font=sub_font, anchor="mm")
    except:
        pass

    out_512 = im.resize((512, 512), Image.Resampling.LANCZOS)
    pub_path = 'public/assets/skills/vivado.png'
    ref_path = 'reference/skills-source/vivado.png'
    out_512.save(pub_path, 'PNG')
    out_512.save(ref_path, 'PNG')
    print(f"Saved refined {pub_path}")

make_refined_vivado()
