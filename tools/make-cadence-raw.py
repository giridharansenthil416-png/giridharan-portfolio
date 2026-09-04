import os
from PIL import Image, ImageDraw, ImageFont

def make_cadence_raw():
    # 1200x400 transparent canvas
    im = Image.new('RGBA', (1200, 400), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    font = ImageFont.truetype("arialbd.ttf", 160)
    chars = ["c", "a", "d", "e", "n", "c", "e"]
    spacing = 24
    
    char_widths = [draw.textbbox((0, 0), ch, font=font)[2] - draw.textbbox((0, 0), ch, font=font)[0] for ch in chars]
    total_w = sum(char_widths) + spacing * (len(chars) - 1)
    
    start_x = (1200 - total_w) / 2
    cur_x = start_x
    y_text = 220
    
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

    bar_h = 28
    bar_y = a_y_top - 46
    bar_pad = 2
    draw.rectangle([a_x_start + bar_pad, bar_y, a_x_end - bar_pad, bar_y + bar_h], fill=(235, 15, 25, 255))
    
    im.save('reference/skills-source/cadence-wordmark.png', 'PNG')
    print("Saved reference/skills-source/cadence-wordmark.png")

make_cadence_raw()
