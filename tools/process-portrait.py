import os
from PIL import Image, ImageFilter, ImageOps
import numpy as np

src_path = 'public/assets/giridharan.jpg'
src = Image.open(src_path).convert('RGB')
W, H = src.size
print(f"Loaded {src_path}: {W}x{H}")

# 1. Create avatar.webp (square crop of head and shoulders)
# Since the image is already a round/square portrait, save high-quality avatar.webp
avatar = src.resize((400, 400), Image.Resampling.LANCZOS)
avatar.save('public/assets/avatar.webp', 'WEBP', quality=95)
print("Saved public/assets/avatar.webp")

# 2. Also save as frame portrait
frame_img = src.resize((600, 600), Image.Resampling.LANCZOS)
frame_img.save('public/assets/giridharan-frame.jpg', 'JPEG', quality=95)
print("Saved public/assets/giridharan-frame.jpg")

# 3. Create transparent cutout for nameCutout
# The background in the image is off-white / light beige circle (#ded8cb - #eae6de) outside the circle it's white or transparent.
arr = np.array(src).astype(np.float32)

# Floodfill background from outer corners and outer circle
f = src.copy()
px = f.load()
SENT = (255, 0, 255)

# Find background pixels by color difference from corner/edge pixels
# Sample top-left, top-right, bottom-left corners
corners = [(10, 10), (W-10, 10), (10, H-10), (W-10, H-10), (W//2, 10)]
bg_color = np.array([240.0, 238.0, 230.0])

# Calculate distance to background color
diff = np.sqrt(np.sum((arr - bg_color)**2, axis=2))

# Also detect white background outside circle
is_white = np.all(arr > 245, axis=2)

# Create alpha mask: 0 for background, 255 for person
# Person has skin tones, dark hair, dark eyes, or white shirt
# White shirt has distinct saturation and boundary
alpha = np.ones((H, W), dtype=np.uint8) * 255

# Circular mask if image has circular border
center_x, center_y = W / 2.0, H / 2.0
radius = min(W, H) / 2.0 - 2.0
y_coords, x_coords = np.ogrid[:H, :W]
dist_from_center = np.sqrt((x_coords - center_x)**2 + (y_coords - center_y)**2)
outside_circle = dist_from_center > radius
alpha[outside_circle] = 0

# Extract cutout with smooth edge
cutout_rgba = src.convert('RGBA')
r, g, b = cutout_rgba.split()[:3]

# In the user image, the background inside the circle is a clean off-white / warm studio wall (approx 220-240 RGB)
# Skin and hair are distinct. White shirt is ~240-255 RGB.
# Let's perform precise color distance segmentation on top half (head/shoulders)
bg_region = (dist_from_center <= radius) & (arr[:, :, 0] > 200) & (arr[:, :, 1] > 195) & (arr[:, :, 2] > 185) & (abs(arr[:, :, 0] - arr[:, :, 1]) < 25) & (abs(arr[:, :, 1] - arr[:, :, 2]) < 25) & (y_coords < H * 0.55) & (np.abs(x_coords - center_x) > W * 0.22)

alpha[bg_region] = 0

# Mask out top corners background
alpha[(y_coords < H * 0.35) & (np.abs(x_coords - center_x) > W * 0.24)] = 0
alpha[(y_coords < H * 0.2) & (np.abs(x_coords - center_x) > W * 0.18)] = 0
alpha[(y_coords < H * 0.08)] = 0

# Smooth alpha
alpha_img = Image.fromarray(alpha, mode='L')
alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.2))

cutout_rgba.putalpha(alpha_img)
cutout_rgba.save('public/assets/name-cutout.webp', 'WEBP', quality=95)
print(f"Saved public/assets/name-cutout.webp ({W}x{H})")

# 4. Hero face image
face_crop = src.crop((int(W*0.15), int(H*0.05), int(W*0.85), int(H*0.75)))
face_crop.resize((300, 300), Image.Resampling.LANCZOS).save('public/assets/hero-face.png', 'PNG')
print("Saved public/assets/hero-face.png")
