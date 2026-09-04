import os
from PIL import Image, ImageDraw, ImageFont

def make_cadence_badge():
    # 1024x1024 high-res canvas
    im = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Outer rounded badge (clean warm white / crisp light paper card)
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, fill=(255, 255, 255, 255))
    draw.rounded_rectangle([100, 100, 924, 924], radius=220, outline=(225, 225, 230, 255), width=16)
    
    # Inner subtle border
    draw.rounded_rectangle([120, 120, 904, 904], radius=200, outline=(245, 245, 248, 255), width=8)
    
    # Let's render the cadence text in bold sans-serif font
    # Try finding system fonts or draw cleanly
    font_path = "arialbd.ttf"
    try:
        font = ImageFont.truetype(font_path, 138)
    except:
        font = ImageFont.load_default()
        
    # The word is "cadence"
    # In official Cadence logo:
    # "c", "a", "d", "e", "n", "c", "e"
    # With a bold red bar over the "a"
    
    # We can measure individual character positions to place the red bar precisely over 'a'
    # Base text center
    y_text = 520
    
    # Let's draw with spaced tracking like the official logo
    chars = ["c", "a", "d", "e", "n", "c", "e"]
    spacing = 18 # tracking
    
    # Calculate widths
    char_widths = [draw.textbbox((0, 0), ch, font=font)[2] - draw.textbbox((0, 0), ch, font=font)[0] for ch in chars]
    total_w = sum(char_widths) + spacing * (len(chars) - 1)
    
    start_x = (1024 - total_w) / 2
    cur_x = start_x
    
    a_x_start = 0
    a_x_end = 0
    a_y_top = 0
    
    for i, ch in enumerate(chars):
        bbox = draw.textbbox((cur_x, y_text), ch, font=font, anchor="lm")
        draw.text((cur_x, y_text), ch, fill=(0, 0, 0, 255), font=font, anchor="lm")
        
        if ch == 'a' and i == 1:
            a_x_start = bbox[0]
            a_x_end = bbox[2]
            a_y_top = bbox[1]
            
        cur_x += char_widths[i] + spacing

    # Draw the distinctive Cadence red macron bar above 'a'
    # Red bar color: #e31b23 / #ff1020
    bar_h = 24
    bar_y = a_y_top - 42
    bar_pad = 2
    draw.rectangle([a_x_start + bar_pad, bar_y, a_x_end - bar_pad, bar_y + bar_h], fill=(235, 15, 25, 255))
    
    # Add a subtitle pill at the bottom
    draw.rounded_rectangle([270, 770, 754, 846], radius=20, fill=(240, 242, 245, 255))
    try:
        sub_font = ImageFont.truetype("arialbd.ttf", 36)
        draw.text((512, 808), "EDA & DIGITAL", fill=(70, 70, 75, 255), font=sub_font, anchor="mm")
    except:
        pass

    out_512 = im.resize((512, 512), Image.Resampling.LANCZOS)
    pub_path = 'public/assets/skills/cadence.png'
    ref_path = 'reference/skills-source/cadence.png'
    out_512.save(pub_path, 'PNG')
    out_512.save(ref_path, 'PNG')
    print(f"Updated {pub_path} and {ref_path}")

make_cadence_badge()
