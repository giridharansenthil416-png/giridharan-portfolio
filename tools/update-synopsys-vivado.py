import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/assets/skills', exist_ok=True)
os.makedirs('reference/skills-source', exist_ok=True)

# -------------------------------------------------------------------------
# 1. SYNOPSYS BADGE
# -------------------------------------------------------------------------
def make_synopsys():
    im = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Outer rounded badge with dark purple silicon matrix background
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(24, 8, 38, 255))
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, outline=(155, 45, 230, 220), width=16)
    
    # Inner subtle glow outline
    draw.rounded_rectangle([120, 120, 904, 904], radius=200, outline=(90, 25, 140, 150), width=8)
    
    # Background circuit / silicon chip texture grid blocks
    # Subtle purple and violet chip cells
    cell_data = [
        # (x, y, w, h, alpha, is_lit)
        (160, 200, 80, 50, 60, False), (260, 190, 120, 60, 120, True), (400, 210, 70, 40, 50, False),
        (490, 190, 110, 70, 90, False), (620, 200, 90, 50, 150, True), (730, 190, 130, 60, 80, False),
        (180, 280, 100, 60, 100, False), (300, 270, 90, 70, 70, False), (650, 270, 100, 70, 130, True),
        (160, 650, 110, 70, 100, True), (290, 660, 80, 50, 60, False), (390, 640, 120, 80, 120, False),
        (530, 650, 90, 60, 80, False), (640, 640, 110, 70, 160, True), (770, 660, 90, 50, 90, False),
        (200, 740, 140, 60, 70, False), (360, 740, 100, 50, 120, True), (620, 730, 130, 70, 90, False),
        (480, 740, 120, 60, 60, False), (770, 730, 90, 60, 110, True)
    ]
    
    for (x, y, w, h, a, is_lit) in cell_data:
        if is_lit:
            # Bright neon magenta/violet LED glow
            draw.rounded_rectangle([x, y, x+w, y+h], radius=10, fill=(185, 45, 255, a), outline=(230, 100, 255, 200), width=3)
        else:
            draw.rounded_rectangle([x, y, x+w, y+h], radius=8, fill=(55, 18, 85, a), outline=(95, 30, 145, 100), width=2)
            
    # Central chip platform
    draw.rounded_rectangle([200, 390, 824, 630], radius=40, fill=(35, 10, 58, 240), outline=(170, 50, 255, 180), width=6)
    
    # White SYNOPSYS typography
    font = ImageFont.truetype("arialbd.ttf", 96)
    text = "SYNOPSYS"
    
    # Text shadow / neon purple glow
    for off in [(-3,-3), (3,3), (-3,3), (3,-3), (0, -4), (0, 4), (-4, 0), (4, 0)]:
        draw.text((512 + off[0], 505 + off[1]), text, fill=(180, 40, 255, 160), font=font, anchor="mm")
        
    # Main crisp white text
    draw.text((512, 505), text, fill=(255, 255, 255, 255), font=font, anchor="mm")
    
    # Small registered trademark symbol (R)
    try:
        r_font = ImageFont.truetype("arialbd.ttf", 26)
        draw.text((795, 465), "®", fill=(255, 255, 255, 240), font=r_font, anchor="mm")
    except:
        pass

    # Bottom pill badge
    draw.rounded_rectangle([270, 790, 754, 860], radius=20, fill=(155, 45, 230, 255))
    try:
        sub_font = ImageFont.truetype("arialbd.ttf", 36)
        draw.text((512, 825), "EDA & SILICON", fill=(255, 255, 255, 255), font=sub_font, anchor="mm")
    except:
        pass
        
    out_512 = im.resize((512, 512), Image.Resampling.LANCZOS)
    pub_path = 'public/assets/skills/synopsys.png'
    ref_path = 'reference/skills-source/synopsys.png'
    out_512.save(pub_path, 'PNG')
    out_512.save(ref_path, 'PNG')
    print(f"Saved {pub_path} and {ref_path}")

# -------------------------------------------------------------------------
# 2. XILINX VIVADO (3-FACET PINWHEEL LOGO)
# -------------------------------------------------------------------------
def make_vivado():
    im = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Outer crisp card / rounded badge (clean white backdrop so the green/yellow facets pop)
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(255, 255, 255, 255))
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, outline=(225, 228, 232, 255), width=16)
    draw.rounded_rectangle([120, 120, 904, 904], radius=200, outline=(245, 246, 248, 255), width=8)
    
    # Center of pinwheel
    # The 3-facet pinwheel geometry:
    # 3 identical parallelograms arranged in 120-degree radial symmetry around a central equilateral triangle.
    # Colors:
    # Top facet: Chartreuse / Lime Green (#CFD44C / (207, 212, 76))
    # Left facet: Olive / Moss Green (#8B9114 / (139, 145, 20))
    # Bottom-Right facet: Light Yellow-Green (#E2E785 / (226, 231, 133))
    
    cx, cy = 512, 450
    # Coordinates calculated to match the exact facet geometry:
    # Triangle core vertices:
    # P1 (top-left of center): ~ (410, 400)
    # P2 (top-right of center): ~ (614, 400)
    # P3 (bottom of center): ~ (512, 576)
    
    # 1. Top Facet (Lime Green #CFD44C)
    top_poly = [
        (410, 400),
        (370, 100),
        (574, 100),
        (614, 400)
    ]
    draw.polygon(top_poly, fill=(207, 212, 76, 255))
    
    # 2. Left Facet (Olive Green #8B9114)
    left_poly = [
        (410, 400),
        (512, 576),
        (260, 722),
        (158, 545)
    ]
    draw.polygon(left_poly, fill=(139, 145, 20, 255))
    
    # 3. Bottom-Right Facet (Light Yellow-Green #E2E785)
    right_poly = [
        (614, 400),
        (512, 576),
        (764, 722),
        (866, 545)
    ]
    draw.polygon(right_poly, fill=(226, 231, 133, 255))
    
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
    print(f"Saved {pub_path} and {ref_path}")

make_synopsys()
make_vivado()
