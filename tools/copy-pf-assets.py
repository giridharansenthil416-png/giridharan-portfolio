import os
import shutil

src_dir = r"C:\Users\girid\Documents\pf\assets"
dst_dir = "public/assets"

print("Scanning source directory:", src_dir)
if os.path.exists(src_dir):
    for root, dirs, files in os.walk(src_dir):
        rel = os.path.relpath(root, src_dir)
        target_sub = os.path.join(dst_dir, rel) if rel != "." else dst_dir
        os.makedirs(target_sub, exist_ok=True)
        for f in files:
            s_path = os.path.join(root, f)
            d_path = os.path.join(target_sub, f)
            shutil.copy2(s_path, d_path)
            print(f"Copied: {s_path} -> {d_path}")
else:
    print("Source directory not found!")
