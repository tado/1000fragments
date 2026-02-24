import os
import glob
import re
from collections import Counter

folder = "100fragments"
files = glob.glob(folder + "/*.frag")

keywords = Counter()

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        for match in re.finditer(r'\b(sin|cos|tan|abs|floor|fract|ceil|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|reflect|refract|pow|exp|log|sqrt|inversesqrt|noise|random|fbm|rotate2d|mat2|mat3|vec2|vec3|vec4|HSVtoRGB|fractal|sphere|box|sdf|raymarching)\b', content):
            keywords[match.group(1)] += 1

print("=== Keyword Usage ===")
for k, v in keywords.most_common(50):
    print(k + ": " + str(v))
