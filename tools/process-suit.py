import os
from PIL import Image, ImageFilter
import numpy as np

src_path = r'C:\Users\girid\.gemini\antigravity-ide\brain\93fdaf53-2f4f-4811-a083-57fc5f8d0cc8\giridharan_suit_fullbody_1788109888598.jpg'
src = Image.open(src_path).convert('RGB')
W, H = src.size
print(f"Loaded generated fullbody image: {W}x{H}")

# 1. Save full body image for the Section 02 Frame
src.save('public/assets/giridharan-suit.jpg', 'JPEG', quality=95)
print("Saved public/assets/giridharan-suit.jpg")

# 2. Extract transparent background for cutout
# The background is a clean grey gradient (~190-220 RGB)
arr = np.array(src).astype(np.float32)

# Background mask based on color distance from solid background at corners
# Sample corners
bg_sample = arr[20, 20]
diff = np.sqrt(np.sum((arr - bg_sample)**2, axis=2))

# Flood from background corners
f = src.copy()
SENT = (255, 0, 255)
from PIL import ImageDraw
for pt in [(10, 10), (W-10, 10), (10, H-10), (W-10, H-10), (10, H//2), (W-10, H//2), (W//2, 10)]:
    try:
        ImageDraw.floodfill(f, pt, SENT, thresh=22)
    except Exception as e:
        pass

flooded = np.array(f)
is_bg = np.all(flooded == SENT, axis=2)

alpha = np.ones((H, W), dtype=np.uint8) * 255
alpha[is_bg] = 0

# Also check grey neutral background around subject
is_neutral_grey = (np.abs(arr[:,:,0] - arr[:,:,1]) < 8) & (np.abs(arr[:,:,1] - arr[:,:,2]) < 8) & (arr[:,:,0] > 180) & (arr[:,:,1] > 180) & (arr[:,:,2] > 180)
# Only apply near edges or outside subject bounding box
y_coords, x_coords = np.ogrid[:H, :W]
edge_dist = np.minimum(np.minimum(x_coords, W - x_coords), np.minimum(y_coords, H - y_coords))
alpha[is_neutral_grey & (edge_dist < W * 0.45)] = 0

# Crop upper body for the poster cutout (from top of hair down to mid-thigh/hips)
cutout_rgba = src.convert('RGBA')
alpha_img = Image.fromarray(alpha, mode='L')
alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.0))
cutout_rgba.putalpha(alpha_img)

# Crop to upper body / torso for the name cutout so it sits boldly on the poster
crop_box = (int(W*0.1), int(H*0.02), int(W*0.9), int(H*0.62))
cutout_upper = cutout_rgba.crop(crop_box)
cutout_upper.save('public/assets/name-cutout.webp', 'WEBP', quality=95)
print(f"Saved public/assets/name-cutout.webp size {cutout_upper.size}")

# 3. Avatar (Head & shoulders crop)
head_box = (int(W*0.25), int(H*0.03), int(W*0.75), int(H*0.32))
avatar_crop = src.crop(head_box)
avatar_crop = avatar_crop.resize((400, 400), Image.Resampling.LANCZOS)
avatar_crop.save('public/assets/avatar.webp', 'WEBP', quality=95)
print("Saved public/assets/avatar.webp")
