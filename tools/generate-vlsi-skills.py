import os
import math
import shutil
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/assets/skills', exist_ok=True)
os.makedirs('reference/skills-source', exist_ok=True)

def create_base(size=(1024, 1024)):
    return Image.new('RGBA', size, (0, 0, 0, 0))

def save_logo(img, filename):
    out_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    pub_path = os.path.join('public/assets/skills', filename)
    ref_path = os.path.join('reference/skills-source', filename)
    out_512.save(pub_path, 'PNG')
    out_512.save(ref_path, 'PNG')
    print(f"Saved {pub_path} and {ref_path}")

# -------------------------------------------------------------
# 1. SYNOPSYS
# -------------------------------------------------------------
def make_synopsys():
    im = create_base()
    draw = ImageDraw.Draw(im)
    cx, cy = 512, 512
    
    # Background rounded pill / shield
    # Synopsys signature purple is #5A2A82 / #4A1A70
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(90, 42, 130, 255))
    
    # Inner border / gloss highlight
    draw.rounded_rectangle([112, 112, 912, 912], radius=210, outline=(130, 75, 185, 200), width=12)
    
    # Synopsys geometric S symbol (white & vibrant lavender)
    # The Synopsys glyph consists of two interlocking dynamic quadrilaterals / angled facets
    # Top wing
    top_poly = [
        (320, 290),
        (704, 290),
        (560, 480),
        (260, 480)
    ]
    draw.polygon(top_poly, fill=(255, 255, 255, 255))
    
    # Bottom wing
    bot_poly = [
        (464, 544),
        (764, 544),
        (620, 734),
        (320, 734)
    ]
    draw.polygon(bot_poly, fill=(210, 180, 245, 255))
    
    # Central bridge diamond accent
    diamond = [
        (440, 512),
        (512, 420),
        (584, 512),
        (512, 604)
    ]
    draw.polygon(diamond, fill=(255, 255, 255, 255))

    # Bold Synopsys text pill
    draw.rounded_rectangle([250, 770, 774, 840], radius=20, fill=(38, 14, 60, 230))
    # We can draw stylized 'SYNOPSYS'
    try:
        font = ImageFont.truetype("arialbd.ttf", 46)
        draw.text((512, 805), "SYNOPSYS", fill=(255, 255, 255, 255), font=font, anchor="mm")
    except:
        pass
    
    save_logo(im, 'synopsys.png')

# -------------------------------------------------------------
# 2. CADENCE
# -------------------------------------------------------------
def make_cadence():
    im = create_base()
    draw = ImageDraw.Draw(im)
    cx, cy = 512, 512
    
    # Cadence dark slate / pure white badge
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(245, 245, 247, 255))
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, outline=(220, 220, 225, 255), width=16)
    
    # Cadence signature vibrant red logo (#E31B23)
    # The Cadence 'c' and multi-colored orbit arcs
    # Draw vibrant red square rounded emblem
    draw.rounded_rectangle([280, 260, 744, 724], radius=90, fill=(227, 27, 35, 255))
    
    # White stylized 'c' cut
    draw.arc([370, 350, 654, 634], start=45, end=315, fill=(255, 255, 255, 255), width=65)
    # End caps for smooth arc
    # Inner dot
    draw.ellipse([480, 460, 544, 524], fill=(255, 255, 255, 255))
    
    # Cadence text label
    try:
        font = ImageFont.truetype("arialbd.ttf", 52)
        draw.text((512, 800), "cadence", fill=(22, 22, 24, 255), font=font, anchor="mm")
    except:
        pass
        
    save_logo(im, 'cadence.png')

# -------------------------------------------------------------
# 3. VIVADO (AMD / XILINX)
# -------------------------------------------------------------
def make_vivado():
    im = create_base()
    draw = ImageDraw.Draw(im)
    
    # AMD / Xilinx dark carbon background
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(24, 24, 27, 255))
    draw.rounded_rectangle([110, 110, 914, 914], radius=210, outline=(237, 28, 36, 180), width=12)
    
    # Xilinx faceted diamond / Vivado symbol
    # Red (#EE1C25) and Ruby / Gold facets
    # Center diamond
    cx, cy = 512, 470
    r = 180
    
    # 4 crystal facets
    # Top
    draw.polygon([(cx, cy - r), (cx + r*0.7, cy - r*0.2), (cx, cy), (cx - r*0.7, cy - r*0.2)], fill=(238, 28, 37, 255))
    # Right
    draw.polygon([(cx + r*0.7, cy - r*0.2), (cx + r, cy + r*0.3), (cx, cy + r*0.8), (cx, cy)], fill=(195, 20, 28, 255))
    # Left
    draw.polygon([(cx - r*0.7, cy - r*0.2), (cx, cy), (cx, cy + r*0.8), (cx - r, cy + r*0.3)], fill=(255, 80, 88, 255))
    # Bottom point accent
    draw.polygon([(cx - r*0.35, cy + r*0.4), (cx, cy), (cx + r*0.35, cy + r*0.4), (cx, cy + r*0.8)], fill=(160, 12, 18, 255))
    
    # Vivado banner
    draw.rounded_rectangle([260, 755, 764, 835], radius=20, fill=(238, 28, 37, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 46)
        draw.text((512, 795), "AMD VIVADO", fill=(255, 255, 255, 255), font=font, anchor="mm")
    except:
        pass
        
    save_logo(im, 'vivado.png')

# -------------------------------------------------------------
# 4. VERILOG / SYSTEMVERILOG
# -------------------------------------------------------------
def make_verilog():
    im = create_base()
    draw = ImageDraw.Draw(im)
    
    # Deep navy / IC Silicon teal background
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(15, 30, 48, 255))
    draw.rounded_rectangle([112, 112, 912, 912], radius=210, outline=(0, 200, 180, 180), width=12)
    
    # Silicon IC Chip package in center
    cx, cy = 512, 460
    cw = 180
    
    # IC pins (gold/cyan traces extending outward)
    pins = [-120, -60, 0, 60, 120]
    for p in pins:
        # Left pins
        draw.line([(cx - cw - 60, cy + p), (cx - cw, cy + p)], fill=(0, 225, 200, 255), width=14)
        # Right pins
        draw.line([(cx + cw, cy + p), (cx + cw + 60, cy + p)], fill=(0, 225, 200, 255), width=14)
        # Top pins
        draw.line([(cx + p, cy - cw - 60), (cx + p, cy - cw)], fill=(0, 225, 200, 255), width=14)
        # Bottom pins
        draw.line([(cx + p, cy + cw), (cx + p, cy + cw + 60)], fill=(0, 225, 200, 255), width=14)
        
    # IC Body (Dark matte square)
    draw.rounded_rectangle([cx - cw, cy - cw, cx + cw, cy + cw], radius=30, fill=(24, 45, 70, 255), outline=(0, 225, 200, 255), width=10)
    # Chip pin 1 index notch
    draw.ellipse([cx - cw + 20, cy - cw + 20, cx - cw + 46, cy - cw + 46], fill=(0, 225, 200, 255))
    
    # Logic Gate / RTL wave symbol inside chip
    # AND / XOR gate outline inside
    draw.arc([cx - 80, cy - 80, cx + 50, cy + 80], start=270, end=90, fill=(255, 255, 255, 255), width=12)
    draw.line([(cx - 80, cy - 80), (cx - 15, cy - 80)], fill=(255, 255, 255, 255), width=12)
    draw.line([(cx - 80, cy + 80), (cx - 15, cy + 80)], fill=(255, 255, 255, 255), width=12)
    draw.line([(cx - 80, cy - 80), (cx - 80, cy + 80)], fill=(255, 255, 255, 255), width=12)
    draw.line([(cx + 50, cy), (cx + 100, cy)], fill=(255, 255, 255, 255), width=12)
    
    # Text badge
    draw.rounded_rectangle([240, 760, 784, 836], radius=20, fill=(0, 200, 180, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 44)
        draw.text((512, 798), "VERILOG HDL", fill=(12, 24, 38, 255), font=font, anchor="mm")
    except:
        pass
        
    save_logo(im, 'verilog.png')

# -------------------------------------------------------------
# 5. PYTHON
# -------------------------------------------------------------
def make_python():
    im = create_base()
    draw = ImageDraw.Draw(im)
    
    # Slate dark background
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(30, 36, 46, 255))
    draw.rounded_rectangle([112, 112, 912, 912], radius=210, outline=(55, 118, 171, 200), width=12)
    
    # Python logo colors: Blue (#3776AB) and Yellow (#FFD43B)
    cx, cy = 512, 460
    
    # Top / Left Blue Snake
    draw.rounded_rectangle([cx - 160, cy - 180, cx + 40, cy + 20], radius=60, fill=(55, 118, 171, 255))
    draw.rounded_rectangle([cx - 70, cy - 180, cx + 40, cy - 60], radius=40, fill=(55, 118, 171, 255))
    draw.rounded_rectangle([cx - 160, cy - 60, cx - 40, cy + 80], radius=40, fill=(55, 118, 171, 255))
    # Eye
    draw.ellipse([cx - 90, cy - 140, cx - 65, cy - 115], fill=(255, 255, 255, 255))
    
    # Bottom / Right Yellow Snake
    draw.rounded_rectangle([cx - 40, cy - 20, cx + 160, cy + 180], radius=60, fill=(255, 212, 59, 255))
    draw.rounded_rectangle([cx - 40, cy + 60, cx + 70, cy + 180], radius=40, fill=(255, 212, 59, 255))
    draw.rounded_rectangle([cx + 40, cy - 80, cx + 160, cy + 60], radius=40, fill=(255, 212, 59, 255))
    # Eye
    draw.ellipse([cx + 65, cy + 115, cx + 90, cy + 140], fill=(30, 36, 46, 255))
    
    # Python text banner
    draw.rounded_rectangle([280, 760, 744, 836], radius=20, fill=(55, 118, 171, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 46)
        draw.text((512, 798), "PYTHON", fill=(255, 255, 255, 255), font=font, anchor="mm")
    except:
        pass
        
    save_logo(im, 'python.png')

# -------------------------------------------------------------
# 6. LINUX / EDA WORKSTATION
# -------------------------------------------------------------
def make_linux():
    im = create_base()
    draw = ImageDraw.Draw(im)
    
    # Linux / Workstation background (#1A1A1A)
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(24, 24, 28, 255))
    draw.rounded_rectangle([112, 112, 912, 912], radius=210, outline=(245, 180, 0, 180), width=12)
    
    cx, cy = 512, 460
    # Penguin Tux body
    # Black body
    draw.ellipse([cx - 130, cy - 140, cx + 130, cy + 160], fill=(235, 235, 240, 255))
    draw.ellipse([cx - 150, cy - 130, cx - 70, cy + 100], fill=(20, 20, 22, 255))
    draw.ellipse([cx + 70, cy - 130, cx + 150, cy + 100], fill=(20, 20, 22, 255))
    draw.ellipse([cx - 120, cy - 170, cx + 120, cy - 20], fill=(20, 20, 22, 255))
    
    # White belly
    draw.ellipse([cx - 85, cy - 60, cx + 85, cy + 140], fill=(255, 255, 255, 255))
    # Eyes
    draw.ellipse([cx - 50, cy - 130, cx - 15, cy - 75], fill=(255, 255, 255, 255))
    draw.ellipse([cx + 15, cy - 130, cx + 50, cy - 75], fill=(255, 255, 255, 255))
    draw.ellipse([cx - 35, cy - 110, cx - 20, cy - 90], fill=(20, 20, 22, 255))
    draw.ellipse([cx + 20, cy - 110, cx + 35, cy - 90], fill=(20, 20, 22, 255))
    
    # Orange beak
    draw.polygon([(cx - 40, cy - 70), (cx + 40, cy - 70), (cx, cy - 25)], fill=(250, 175, 20, 255))
    # Orange feet
    draw.ellipse([cx - 110, cy + 130, cx - 20, cy + 175], fill=(250, 175, 20, 255))
    draw.ellipse([cx + 20, cy + 130, cx + 110, cy + 175], fill=(250, 175, 20, 255))
    
    # Banner
    draw.rounded_rectangle([260, 760, 764, 836], radius=20, fill=(250, 175, 20, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 44)
        draw.text((512, 798), "LINUX / EDA", fill=(20, 20, 22, 255), font=font, anchor="mm")
    except:
        pass
        
    save_logo(im, 'linux.png')

# -------------------------------------------------------------
# 7. FUSION COMPILER
# -------------------------------------------------------------
def make_fusion_compiler():
    im = create_base()
    draw = ImageDraw.Draw(im)
    
    # High-tech dark indigo badge
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(18, 16, 38, 255))
    draw.rounded_rectangle([112, 112, 912, 912], radius=210, outline=(147, 51, 234, 200), width=12)
    
    cx, cy = 512, 460
    # Core synthesis / place & route vortex icon
    for r, col in [(180, (147, 51, 234, 80)), (130, (99, 102, 241, 120)), (80, (236, 72, 153, 200))]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=col, width=14)
        
    # Intersecting golden RTL & Silicon pathways
    draw.line([(cx - 160, cy - 80), (cx, cy), (cx + 160, cy + 80)], fill=(255, 215, 0, 255), width=12)
    draw.line([(cx - 160, cy + 80), (cx, cy), (cx + 160, cy - 80)], fill=(0, 240, 255, 255), width=12)
    draw.ellipse([cx - 24, cy - 24, cx + 24, cy + 24], fill=(255, 255, 255, 255))
    
    # Banner
    draw.rounded_rectangle([200, 760, 824, 836], radius=20, fill=(147, 51, 234, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 40)
        draw.text((512, 798), "FUSION COMPILER", fill=(255, 255, 255, 255), font=font, anchor="mm")
    except:
        pass
        
    save_logo(im, 'fusion-compiler.png')

make_synopsys()
make_cadence()
make_vivado()
make_verilog()
make_python()
make_linux()
make_fusion_compiler()
print("All VLSI skill badges generated successfully!")
