import os
import urllib.request
import zipfile

target_dir = r"C:\Users\girid\AppData\Local\Programs\MinGit"
os.makedirs(target_dir, exist_ok=True)

zip_path = os.path.join(target_dir, "mingit.zip")
url = "https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/MinGit-2.44.0-64-bit.zip"

print(f"Downloading MinGit from {url}...")
urllib.request.urlretrieve(url, zip_path)
print("Downloaded MinGit zip. Extracting...")

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(target_dir)

print(f"Extracted to {target_dir}")
git_exe = os.path.join(target_dir, "cmd", "git.exe")
print(f"Git executable: {git_exe}, exists: {os.path.exists(git_exe)}")
