import os
from PIL import Image

os.makedirs('public/assets/projects', exist_ok=True)

# 1. Studio 01 - Desk setup
img1_path = 'reference/studio-source/WhatsApp Image 2026-08-21 at 8.47.02 PM.jpeg'
if os.path.exists(img1_path):
    im1 = Image.open(img1_path).convert('RGB')
    im1.save('public/assets/projects/studio-01.webp', 'WEBP', quality=92)
    print("Saved studio-01.webp")

# 2. Studio 02 - VLSI Workstation & Layout
img2_path = 'reference/studio-source/Gemini_Generated_Image_m9jimvm9jimvm9ji.png'
if os.path.exists(img2_path):
    im2 = Image.open(img2_path).convert('RGB')
    im2.save('public/assets/projects/studio-02.webp', 'WEBP', quality=92)
    print("Saved studio-02.webp")

# 3. Studio 03 - Engineering Work
img3_path = 'reference/studio-source/WhatsApp Image 2026-08-21 at 8.47.03 PM (1).jpeg'
if os.path.exists(img3_path):
    im3 = Image.open(img3_path).convert('RGB')
    im3.save('public/assets/projects/studio-03.webp', 'WEBP', quality=92)
    print("Saved studio-03.webp")

print("All studio images processed successfully!")
