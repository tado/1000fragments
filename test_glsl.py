import urllib.request
import os
import zipfile
import tarfile
import subprocess
import sys

URL = "https://github.com/KhronosGroup/glslang/releases/download/master-tot/glslang-master-windows-x64-Release.zip"
ZIP_PATH = "glslang.zip"
EXTRACT_DIR = "glslang_bin"

def download_and_extract():
    if not os.path.exists(EXTRACT_DIR):
        print(f"Downloading {URL}...")
        urllib.request.urlretrieve(URL, ZIP_PATH)
        print("Extracting...")
        with zipfile.ZipFile(ZIP_PATH, 'r') as zip_ref:
            zip_ref.extractall(EXTRACT_DIR)
        print("Done.")

def test_shaders():
    validator = os.path.join(EXTRACT_DIR, "bin", "glslangValidator.exe")
    if not os.path.exists(validator):
        print(f"Error: Could not find {validator}")
        return

    shader_dir = "1000fragments-gemini"
    files = [f for f in os.listdir(shader_dir) if f.endswith(".frag")]
    
    errors = 0
    print(f"Testing {len(files)} shaders...")
    for f in files:
        filepath = os.path.join(shader_dir, f)
        # TouchDesigner uses specific injects, but let's just do a basic syntax check
        # We need to prepend a fake TDOutputSwizzle if it complains, or just use a dummy define
        
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        test_content = "#version 330
#define TDOutputSwizzle(x) x
" + content
        test_file = "temp_test.frag"
        with open(test_file, 'w', encoding='utf-8') as file:
            file.write(test_content)
            
        result = subprocess.run([validator, test_file], capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error in {f}:
{result.stdout}")
            errors += 1
            if errors > 5:
                print("Too many errors. Stopping.")
                break
                
    if os.path.exists("temp_test.frag"):
        os.remove("temp_test.frag")
        
    print(f"Finished testing. Found {errors} failing shaders.")

if __name__ == "__main__":
    download_and_extract()
    test_shaders()
