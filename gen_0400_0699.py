import os
out = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments"
os.makedirs(out, exist_ok=True)
shaders = {}

# CAT 31: Electric/Lightning (0400-0409)
for i in range(10):
    spd = 10.0 + i * 5.0; nb = 3 + i % 4
    cr,cg,cb = [(0.6,0.7,1),(0.8,0.9,1),(1,1,1),(0.5,0.6,1),(0.7,0.8,1),(1,0.9,0.8),(0.4,0.5,1),(0.9,1,1),(0.6,0.7,1),(0.8,0.8,0.9)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(float x) {{ return fract(sin(x * 127.1) * 43758.5); }}
float hash2(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float v = 0.0; float t2 = floor(time * {spd:.1f});
    for(float j=0.0; j<{nb}.0; j++) {{
        vec2 a = vec2(hash(j*3.1+t2)-0.5, -1.0)*1.5;
        vec2 b = vec2(hash(j*7.3+t2+1.0)-0.5, 1.0)*1.5;
        vec2 dir = b-a; float len = length(dir); vec2 dn = dir/len;
        vec2 perp = vec2(-dn.y, dn.x);
        float t3 = clamp(dot(uv-a, dn)/len, 0.0, 1.0);
        float wobble = hash2(vec2(floor(t3*12.0), j+t2))*0.3-0.15;
        float d2 = abs(dot(uv-a-dn*t3*len, perp)-wobble);
        v += 0.003/(d2+0.001);
    }}
    float flicker = step(0.85, hash(t2*0.1))*(0.5+0.5*hash(t2));
    v = min(v*(0.5+flicker), 5.0);
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{400+i:04d}"] = code

# CAT 32: Smoke/Fog (0410-0419)
for i in range(10):
    spd = 0.05 + i * 0.02; sc = 2.0 + i * 0.4
    cr,cg,cb = [(0.7,0.7,0.8),(0.6,0.7,0.9),(0.5,0.6,0.8),(0.7,0.8,1),(0.4,0.5,0.7),(0.6,0.7,0.9),(0.8,0.7,0.6),(0.5,0.6,0.8),(0.6,0.7,0.8),(0.7,0.6,0.5)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
float fbm(vec2 p) {{ float v=0.0,a=0.5; for(int k=0;k<6;k++){{v+=a*noise(p);p*=2.0;a*=0.5;}} return v; }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 p = uv*{sc:.1f}+vec2(time*{spd:.3f}, time*{spd*0.3:.3f});
    float f = fbm(p+fbm(p+fbm(p)*0.5)*0.5);
    f = smoothstep(0.3, 0.8, f);
    fragColor = TDOutputSwizzle(vec4(f*{cr:.1f}, f*{cg:.1f}, f*{cb:.1f}, 1.0));
}}"""
    shaders[f"{410+i:04d}"] = code

# CAT 33: Ocean Waves (0420-0429)
for i in range(10):
    nw = 3 + i % 4; spd = 0.5 + i * 0.15
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float height = 0.0;
    for(float j=0.0; j<{nw}.0; j++) {{
        float freq = 1.5 + j*1.2; float amp = 0.15/(j+1.0);
        float ang = j*0.7;
        height += amp*sin(uv.x*freq*6.28*cos(ang)+uv.y*freq*6.28*sin(ang)+time*({spd:.2f}+j*0.1));
        height += amp*0.3*cos(uv.x*freq*2.0*6.28+time*({spd:.2f}+j*0.1)*1.3);
    }}
    float depth = uv.y - 0.5 - height;
    vec3 col = mix(vec3(0.9,0.95,1.0), mix(vec3(0.1,0.6,0.7), vec3(0.0,0.15,0.4), smoothstep(0.0,0.5,-depth+0.5)), smoothstep(-0.1,0.1,depth));
    col += pow(max(0.0,height+0.5),4.0)*0.5;
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{420+i:04d}"] = code

# CAT 34: Neon Grid City (0430-0439)
for i in range(10):
    spd = 0.3 + i * 0.15; grid = 0.05 + i * 0.01
    cr,cg,cb = [(0,1,1),(1,0,1),(0,1,0),(1,1,0),(0,0.5,1),(1,0.5,0),(0,1,0.5),(0.5,0,1),(1,0,0.5),(0.5,1,0)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 pos = (gl_FragCoord.xy/resolution.xy) - 0.5;
    vec3 p3 = vec3(pos.x, 0.4, pos.y+0.1);
    vec2 s = vec2(p3.x/p3.z, p3.y/p3.z)*0.15 + vec2(time*{spd:.2f}, 0.0);
    float gx = abs(mod(s.x, {grid:.3f})-{grid*0.5:.4f});
    float gy = abs(mod(s.y, {grid:.3f})-{grid*0.5:.4f});
    float line2 = (1.0-smoothstep(0.0,0.003,min(gx,gy)))*clamp(p3.z*p3.z*5.0,0.0,1.0);
    float glow = exp(-min(gx,gy)*200.0)*0.3;
    fragColor = TDOutputSwizzle(vec4((line2+glow)*{cr:.1f}, (line2+glow)*{cg:.1f}, (line2+glow)*{cb:.1f}, 1.0));
}}"""
    shaders[f"{430+i:04d}"] = code

# CAT 35: Hexagonal (0440-0449)
for i in range(10):
    sc = 3.0 + i * 1.0; spd = 0.5 + i * 0.2
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 p = uv * {sc:.1f};
    vec2 a = mod(p, vec2(1.0, 0.866)) - vec2(0.5, 0.433);
    vec2 b = mod(p + vec2(0.5, 0.433), vec2(1.0, 0.866)) - vec2(0.5, 0.433);
    vec2 gv = dot(a,a) < dot(b,b) ? a : b;
    float cell = hash(floor(p - gv));
    float pulse = sin(time*{spd:.2f}*3.14+cell*6.28)*0.5+0.5;
    float d = length(gv);
    float v = (1.0-smoothstep(0.35,0.45,d))*pulse;
    float hue = cell + time*0.05;
    fragColor = TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}}"""
    shaders[f"{440+i:04d}"] = code

# CAT 36: Interference Rings (0450-0459)
for i in range(10):
    ns = 2 + i % 3; freq = 20.0 + i * 5.0; spd = 3.0 + i * 1.0
    cr,cg,cb = [(1,0.3,0),(0,1,0.3),(0,0.3,1),(1,0.8,0),(0,0,1),(0.5,0.8,0),(0.3,0.7,1),(1,0,0.3),(0,0.5,0.3),(1,0.5,1)][i]
    srcs = "".join([f"    v += sin(length(uv-vec2({-0.5+s*0.5:.2f},{0.3-s*0.2:.2f}))*{freq:.1f}-time*{spd:.1f})*0.5;\n" for s in range(ns)])
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float v = 0.0;
{srcs}    v = v/{ns}.0 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{450+i:04d}"] = code

# CAT 37: Hypercube (0460-0469)
for i in range(10):
    spd = 0.3 + i * 0.1
    cr,cg,cb = [(0,0.5,1),(1,0,0.5),(0.5,1,0),(0,1,1),(1,1,0),(0.3,0.8,1),(1,0.5,0.5),(0.5,0,1),(0,0.8,0.5),(1,0.8,0)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float t2=time*{spd:.2f};
    float c1=cos(t2),s1=sin(t2),c2=cos(t2*1.3),s2=sin(t2*1.3),c3=cos(t2*0.7),s3=sin(t2*0.7);
    float v = 0.0;
    for(float j=0.0; j<16.0; j++) {{
        float b0=mod(j,2.0),b1=mod(floor(j/2.0),2.0),b2=mod(floor(j/4.0),2.0),b3=mod(floor(j/8.0),2.0);
        vec4 p4=vec4(b0*2.0-1.0,b1*2.0-1.0,b2*2.0-1.0,b3*2.0-1.0);
        float rx=c1*p4.x-s1*p4.w, rw=s1*p4.x+c1*p4.w;
        float ry=c2*p4.y-s2*p4.z, rz=s2*p4.y+c2*p4.z;
        float w3=1.0/(rw+3.0);
        v += 0.005/length(uv-vec2(rx,ry)*w3);
    }}
    v = min(v, 5.0);
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{460+i:04d}"] = code

# CAT 38: Chaos Map (0470-0479)
for i in range(10):
    spd = 0.05 + i * 0.02; iters = 10 + i * 5
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float r2 = 2.5 + uv.x * 1.5 + sin(time * {spd:.3f}) * 0.5;
    float x = uv.y;
    for(int j=0; j<{iters}; j++) x = r2*x*(1.0-x);
    float diff = abs(x - uv.y);
    float v = 1.0-smoothstep(0.0,0.002,diff);
    float hue = uv.x + time*0.03;
    fragColor = TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}}"""
    shaders[f"{470+i:04d}"] = code

# CAT 39: Slit-scan (0480-0489)
for i in range(10):
    delay = 0.5 + i * 0.3; spd = 1.0 + i * 0.5; sc = 3.0 + i * 1.0
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
    float slitT = time - uv.x * {delay:.2f};
    float v = noise(vec2(uv.x*{sc:.1f}, slitT*{spd:.2f}))*0.5 + sin(uv.x*{sc:.1f}*2.0+slitT*3.0)*0.3 + 0.5;
    float r = sin(v*6.28+time*0.5)*0.5+0.5;
    float g = sin(v*6.28+2.094+time*0.4)*0.5+0.5;
    float b = sin(v*6.28+4.189+time*0.3)*0.5+0.5;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}}"""
    shaders[f"{480+i:04d}"] = code

# CAT 40: Phosphene (0490-0499)
for i in range(10):
    nc = 5 + i * 3; spd = 0.2 + i * 0.1
    cr,cg,cb = [(1,0.3,0),(0,1,0.3),(0,0.3,1),(1,0.8,0),(0,0,1),(0.5,1,0),(0.3,0.7,1),(1,0,0.3),(0,0.5,0.3),(1,0.5,1)][i]
    circles = "".join([f"    v += (1.0-smoothstep({0.08+c%3*0.04:.2f}-0.01,{0.08+c%3*0.04:.2f}+0.01,length(uv-vec2({(c%5)*0.4-1.0:.2f}+sin(time*{spd:.2f}+{c:.1f})*0.1,{c//5*0.4-0.4:.2f}+cos(time*{spd*0.8:.2f}+{c:.1f})*0.1))))*(sin(time*{spd*3:.2f}+{c:.1f})*0.5+0.5);\n" for c in range(nc)])
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float v = 0.0;
{circles}    v = min(v, 2.0);
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{490+i:04d}"] = code

# CAT 41: Textile/Weave (0500-0509)
for i in range(10):
    freq = 10.0 + i * 5.0
    cr,cg,cb = [(0.8,0.4,0.2),(0.6,0.5,0.3),(0.3,0.7,0.5),(0.9,0.3,0.1),(0.5,0.8,0.4),(0.7,0.2,0.6),(0.4,0.6,0.8),(0.8,0.5,0.2),(0.6,0.3,0.5),(0.3,0.7,0.4)][i]
    cr2,cg2,cb2 = 1.0-cr,1.0-cg,1.0-cb
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float xf = floor(uv.x*{freq:.1f}); float yf = floor(uv.y*{freq:.1f});
    float xfr = fract(uv.x*{freq:.1f}); float yfr = fract(uv.y*{freq:.1f});
    float over = mod(xf+yf, 2.0);
    float warp = over>0.5 ? sin(xfr*3.14159) : cos(yfr*3.14159);
    warp = smoothstep(0.3,0.7,warp*0.5+0.5);
    float shift = sin(time*0.3+xf*0.1+yf*0.1)*0.5+0.5;
    vec3 col = mix(vec3({cr:.2f},{cg:.2f},{cb:.2f}), vec3({cr2:.2f},{cg2:.2f},{cb2:.2f}), warp*shift);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{500+i:04d}"] = code

# CAT 42: Blueprint (0510-0519)
for i in range(10):
    grid = 0.05 + i * 0.01
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec3 bg = vec3(0.05, 0.08, 0.2);
    float gx = abs(mod(uv.x+time*0.02,{grid:.3f})-{grid*0.5:.4f});
    float gy = abs(mod(uv.y,{grid:.3f})-{grid*0.5:.4f});
    float gx2 = abs(mod(uv.x+time*0.02,{grid*5:.3f})-{grid*2.5:.4f});
    float gy2 = abs(mod(uv.y,{grid*5:.3f})-{grid*2.5:.4f});
    float gridLine = 1.0-smoothstep(0.0,0.002,min(gx,gy));
    float majorLine = (1.0-smoothstep(0.0,0.003,min(gx2,gy2)))*2.0;
    vec2 center = vec2(0.5*resolution.x/resolution.y+sin(time*0.2)*0.1, 0.5);
    float circle = abs(length(uv-center)-0.2);
    float circ = 1.0-smoothstep(0.0,0.003,circle);
    float crossLine = 1.0-smoothstep(0.0,0.002,min(abs(uv.x-center.x),abs(uv.y-center.y)));
    vec3 col = bg+(gridLine*0.15+majorLine*0.3+circ+crossLine*0.5)*vec3(0.5,0.7,1.0);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{510+i:04d}"] = code

# CAT 43: Constellation (0520-0529)
for i in range(10):
    ns = 20 + i * 5; spd = 0.02 + i * 0.01
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(float n) {{ return fract(sin(n * 127.1) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec3 col = vec3(0.0, 0.0, 0.05);
    for(int j=0; j<{ns}; j++) {{
        float jf=float(j);
        vec2 pos=vec2(hash(jf*3.1+0.1), hash(jf*7.3+0.2));
        pos.x += sin(time*{spd:.4f}+jf)*0.05;
        pos.y += cos(time*{spd*0.7:.4f}+jf*1.3)*0.05;
        float b=hash(jf*13.7+0.5);
        col += b/(length(uv-pos)*200.0+0.1)*0.1*b*vec3(0.8,0.9,1.0);
        if(j<{ns-3}) {{
            float kf=float(j+3);
            vec2 pos2=vec2(hash(kf*3.1+0.1),hash(kf*7.3+0.2));
            pos2.x+=sin(time*{spd:.4f}+kf)*0.05;
            if(length(pos2-pos)<0.15) {{
                vec2 ld=normalize(pos2-pos); vec2 lp=vec2(-ld.y,ld.x);
                float al=dot(uv-pos,ld); float ac=abs(dot(uv-pos,lp));
                if(al>0.0&&al<length(pos2-pos)) col+=0.001/(ac+0.001)*0.3*vec3(0.6,0.7,0.9);
            }}
        }}
    }}
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{520+i:04d}"] = code

# CAT 44: Cosmic Nebula (0530-0539)
for i in range(10):
    spd = 0.02 + i * 0.005; sc = 2.0 + i * 0.3
    cols = [(0.8,0.3,1),(0.3,0.5,1),(1,0.4,0.2),(0.4,1,0.6),(0.9,0.2,0.5),(0.2,0.8,1),(1,0.6,0.1),(0.5,0.3,1),(0.2,1,0.8),(1,0.3,0.6)]
    cr,cg,cb = cols[i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
float fbm(vec2 p) {{ float v=0.0,a=0.5; for(int k=0;k<6;k++){{v+=a*noise(p);p*=2.05;a*=0.5;}} return v; }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 p = uv*{sc:.1f}+time*{spd:.4f};
    float f1=fbm(p); float f2=fbm(p+vec2(f1,f1*0.5)+vec2(3.7,1.4));
    float f3=fbm(p+vec2(f2,f1)+vec2(7.1,2.3));
    vec3 col=vec3(f1*{cr:.2f},f2*{cg:.2f},f3*{cb:.2f});
    float star=pow(hash(floor(uv*80.0)),12.0)*3.0/(length(fract(uv*80.0)-0.5)*50.0+0.1)*0.05;
    col+=star*vec3(1.0,0.9,0.8);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{530+i:04d}"] = code

# CAT 45: DNA Helix (0540-0549)
for i in range(10):
    freq = 3.0 + i * 0.5; spd = 1.0 + i * 0.3
    cr,cg,cb = [(1,0,0),(0,1,0),(0,0,1),(1,0.5,0),(0,0.5,1),(0.5,0,1),(1,0,0.5),(0.8,0.2,0),(0.2,1,0),(0,0.8,1)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float s1y = sin(uv.x*{freq:.1f}*3.14+time*{spd:.1f})*0.4;
    float s2y = sin(uv.x*{freq:.1f}*3.14+time*{spd:.1f}+3.14159)*0.4;
    float d1=abs(uv.y-s1y); float d2=abs(uv.y-s2y);
    float v1=1.0-smoothstep(0.0,0.04,d1); float v2=1.0-smoothstep(0.0,0.04,d2);
    float rungs=0.0;
    for(float j=0.0; j<8.0; j++) {{
        float rx=-1.0+j*0.28+mod(time*{spd*0.1:.2f},0.28);
        float ry1=sin(rx*{freq:.1f}*3.14+time*{spd:.1f})*0.4;
        float ry2=sin(rx*{freq:.1f}*3.14+time*{spd:.1f}+3.14159)*0.4;
        rungs+=(1.0-smoothstep(0.0,0.015,abs(uv.x-rx)))*smoothstep(abs(ry2-ry1)*0.5+0.01,abs(ry2-ry1)*0.5,abs(uv.y-(ry1+ry2)*0.5))*0.5;
    }}
    float v=v1+v2+rungs;
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}+v1*0.5, v*{cg:.1f}+v2*0.5, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{540+i:04d}"] = code

# CAT 46-50: Magnetic, Quantum, Abstract, Vortex, Stained Glass (0550-0599)
for i in range(10):
    spd = 0.3 + i * 0.1
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 field = vec2(0.0);
    for(float j=0.0; j<{2+i%3}.0; j++) {{
        vec2 pos=vec2(sin(time*{spd:.2f}+j*2.094)*0.5, cos(time*{spd*0.7:.2f}+j*2.094)*0.3);
        float sign2=j<{1+i%3}.0?1.0:-1.0;
        vec2 diff=uv-pos; float r2=dot(diff,diff)+0.01;
        field+=sign2*diff/(r2*r2);
    }}
    float ang=atan(field.y,field.x);
    float mag=log(length(field)+1.0)*0.3;
    float line2=abs(fract(ang/6.283*12.0)*2.0-1.0);
    float v=line2*mag;
    float hue=ang/6.283+0.5+time*0.05;
    fragColor = TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}}"""
    shaders[f"{550+i:04d}"] = code

for i in range(10):
    k = 5.0 + i * 2.0; omega = 2.0 + i * 0.5; ns = 1 + i % 3
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float psi = 0.0;
    for(float j=0.0; j<{ns}.0; j++) {{
        vec2 src=vec2(sin(j*2.094)*0.5, cos(j*2.094)*0.3);
        float r2=length(uv-src);
        psi+=exp(-r2*0.5)*sin({k:.1f}*r2-{omega:.1f}*time+j*1.5);
    }}
    float prob=psi*psi;
    fragColor = TDOutputSwizzle(vec4(smoothstep(0.3,0.9,prob), smoothstep(0.1,0.6,prob)*0.5, 1.0-smoothstep(0.0,0.4,prob)+smoothstep(0.7,1.0,prob)*0.5, 1.0));
}}"""
    shaders[f"{560+i:04d}"] = code

for i in range(10):
    spd = 0.2 + i * 0.08; sc = 2.0 + i * 0.5
    cr,cg,cb = [(1,0.2,0),(0,0.8,0.5),(0,0.5,1),(1,0.5,0),(0.5,0,1),(0,0.8,0.2),(1,0,0.5),(0.3,1,0),(0.8,0.2,1),(0,0.7,0.3)][i]
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
    float n1=noise(uv*{sc:.1f}+time*{spd:.3f}), n2=noise(uv*{sc*2:.1f}+vec2(3.0,5.0)+time*{spd*0.7:.3f}), n3=noise(vec2(n1,n2)*4.0+time*{spd*0.3:.3f});
    float stroke=step(0.5,n3)*n1; float accent=pow(n2,3.0)*3.0;
    fragColor = TDOutputSwizzle(vec4(stroke*{cr:.1f}+accent*(1.0-{cr:.1f})+n1*0.2, stroke*{cg:.1f}+accent*(1.0-{cg:.1f})*0.5+n1*0.2, stroke*{cb:.1f}+accent*(1.0-{cb:.1f})*0.3+n1*0.3, 1.0));
}}"""
    shaders[f"{570+i:04d}"] = code

for i in range(10):
    spd = 1.0 + i * 0.4; tight = 3.0 + i * 0.5
    cr,cg,cb = [(1,0.3,0),(0,1,0.5),(0,0.5,1),(0.8,0.2,0.5),(1,0.8,0),(0,0.6,1),(0.5,0,0.8),(1,0.5,0.3),(0.3,0.8,0),(0.7,0.4,0.9)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float r=length(uv); float angle=atan(uv.y,uv.x);
    float swirl=angle+{tight:.1f}/(r+0.1)-time*{spd:.2f};
    float v=sin(swirl*4.0)*0.5+0.5;
    v*=smoothstep(0.0,0.1,r)*smoothstep(1.8,0.8,r);
    float glow=exp(-r*2.0)*(sin(time*{spd:.2f}*2.0)*0.5+0.5);
    v+=glow;
    fragColor = TDOutputSwizzle(vec4(v*{cr:.1f}, v*{cg:.1f}, v*{cb:.1f}, 1.0));
}}"""
    shaders[f"{580+i:04d}"] = code

for i in range(10):
    sc = 3.0 + i * 0.5; spd = 0.3 + i * 0.1
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 rnd2(vec2 p) {{ return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5); }}
void main() {{
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    vec2 st=uv*{sc:.1f}; vec2 ist=floor(st); vec2 fst=fract(st);
    float mDist=1.0; vec2 mCell;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++) {{
        vec2 nb=vec2(x,y); vec2 pt=rnd2(ist+nb);
        pt=0.5+0.5*sin(time*{spd:.2f}*3.14+6.28*pt);
        float d=length(nb+pt-fst);
        if(d<mDist){{mDist=d;mCell=ist+nb;}}
    }}
    vec2 cc=rnd2(mCell+vec2(7.0,3.0)); float hue=cc.x+time*0.03;
    float r=sin(hue*6.28)*0.5+0.5; float g=sin(hue*6.28+2.094)*0.5+0.5; float b=sin(hue*6.28+4.189)*0.5+0.5;
    float edge=1.0-smoothstep(0.04,0.06,mDist);
    vec3 col=vec3(r,g,b)*(1.0-edge*0.95)+edge*0.05;
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{590+i:04d}"] = code

# CAT 51-60: CRT, FilmGrain, Thermal, Xray, Vaporwave, Acid, Zen, Burst, Network, Crystal (0600-0699)
for i in range(10):
    scan=2.0+i; barrel=0.1+i*0.03
    cr,cg,cb = [(1,0.3,0),(0,1,0.3),(0,0.3,1),(0.8,0.5,0),(0,0,1),(0.5,1,0),(0.3,0.7,1),(1,0,0.3),(0,0.5,0.3),(1,0.5,1)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 c=(uv-0.5)*(1.0+{barrel:.2f}*dot(uv-0.5,uv-0.5))+0.5;
    float vignette=1.0-smoothstep(0.3,0.8,length(c-0.5));
    float scan2=sin(c.y*resolution.y*{scan:.1f})*0.08;
    float base=sin(c.x*20.0+time*3.0)*0.5+0.5;
    float base2=sin(c.y*10.0-time*2.0)*0.5+0.5;
    float noise2=hash(vec2(floor(c.x*100.0),floor(c.y*100.0+time*30.0)))*0.05;
    float v=base*base2;
    fragColor = TDOutputSwizzle(vec4((v*{cr:.1f}-scan2+noise2)*vignette,(v*{cg:.1f}-scan2*0.5+noise2)*vignette,(v*{cb:.1f}-scan2+noise2)*vignette,1.0));
}}"""
    shaders[f"{600+i:04d}"] = code

for i in range(10):
    grain=0.1+i*0.05; spd=10.0+i*5.0
    cr,cg,cb = [(1,0.8,0.6),(0.9,0.9,0.7),(0.8,0.8,0.8),(1,0.7,0.5),(0.7,0.9,1),(0.5,0.7,0.9),(0.9,0.8,0.6),(0.8,0.9,0.7),(0.6,0.8,1),(0.4,0.5,0.7)][i]
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
    float base=noise(uv*3.0+time*0.1)*0.6+0.2;
    float grain2=hash(uv*resolution.xy+floor(time*{spd:.1f}))*{grain:.2f};
    float v=base+(grain2-{grain*0.5:.3f});
    float vig=max(0.0,1.0-length(uv-0.5)*1.2)*v;
    fragColor = TDOutputSwizzle(vec4(vig*{cr:.1f}, vig*{cg:.1f}, vig*{cb:.1f}, 1.0));
}}"""
    shaders[f"{610+i:04d}"] = code

for i in range(10):
    sc=2.0+i*0.4; spd=0.1+i*0.04
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
float fbm(vec2 p) {{ float v=0.0,a=0.5; for(int k=0;k<4;k++){{v+=a*noise(p);p*=2.0;a*=0.5;}} return v; }}
vec3 thermal(float t) {{
    t=clamp(t,0.0,1.0);
    if(t<0.25) return mix(vec3(0,0,0.5),vec3(0,0.5,0),t*4.0);
    if(t<0.5) return mix(vec3(0,0.5,0),vec3(1,1,0),(t-0.25)*4.0);
    if(t<0.75) return mix(vec3(1,1,0),vec3(1,0,0),(t-0.5)*4.0);
    return mix(vec3(1,0,0),vec3(1,1,1),(t-0.75)*4.0);
}}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float heat=fbm(uv*{sc:.1f}+vec2(time*{spd:.3f},time*{spd*0.5:.3f}));
    heat+=exp(-length(uv-vec2(0.5*resolution.x/resolution.y,0.5))*3.0)*0.5;
    fragColor = TDOutputSwizzle(vec4(thermal(clamp(heat,0.0,1.0)), 1.0));
}}"""
    shaders[f"{620+i:04d}"] = code

for i in range(10):
    spd=0.2+i*0.08; sc=2.0+i*0.3
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
float fbm(vec2 p) {{ float v=0.0,a=0.5; for(int k=0;k<4;k++){{v+=a*noise(p);p*=2.0;a*=0.5;}} return v; }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float density=fbm(uv*{sc:.1f}+time*{spd:.3f});
    float dx=fbm(uv*{sc:.1f}+vec2(0.01,0)+time*{spd:.3f})-density;
    float dy=fbm(uv*{sc:.1f}+vec2(0,0.01)+time*{spd:.3f})-density;
    float edge=length(vec2(dx,dy))*100.0;
    float xray=1.0-density*0.6;
    float v=xray+edge*2.0;
    fragColor = TDOutputSwizzle(vec4(v*0.8, v*0.9, v, 1.0));
}}"""
    shaders[f"{630+i:04d}"] = code

for i in range(10):
    spd=0.3+i*0.1; grid=0.08+i*0.01
    cr,cg,cb = [(1,0.3,0.8),(0.9,0.5,0.9),(0.8,0.4,1),(1,0.2,0.7),(0.7,0.5,0.9),(0.9,0.3,0.8),(0.8,0.5,1),(1,0.4,0.9),(0.6,0.5,0.8),(0.9,0.2,0.6)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 pos=(gl_FragCoord.xy/resolution.xy)-vec2(0.5,0.4);
    vec3 p3=vec3(pos.x,0.4,pos.y+0.1);
    vec2 s=vec2(p3.x/p3.z,p3.y/p3.z)*0.2+vec2(0.0,time*{spd:.2f});
    float gx=abs(mod(s.x,{grid:.3f})-{grid*0.5:.4f});
    float gy=abs(mod(s.y,{grid:.3f})-{grid*0.5:.4f});
    float gridLine=(1.0-smoothstep(0.0,0.003,min(gx,gy)))*clamp(p3.z*p3.z*5.0,0.0,1.0);
    float sky=smoothstep(-0.0,0.2,pos.y+0.4);
    float sun=exp(-abs(pos.y+0.2)*30.0)*exp(-abs(pos.x)*5.0);
    vec3 skyCol=mix(vec3({cr:.1f},{cg:.1f},{cb:.1f}),vec3(0.5,0.1,0.3),sky);
    vec3 col=skyCol+gridLine*vec3({cr:.1f},{cg:.1f},{cb:.1f})*1.5+sun*vec3(1.0,0.9,0.4);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{640+i:04d}"] = code

for i in range(10):
    spd=1.0+i*0.5; sc=3.0+i*0.5
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) {{ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }}
float noise(vec2 p) {{
    vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}}
void main() {{
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    float n=noise(uv*{sc:.1f}+time*0.1);
    uv+=vec2(sin(uv.y*3.0+time)*0.1,cos(uv.x*3.0+time*1.3)*0.1);
    float v=(sin(uv.x*5.0+time*{spd:.1f}+n*4.0)+sin(uv.y*4.0-time*{spd*0.8:.1f}+n*3.0)+sin((uv.x+uv.y)*6.0+time*{spd*1.2:.1f}))/3.0*0.5+0.5;
    float hue=v*3.0+time*0.2;
    float r=sin(hue*6.28)*0.5+0.5; float g=sin(hue*6.28+2.094)*0.5+0.5; float b=sin(hue*6.28+4.189)*0.5+0.5;
    fragColor = TDOutputSwizzle(vec4(r*r, g*g, b*b, 1.0));
}}"""
    shaders[f"{650+i:04d}"] = code

for i in range(10):
    spd=0.1+i*0.05
    cr,cg,cb = [(0.9,0.9,0.8),(0.8,0.8,0.9),(0.7,0.8,0.8),(1,0.9,0.8),(0.6,0.7,0.8),(0.5,0.6,0.7),(0.9,0.8,0.7),(0.8,0.9,0.7),(0.7,0.7,0.9),(0.6,0.8,0.7)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {{
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    float r=length(uv); float angle=atan(uv.y,uv.x);
    float ring=sin(r*8.0-time*{spd:.2f}*3.14)*0.5+0.5;
    ring=pow(ring,3.0)*smoothstep(1.5,0.0,r)*0.8+0.1;
    fragColor = TDOutputSwizzle(vec4(ring*{cr:.1f}, ring*{cg:.1f}, ring*{cb:.1f}, 1.0));
}}"""
    shaders[f"{660+i:04d}"] = code

for i in range(10):
    spd=2.0+i*0.5; nb=5+i*3
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(float x) {{ return fract(sin(x * 127.1) * 43758.5); }}
void main() {{
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    float r=length(uv); float angle=atan(uv.y,uv.x);
    float t2=mod(time*{spd:.1f},3.14);
    float burst=0.0;
    for(float j=0.0; j<{nb}.0; j++) {{
        float a2=j/{nb}.0*6.283+hash(j)*0.5;
        float ray=min(abs(angle-a2),6.283-abs(angle-a2));
        float rayFade=smoothstep(0.1,0.0,ray);
        float front=smoothstep(0.0,0.1,t2*0.4-r+hash(j+1.0)*0.1)*smoothstep(t2*0.4+0.3,t2*0.4-0.1,r);
        burst+=rayFade*front;
    }}
    float glow=exp(-r*3.0)*(1.0-t2/3.14);
    float v=burst+glow;
    fragColor = TDOutputSwizzle(vec4(v, v*0.5, v*0.1, 1.0));
}}"""
    shaders[f"{670+i:04d}"] = code

for i in range(10):
    nn=8+i*2; spd=0.3+i*0.1
    cr,cg,cb = [(0.3,0.6,1),(0.5,0.8,1),(0,0.5,1),(0.4,0.7,0.9),(0.2,0.4,0.8),(0,0.7,1),(0.6,0.9,1),(0.3,0.5,1),(0,0.6,0.9),(0.1,0.8,1)][i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(float n) {{ return fract(sin(n * 127.1) * 43758.5); }}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec3 col = vec3(0.0, 0.02, 0.05);
    for(int j=0; j<{nn}; j++) {{
        float jf=float(j);
        vec2 pos=vec2(hash(jf*3.1), hash(jf*7.3));
        float pulse=sin(time*{spd:.2f}*3.14+jf*1.7)*0.5+0.5;
        col += exp(-length(uv-pos)*30.0)*pulse*2.0*vec3({cr:.1f},{cg:.1f},{cb:.1f});
        if(j<{nn//2}) {{
            float kf=float(j+{nn//2});
            vec2 pos2=vec2(hash(kf*3.1), hash(kf*7.3));
            if(length(pos2-pos)<0.4) {{
                vec2 ld=normalize(pos2-pos); float llen=length(pos2-pos);
                float t3=clamp(dot(uv-pos,ld)/llen,0.0,1.0);
                float dLine=length(uv-pos-ld*t3);
                float signal=sin(time*{spd*2:.2f}*6.28-t3*10.0+jf)*0.5+0.5;
                col+=exp(-dLine*200.0)*signal*(1.0-llen*2.5)*0.3*vec3({cr:.1f},{cg:.1f},{cb:.1f});
            }}
        }}
    }}
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{680+i:04d}"] = code

for i in range(10):
    sc=3.0+i*0.5; spd=0.5+i*0.2
    cols = [(1,0.8,0.3),(0.5,0.8,1),(1,0.3,0.5),(0.3,1,0.6),(0.9,0.5,1),(1,0.6,0.2),(0.4,0.9,1),(0.8,0.3,1),(0.3,1,0.9),(1,0.9,0.3)]
    cr,cg,cb = cols[i]
    code = f"""uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 rnd2(vec2 p) {{ return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5); }}
void main() {{
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    vec2 st=uv*{sc:.1f}; vec2 ist=floor(st); vec2 fst=fract(st);
    float mDist=1.0, mDist2=1.0; vec2 mPoint;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++) {{
        vec2 nb=vec2(x,y); vec2 pt=rnd2(ist+nb);
        pt=0.5+0.5*sin(time*{spd:.2f}+6.28*pt);
        float d=length(nb+pt-fst);
        if(d<mDist){{mDist2=mDist;mDist=d;mPoint=ist+nb;}}
        else if(d<mDist2) mDist2=d;
    }}
    float facet=mDist2-mDist;
    float edge=smoothstep(0.03,0.05,facet);
    vec2 cc=rnd2(mPoint+vec2(5.2,1.7));
    float brightness=0.5+cc.x*0.5;
    float spec=pow(max(0.0,dot(normalize(rnd2(mPoint+0.5)-0.5),vec2(0.7,0.7))),4.0);
    vec3 col=vec3({cr:.1f},{cg:.1f},{cb:.1f})*brightness*edge+spec*0.8;
    col*=0.5+0.5*sin(mDist*20.0-time*2.0);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}"""
    shaders[f"{690+i:04d}"] = code

for key, code in shaders.items():
    with open(f"{out}/{key}.frag", "w") as f:
        f.write(code)
print(f"Written {len(shaders)} shaders (0400-0699)")
