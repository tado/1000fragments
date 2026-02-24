import os
out = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments"
os.makedirs(out, exist_ok=True)
shaders = {}

# CAT 11: Polar/Radial (0100-0109)
for i in range(10):
    n = 3 + i
    freq = 4.0 + i * 2.0
    spd = 2.0 + i * 0.5
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float angle = atan(uv.y, uv.x);
    float r = length(uv);
    float fold = 3.14159 / {n}.0;
    angle = abs(mod(angle + time * 0.3, 2.0 * fold) - fold);
    float v = sin(angle * {freq:.1f} + r * {freq:.1f} - time * {spd:.1f}) * 0.5 + 0.5;
    v *= smoothstep(1.5, 0.1, r);
    float h = angle / fold + time * 0.1;
    float rc = sin(h * 3.14) * 0.5 + 0.5;
    float gc = sin(h * 3.14 + 2.094) * 0.5 + 0.5;
    float bc = sin(h * 3.14 + 4.189) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v * rc, v * gc, v * bc, 1.0));
}}"""
    shaders[f"{100+i:04d}"] = code

# CAT 12: Kaleidoscope (0110-0119)
for i in range(10):
    n = 4 + i * 2
    sc = 1.5 + i * 0.3
    sp = 0.5 + i * 0.1
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float angle = atan(uv.y, uv.x) + time * {sp:.2f};
    float r = length(uv);
    float seg = 3.14159 / {n}.0;
    angle = abs(mod(angle, 2.0 * seg) - seg);
    uv = vec2(cos(angle), sin(angle)) * r;
    float v = sin(uv.x * {sc:.1f} * 6.28 + time * 2.0) * sin(uv.y * {sc:.1f} * 6.28 + time * 1.7);
    v = v * 0.5 + 0.5;
    float v2 = sin((uv.x + uv.y) * {sc:.1f} * 4.0 - time * 3.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v2, 1.0 - v, 1.0));
}}"""
    shaders[f"{110+i:04d}"] = code

# CAT 13: Julia Set (0120-0129)
julia_c = [(-0.7,0.27),(-0.4,0.6),(0.285,0.01),(0.45,0.1428),(-0.7269,0.1889),
           (-0.8,0.156),(-0.6,0.5),(0.0,0.8),(0.3,-0.5),(-0.1,0.651)]
col_sets = [(1,0,0),(0,1,0),(0,0,1),(1,0.5,0),(0,0,1),(0.5,0.8,0),(1,0,0.5),(0,1,0.5),(0.2,0.8,1),(0.8,0.2,1)]
for i in range(10):
    cx, cy = julia_c[i]
    cr, cg, cb = col_sets[i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    uv *= 1.5;
    vec2 z = uv;
    vec2 c = vec2({cx:.4f} + sin(time * 0.1) * 0.05, {cy:.4f} + cos(time * 0.13) * 0.05);
    float iter = 0.0;
    for(int j = 0; j < 64; j++) {{
        if(dot(z,z) > 4.0) break;
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        iter += 1.0;
    }}
    float t = sqrt(iter / 64.0);
    fragColor = TDOutputSwizzle(vec4(t * {cr:.1f}, t * {cg:.1f}, t * {cb:.1f}, 1.0));
}}"""
    shaders[f"{120+i:04d}"] = code

# CAT 14: Metaballs (0130-0139)
for i in range(10):
    nb = 3 + i % 5
    thr = 1.5 + i * 0.1
    spd = 0.5 + i * 0.15
    cr,cg,cb = [(1,0.2,0.5),(0,1,0.5),(0,0.5,1),(1,0.8,0),(0,0.3,1),(1,0.5,0),(0.5,0,1),(1,0,0),(0,1,0.8),(0.8,0.5,0)][i]
    balls = "".join([f"    d += 0.3 / (length(uv - vec2(sin(time*{spd:.2f}+{b*2.1:.2f})*0.6, cos(time*{spd*0.8:.2f}+{b*1.7:.2f})*0.6)) + 0.001);\n" for b in range(nb)])
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float d = 0.0;
{balls}    float v = smoothstep({thr:.2f}, {thr+0.1:.2f}, d);
    fragColor = TDOutputSwizzle(vec4(v * {cr:.1f}, v * {cg:.1f}, v * {cb:.1f}, 1.0));
}}"""
    shaders[f"{130+i:04d}"] = code

# CAT 15: Lissajous (0140-0149)
ratios = [(1,2),(2,3),(3,4),(3,5),(4,5),(1,3),(2,5),(3,7),(1,4),(5,6)]
for i in range(10):
    a,b = ratios[i]
    phi = i * 0.3
    cr,cg,cb = [(1,0,0),(0,1,0),(0,0,1),(1,0.5,0),(0,0.5,1),(1,0,1),(0.5,1,0),(0,1,1),(1,0,0.5),(0.5,0,1)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float minD = 1.0;
    for(float t2 = 0.0; t2 < 6.283; t2 += 0.02) {{
        vec2 lp = vec2(sin({a:.1f} * t2 + time * 0.5), sin({b:.1f} * t2 + {phi:.2f} + time * 0.3));
        minD = min(minD, length(uv - lp));
    }}
    float v = 1.0 - smoothstep(0.0, 0.05, minD);
    v += 0.3 * (1.0 - smoothstep(0.0, 0.15, minD));
    fragColor = TDOutputSwizzle(vec4(v * {cr:.1f}, v * {cg:.1f}, v * {cb:.1f}, 1.0));
}}"""
    shaders[f"{140+i:04d}"] = code

# CAT 16: Plasma (0150-0159)
for i in range(10):
    f1 = 1.5 + i * 0.5; f2 = 2.0 + i * 0.3; spd = 1.0 + i * 0.3
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float v = sin(uv.x * {f1:.1f} * 6.28 + time * {spd:.1f})
            + sin(uv.y * {f2:.1f} * 6.28 + time * {spd*0.8:.1f})
            + sin((uv.x + uv.y) * {f1:.1f} * 6.28 + time * {spd*1.2:.1f})
            + sin(sqrt(uv.x*uv.x + uv.y*uv.y) * {f2:.1f} * 6.28 - time * {spd:.1f});
    v = v * 0.25 + 0.5;
    float hue = v + time * 0.1;
    fragColor = TDOutputSwizzle(vec4(sin(hue*6.28)*0.5+0.5, sin(hue*6.28+2.094)*0.5+0.5, sin(hue*6.28+4.189)*0.5+0.5, 1.0));
}}"""
    shaders[f"{150+i:04d}"] = code

# CAT 17: Water/Caustics (0160-0169)
for i in range(10):
    nl = 3 + i % 4; spd = 0.5 + i * 0.2; sc = 3.0 + i * 0.5
    waves = "".join([f"    wave += sin(dot(p, vec2(cos({k*1.2566:.4f}), sin({k*1.2566:.4f}))) * 6.28 + time * {spd*2:.1f}) / {nl}.0;\n" for k in range(nl)])
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 p = uv * {sc:.1f};
    float wave = 0.0;
{waves}    float bright = wave * 0.5 + 0.5;
    float spec = pow(max(0.0, wave), 4.0);
    fragColor = TDOutputSwizzle(vec4(bright*0.1+spec*0.8, bright*0.4+spec*0.9, bright*0.7+spec, 1.0));
}}"""
    shaders[f"{160+i:04d}"] = code

# CAT 18: Spirals (0170-0179)
for i in range(10):
    freq = 3.0 + i * 1.5; spd = 1.0 + i * 0.5; arms = 1 + i % 4
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    float spiral = angle + r * {freq:.1f} - time * {spd:.1f};
    float v = sin(spiral * {arms:.1f}) * 0.5 + 0.5;
    v *= smoothstep(1.8, 0.0, r);
    float ring = sin(r * {freq:.1f} * 2.0 - time * {spd:.1f}) * 0.5 + 0.5;
    float hue = angle / 6.283 + time * 0.05;
    fragColor = TDOutputSwizzle(vec4((v+ring*0.3)*(sin(hue*6.28)*0.5+0.5), (v+ring*0.3)*(sin(hue*6.28+2.094)*0.5+0.5), (v+ring*0.3)*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}}"""
    shaders[f"{170+i:04d}"] = code

# CAT 19: Glitch (0180-0189)
for i in range(10):
    strength = 0.05 + i * 0.02; spd = 5.0 + i * 3.0
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float rnd(float x) {{ return fract(sin(x * 127.1) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float band = floor(uv.y * 50.0);
    float t2 = floor(time * {spd:.1f});
    float offset = (rnd(band + t2) - 0.5) * {strength:.3f} * step(0.9, rnd(band * 0.1 + t2 * 0.1));
    float r = sin((uv.x + offset * 2.0) * 20.0 + time) * 0.5 + 0.5;
    float g = sin((uv.x + offset) * 20.0 + time * 1.1 + 1.0) * 0.5 + 0.5;
    float b = sin((uv.x - offset) * 20.0 + time * 0.9 + 2.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}}"""
    shaders[f"{180+i:04d}"] = code

# CAT 20: Matrix Rain (0190-0199)
for i in range(10):
    cols = 20 + i * 5; spd = 0.5 + i * 0.3
    cr,cg,cb = [(0,1,0),(0,0.8,0),(0,0.5,0),(0.2,1,0.2),(0,1,0.3),(0,0.7,0.5),(0.1,1,0),(0,1,0.1),(0.3,0.9,0),(0,0.6,0)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float rnd2(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float col = floor(uv.x * {cols}.0);
    float spd2 = {spd:.2f} + rnd2(vec2(col, 0.0)) * {spd:.2f};
    float stream = fract(uv.y - time * spd2 + rnd2(vec2(col, 1.0)));
    float bright = pow(1.0 - stream, 6.0);
    float head = step(0.97, 1.0 - stream);
    fragColor = TDOutputSwizzle(vec4(bright*{cr:.1f}+head, bright*{cg:.1f}+head, bright*{cb:.1f}, 1.0));
}}"""
    shaders[f"{190+i:04d}"] = code

# CAT 21: Organic Blobs (0200-0209)
for i in range(10):
    nb = 3 + i % 4; spd = 0.3 + i * 0.1; sc = 2.0 + i * 0.3
    cr,cg,cb = [(1,0.2,0.5),(0,1,0.5),(0,0.5,1),(1,0.8,0),(0,0.3,1),(1,0.5,0),(0.5,0,1),(1,0,0),(0,1,0.8),(0.8,0.5,0)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float d = 0.0;
    for(float j=0.0; j<{nb}.0; j++) {{
        vec2 center = vec2(sin(time*{spd:.2f}+j*2.1)*0.6, cos(time*{spd*0.8:.2f}+j*1.7)*0.6);
        float nd = noise(uv*{sc:.1f}+center+time*0.1)*0.3;
        d += smoothstep(0.5+nd, 0.3+nd, length(uv-center));
    }}
    float v = smoothstep(0.0, 1.0, d);
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{200+i:04d}"] = code

# CAT 22: Fire (0210-0219)
for i in range(10):
    spd = 0.8 + i * 0.2; sc = 3.0 + i * 0.5
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
float fbm(vec2 p) {{ float v=0.0,a=0.5; for(int k=0;k<5;k++){{v+=a*noise(p);p*=2.0;a*=0.5;}} return v; }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 p = uv * {sc:.1f};
    p.y -= time * {spd:.2f};
    float f = fbm(p + vec2(fbm(p+vec2(fbm(p),0.0))*0.3, 0.0));
    f = f * (1.5 - uv.y * 1.5);
    fragColor = TDOutputSwizzle(vec4(smoothstep(0.0,0.5,f), smoothstep(0.3,0.8,f)*0.5, smoothstep(0.7,1.0,f)*0.2, 1.0));
}}"""
    shaders[f"{210+i:04d}"] = code

# CAT 23: Stars (0220-0229)
for i in range(10):
    density = 50.0 + i * 20.0; nlayers = 2 + i % 3; spd = 0.05 + i * 0.02
    cr,cg,cb = [(1,0.9,1),(0.8,0.9,1),(1,0.8,0.8),(0.9,1,0.9),(0.8,0.8,1),(1,1,0.8),(0.9,0.8,1),(0.8,1,1),(1,0.9,0.8),(0.9,0.9,1)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec3 col = vec3(0.0, 0.0, 0.05);
    for(float layer=0.0; layer<{nlayers}.0; layer++) {{
        float scale = {density:.1f} * (layer+1.0);
        vec2 p2 = uv * scale + vec2(time * {spd:.3f} * (layer+1.0), 0.0);
        vec2 cell = floor(p2); vec2 fr = fract(p2) - 0.5;
        float b = hash(cell + layer * 13.7);
        b = pow(b, 6.0);
        float star = b / (length(fr) * 80.0 + 0.1) * 0.02;
        col += star * (0.8 + 0.2*sin(time*3.0+hash(cell)*6.28)) * vec3({cr:.1f},{cg:.1f},{cb:.1f}) / (layer+1.0);
    }}
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{220+i:04d}"] = code

# CAT 24: Neon Lines (0230-0239)
for i in range(10):
    nl = 3 + i % 4
    cr,cg,cb = [(0,1,1),(1,0,1),(1,1,0),(0,0.5,1),(1,0.5,0),(0.5,0,1),(0,1,0.5),(1,0,0.5),(0.5,1,0),(0,0.5,0.5)][i]
    lines = "".join([f"    v += 0.005 / abs(cos({k*0.5+i*0.3:.3f}) * (uv.y - {0.1*k-0.15:.2f}) - sin({k*0.5+i*0.3:.3f}) * uv.x + sin(time * {0.5+k*0.2:.1f}) * 0.3);\n" for k in range(nl)])
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float v = 0.0;
{lines}    v = min(v, 3.0);
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{230+i:04d}"] = code

# CAT 25: Mandala (0240-0249)
for i in range(10):
    n = 6 + i * 2; rings = 3 + i % 4; spd = 0.2 + i * 0.05
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float r = length(uv);
    float angle = atan(uv.y, uv.x) + time * {spd:.2f};
    float seg = 3.14159 / {n}.0;
    angle = abs(mod(angle, 2.0 * seg) - seg);
    float pattern = sin(angle * {n}.0 * 2.0) * sin(r * {rings:.1f} * 6.28 - time * 2.0);
    float ring2 = sin(r * {rings*2:.1f} * 3.14) * 0.5 + 0.5;
    float v = (pattern * 0.5 + 0.5) * ring2 * smoothstep(1.5, 0.1, r);
    float hue = angle / seg * 0.5 + r * 0.3 + time * 0.05;
    fragColor = TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}}"""
    shaders[f"{240+i:04d}"] = code

# CAT 26: SDF Raymarching (0250-0259)
sdfs = [
    "float sdf = length(p3) - 0.5;",
    "float sdf = length(max(abs(p3)-vec3(0.3),0.0));",
    "vec2 q=vec2(length(p3.xz)-0.4,p3.y); float sdf=length(q)-0.15;",
    "float sdf = length(p3.xz) - 0.3;",
    "float sdf = (abs(p3.x)+abs(p3.y)+abs(p3.z))/1.732 - 0.5;",
    "float sdf = length(p3) - 0.4 - sin(time*2.0)*0.1;",
    "vec3 d3=abs(p3)-vec3(0.25); float sdf=length(max(d3,0.0))+min(max(d3.x,max(d3.y,d3.z)),0.0)-0.05;",
    "vec3 pa=p3-vec3(0,0.3,0); vec3 ba=vec3(0,-0.6,0); float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0); float sdf=length(pa-ba*h)-0.15;",
    "float sdf=min(length(p3)-0.5, length(p3-vec3(0.3,0,0))-0.3);",
    "vec2 q2=vec2(length(p3.xy)-0.3,p3.z); float sdf=length(q2)-0.1;",
]
for i in range(10):
    cr,cg,cb = [(1,0.5,0),(0.5,0.8,1),(1,0.3,0.5),(0.3,1,0.6),(0.9,0.5,1),(1,0.6,0.2),(0.4,0.9,1),(0.8,0.3,1),(0.3,1,0.9),(1,0.9,0.3)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 ro = vec3(0.0, 0.0, 2.0);
    vec3 rd = normalize(vec3(uv, -1.5));
    float ct=cos(time*0.5), st=sin(time*0.5);
    float dist = 0.0; vec3 col = vec3(0.0);
    for(int step2=0; step2<64; step2++) {{
        vec3 p3 = ro + rd * dist;
        p3 = vec3(ct*p3.x-st*p3.z, p3.y, st*p3.x+ct*p3.z);
        {sdfs[i]}
        if(sdf < 0.001) {{
            vec3 e = vec3(0.001,0,0);
            vec3 p3b = ro+rd*dist; p3b=vec3(ct*p3b.x-st*p3b.z,p3b.y,st*p3b.x+ct*p3b.z);
            float nx=length(p3b+e.xyy)-length(p3b-e.xyy);
            float ny=length(p3b+e.yxy)-length(p3b-e.yxy);
            float nz=length(p3b+e.yyx)-length(p3b-e.yyx);
            vec3 n=normalize(vec3(nx,ny,nz));
            float diff=dot(n,normalize(vec3(1,1,1)))*0.5+0.5;
            col=vec3({cr:.1f},{cg:.1f},{cb:.1f})*diff; break;
        }}
        dist += sdf; if(dist>5.0) break;
    }}
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{250+i:04d}"] = code

# CAT 27: Truchet (0260-0269)
for i in range(10):
    grid = 4.0 + i * 2.0; spd = 0.3 + i * 0.1; thick = 0.08 + i * 0.01
    cr,cg,cb = [(1,0.5,0),(0,1,0.5),(0.5,0,1),(0.8,0.8,0),(0,0.5,0.8),(1,0,0.5),(0.5,1,0),(0,0.5,1),(1,0,0),(0,1,0)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 grid2 = uv * {grid:.1f};
    vec2 cell = floor(grid2 + time * {spd:.2f} * vec2(1,0));
    vec2 fr = fract(grid2 + time * {spd:.2f} * vec2(1,0));
    float orient = step(0.5, hash(cell));
    vec2 p2 = orient > 0.5 ? fr : vec2(fr.x, 1.0-fr.y);
    float d = min(abs(length(p2)-0.5), abs(length(p2-vec2(1))-0.5));
    float v = smoothstep({thick:.3f}, 0.0, d);
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{260+i:04d}"] = code

# CAT 28: Flow Fields (0270-0279)
for i in range(10):
    sc = 2.0 + i * 0.5; spd = 0.3 + i * 0.1
    cr,cg,cb = [(0,0.5,1),(0.2,0.8,0.5),(0.8,0.3,0),(0.5,0,0.8),(0,0.8,0.8),(1,0.5,0),(0,0.4,0.8),(0.8,0,0.4),(0.4,0.9,0),(0,0.6,0.4)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float a1 = noise(uv*{sc:.1f}+time*{spd:.2f})*6.283;
    float a2 = noise(uv*{sc:.1f}+vec2(5.2,1.3)+time*{spd*0.7:.2f})*6.283;
    float v2 = noise(uv+vec2(cos(a1),sin(a1))*0.3+time*{spd*0.5:.2f});
    float stripe = sin(v2 * 20.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(stripe*{cr:.1f}, stripe*{cg:.1f}+(sin(a1)*0.5+0.5)*0.3, stripe*{cb:.1f}, 1.0));
}}"""
    shaders[f"{270+i:04d}"] = code

# CAT 29: Rose Curves (0280-0289)
rose_params = [(2,1),(3,1),(4,1),(5,1),(6,1),(2,3),(3,5),(4,3),(5,7),(6,5)]
for i in range(10):
    k,d = rose_params[i]; spd = 0.2 + i * 0.05
    cr,cg,cb = [(1,0,0),(0,1,0),(0,0,1),(1,0.5,0),(0,0.5,1),(1,0,1),(0.5,1,0),(0,1,1),(1,0,0.5),(0.5,0,1)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float minD = 1.0;
    for(float t2=0.0; t2<6.2832; t2+=0.015) {{
        float r2 = cos({k}.0/{d}.0*(t2+time*{spd:.3f}));
        minD = min(minD, length(uv - vec2(cos(t2),sin(t2))*r2));
    }}
    float v = 1.0 - smoothstep(0.0, 0.04, minD);
    float glow = 0.3*(1.0-smoothstep(0.0, 0.15, minD));
    fragColor = TDOutputSwizzle(vec4((v+glow)*{cr:.1f}, (v+glow)*{cg:.1f}, (v+glow)*{cb:.1f}, 1.0));
}}"""
    shaders[f"{280+i:04d}"] = code

# CAT 30: Aurora (0290-0299)
for i in range(10):
    sc = 2.0 + i * 0.4; spd = 0.08 + i * 0.02; h = 0.4 + i * 0.05
    r1,g1,b1 = [(0.1,0.9,0.4),(0.2,0.8,0.9),(0.3,0.7,0.3),(0.0,0.6,0.8),(0.1,1.0,0.6),(0.4,0.5,0.8),(0.2,0.9,0.5),(0.0,0.8,0.7),(0.3,0.6,0.9),(0.1,0.7,0.4)][i]
    r2,g2,b2 = [(0.4,0.3,0.9),(0.3,0.5,0.8),(0.5,0.7,0.5),(0.5,0.6,0.9),(0.3,0.2,0.8),(0.6,0.4,0.7),(0.4,0.8,0.3),(0.6,0.4,0.9),(0.5,0.3,0.7),(0.8,0.5,0.6)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
float fbm(vec2 p) {{ float v=0.0,a=0.5; for(int k=0;k<4;k++){{v+=a*noise(p);p*=2.1;a*=0.5;}} return v; }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float n = fbm(vec2(uv.x*{sc:.1f}+time*{spd:.3f}, time*{spd*0.5:.4f}));
    float n2 = fbm(vec2(uv.x*{sc*0.7:.1f}-time*{spd*0.6:.3f}+5.0, time*{spd*0.3:.4f}+3.0));
    float band = uv.y - {h:.2f} + n * 0.3;
    float band2 = uv.y - {h-0.15:.2f} + n2 * 0.25;
    float a1 = exp(-band*band*25.0)*(0.5+0.5*n);
    float a2 = exp(-band2*band2*35.0)*(0.4+0.4*n2);
    vec3 col = a1*vec3({r1:.2f},{g1:.2f},{b1:.2f}) + a2*vec3({r2:.2f},{g2:.2f},{b2:.2f});
    col += a1*a1*vec3(0.5,1.0,0.8)*0.4;
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{290+i:04d}"] = code

# Write files
for key, code in shaders.items():
    with open(f"{out}/{key}.frag", "w") as f:
        f.write(code)
print(f"Written {len(shaders)} shaders (0100-0399)")
