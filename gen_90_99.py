import os
OUTPUT_DIR = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments"
def save(name, code):
    with open(os.path.join(OUTPUT_DIR, name + ".frag"), "w") as f: f.write(code)

