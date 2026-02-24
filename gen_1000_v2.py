#!/usr/bin/env python3
"""
1000 GLSL Fragment Shader Generator v2 - Extended
51 Categories (Cat 0-50): 31 x 20 + 20 x 19 = 1000 shaders
TouchDesigner compatible format
"""
import os, math

OUTPUT_DIR = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments-claude"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def ff(v): return f"{v:.4f}"
def write_shader(idx, code):
    with open(os.path.join(OUTPUT_DIR, f"{idx:04d}.frag"), "w") as f:
        f.write(code)

HEADER = "uniform float time;\nuniform vec2 resolution;\nout vec4 fragColor;\n\n"

NOISE_FUNC = """float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i=floor(st), f=fract(st);
    float a=random(i), b=random(i+vec2(1,0)), c=random(i+vec2(0,1)), d=random(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
"""
FBM_FUNC = NOISE_FUNC + """float fbm(vec2 st, int oct) {
    float v=0.0, a=0.5;
    for(int i=0;i<8;i++){if(i>=oct)break; v+=a*noise(st); st*=2.0; a*=0.5;}
    return v;
}
"""
HSB_FUNC = """vec3 hsb2rgb(vec3 c) {
    vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
}
"""
RANDOM2_FUNC = """vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}
"""

def col(mode, v):
    m = mode % 10
    if m==0: return f"vec3({v})"
    elif m==1: return f"vec3({v},{v}*0.5,0.15)"
    elif m==2: return f"vec3(0.1,{v}*0.6,{v})"
    elif m==3: return f"vec3(abs(sin({v}*3.14159)),abs(sin({v}*3.14159+2.094)),abs(sin({v}*3.14159+4.189)))"
    elif m==4: return f"vec3({v}*2.5,{v}*0.4,{v}*3.0)"
    elif m==5: return f"vec3(1.0-{v}*0.9,{v}*0.2,{v})"
    elif m==6: return f"vec3({v}*1.8,{v}*0.7,0.1)"
    elif m==7: return f"vec3(0.05,{v}*1.5,{v}*0.3)"
    elif m==8: return f"vec3({v}*0.3,{v}*1.2,{v}*0.8)"
    elif m==9: return f"vec3({v},0.1,1.0-{v})"

# ── ORIGINAL CATEGORIES 0-24 ──────────────────────────────────────────

def cat0(vi):  # Pulsing Circles
    num=(vi%5)+1; freq=6.0+vi*1.5; speed=2.5+(vi%8)*1.8; cmode=vi%10
    pos_list=[(0.5,0.5)] if num==1 else [(0.5+0.3*math.cos(2*math.pi*i/num+vi*0.15), 0.5+0.3*math.sin(2*math.pi*i/num+vi*0.15)) for i in range(num)]
    cc="\n".join(f"    val+=sin(length(st-vec2({ff(px)},{ff(py)}))*{ff(freq)}-time*{ff(speed+i*0.5)}+{ff(i*1.047)});" for i,(px,py) in enumerate(pos_list))
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
{cc}
    float v=val/{ff(float(num))}*0.5+0.5;
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat1(vi):  # FBM Noise
    oct=2+(vi%6); sx=1.8+vi*0.12; sy=1.8+(19-vi)*0.12
    spx=0.04+(vi%7)*0.03; spy=0.04+((vi+3)%7)*0.03; mult=6.0+(vi%5)*3.0; cmode=vi%10
    modtype=vi%5
    if modtype==0: comp=f"float c=fbm(st*{ff(sx)}+vec2(time*{ff(spx)},time*{ff(spy)}),{oct});"
    elif modtype==1: comp=f"float c=mod(fbm(st*{ff(sx)}+vec2(time*{ff(spx)},time*{ff(spy)}),{oct})*{ff(mult)},1.0);"
    elif modtype==2: comp=f"float c=abs(fbm(st*{ff(sx)}+vec2(time*{ff(spx)},time*{ff(spy)}),{oct})*2.0-1.0);"
    elif modtype==3: comp=f"float c=sin(fbm(st*{ff(sx)}+vec2(time*{ff(spx)},time*{ff(spy)}),{oct})*{ff(mult)})*0.5+0.5;"
    else: comp=f"float c=step(0.5,fbm(st*{ff(sx)}+vec2(time*{ff(spx)},time*{ff(spy)}),{oct}));"
    return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    {comp}
    vec3 rgb={col(cmode,"c")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat2(vi):  # Rotating Lines
    num=(vi%6)+1; rot_speed=0.5+vi*0.2; lw=0.002+(vi%8)*0.003; cmode=vi%10
    lc="\n".join(f"    ang=atan(uv.y,uv.x)+time*{ff(rot_speed*(1+i*0.2))}+{ff(i*math.pi/max(num,1))}; v+=smoothstep({ff(lw)},0.0,abs(sin(ang*{1+i})));" for i in range(num))
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy-resolution.xy*0.5)/min(resolution.x,resolution.y);
    float ang,v=0.0;
{lc}
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat3(vi):  # Wave Distortion
    fx=4.0+(vi%8)*1.5; fy=4.0+((vi+3)%8)*1.5; ax=0.05+(vi%6)*0.04; ay=0.05+((vi+2)%6)*0.04
    speed=1.5+(vi%5)*0.8; cmode=vi%10; layers=(vi%3)+1
    wc="\n".join(f"    st.x+=sin(st.y*{ff(fy+l*2)}+time*{ff(speed+l*0.3)}+{ff(l*1.57)})*{ff(ax)}; st.y+=cos(st.x*{ff(fx+l*2)}+time*{ff(speed*1.1+l*0.2)})*{ff(ay)};" for l in range(layers))
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
{wc}
    float v=abs(sin(st.x*{ff(fx)}+st.y*{ff(fy)}+time*{ff(speed)}));
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat4(vi):  # Radial Waves
    freq=8.0+vi*1.0; speed=3.0+(vi%8)*1.5; rgb_split=0.05+(vi%6)*0.08; cmode=vi%5
    if cmode==0: clr=f"vec3(sin(d*{ff(freq)}-time*{ff(speed)})*0.5+0.5)"
    elif cmode==1: clr=f"vec3(sin(d*{ff(freq)}-time*{ff(speed)})*0.5+0.5,sin(d*{ff(freq+rgb_split*freq)}-time*{ff(speed*1.1)})*0.5+0.5,sin(d*{ff(freq+rgb_split*freq*2)}-time*{ff(speed*1.2)})*0.5+0.5)"
    elif cmode==2: clr=f"vec3(mod(d*{ff(freq)}-time*{ff(speed)},1.0))"
    elif cmode==3: clr=f"vec3(abs(sin(d*{ff(freq)}-time*{ff(speed)})),abs(cos(d*{ff(freq*1.3)}-time*{ff(speed*0.7)})),0.5)"
    else: clr=f"hsb2rgb(vec3(d*{ff(freq*0.1)}-time*{ff(speed*0.05)},1.0,abs(sin(d*{ff(freq)}-time*{ff(speed)}))))"
    inc=HSB_FUNC if cmode==4 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5; st.x*=resolution.x/resolution.y;
    float d=length(st);
    vec3 rgb=clamp({clr},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat5(vi):  # HSB Color Wheel
    hs=0.05+(vi%8)*0.15; sat=0.7+(vi%5)*0.15; bri=0.8+(vi%4)*0.1; pat=vi%6
    if pat==0: hue=f"(angle/6.28318)+mod(time*{ff(hs)},1.0)"; rad="radius"
    elif pat==1: hue=f"(angle/6.28318)+mod(time*{ff(hs)},1.0)"; rad=f"sin(radius*{ff(8+vi%5)}-time*{ff(hs*3)})*0.5+0.5"
    elif pat==2: hue=f"mod((angle/6.28318)*{2+vi%4}+mod(time*{ff(hs)},1.0),1.0)"; rad="radius"
    elif pat==3: hue=f"(angle/6.28318)+radius*{ff(0.3+vi%3*0.2)}+mod(time*{ff(hs)},1.0)"; rad="radius"
    elif pat==4: hue=f"mod(radius*{ff(3+vi%4)}+mod(time*{ff(hs*2)},1.0),1.0)"; rad="1.0-radius"
    else: hue=f"(angle/6.28318)+mod(time*{ff(hs)},1.0)"; rad=f"mod(radius*{ff(5+vi%4)},1.0)"
    return f"""{HEADER}{HSB_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 tc=vec2(0.5)-st;
    float angle=atan(tc.y,tc.x), radius=length(tc)*2.0;
    vec3 rgb=hsb2rgb(vec3({hue},{ff(sat)},{ff(bri)}*{rad}));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat6(vi):  # Scan Lines
    num=2+(vi%7); speed=1.5+vi*0.5; cmode=vi%10; direction=vi%4
    if direction==0: scan=f"abs(sin(st.y*{ff(float(num)*3.14159)}+time*{ff(speed)}))"
    elif direction==1: scan=f"abs(sin(st.x*{ff(float(num)*3.14159)}+time*{ff(speed)}))"
    elif direction==2: scan=f"abs(sin((st.x+st.y)*{ff(float(num)*2.22)}+time*{ff(speed)}))"
    else: scan=f"abs(sin(st.x*{ff(float(num)*3.0)}+time*{ff(speed)}))*abs(sin(st.y*{ff(float(num)*3.0)}-time*{ff(speed*0.7)}))"
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v={scan};
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat7(vi):  # Moving Points
    num=3+(vi%8); speed=0.8+(vi%6)*0.4; amp=0.3+(vi%5)*0.12; glow=0.02+(vi%6)*0.008; cmode=vi%10
    pc="\n".join(f"    pos=vec2(sin(time*{ff(speed*(0.8+i*0.3))}+{ff(i*0.628)})*{ff(amp)},cos(time*{ff(speed*(0.7+i*0.25))})*{ff(amp+i*0.02)}); t+={ff(glow)}/length(pos-uv);" for i in range(num))
    if cmode%3==0: ce="1.0-mod(vec3(t)*0.04,1.0)"
    elif cmode%3==1: ce=f"vec3(t*0.08,t*0.03,t*0.12)"
    else: ce="vec3(abs(sin(t*0.3)),abs(sin(t*0.2+1.0)),abs(sin(t*0.25+2.0)))"
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
{pc}
    vec3 rgb=clamp({ce},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat8(vi):  # Grid Modulo
    rr=5.0+vi*1.2; rg=1.5+vi*0.6; rb=-8.0-vi*0.8; div=1.0+(vi%4)*0.5
    return f"""{HEADER}vec2 rot2d(vec2 v,float a){{return vec2(v.x*cos(a)-v.y*sin(a),v.x*sin(a)+v.y*cos(a));}}
void main(){{
    vec2 uv=gl_FragCoord.xy/resolution.xy*2.0-1.0;
    float d={ff(div)}, spd={ff(1.0/div)};
    vec2 vr=rot2d(uv,radians(time*{ff(rr)})), vg=rot2d(uv,radians(time*{ff(rg)})), vb=rot2d(uv,radians(time*{ff(rb)}));
    float r=mod(vr.x+mod(time/d*spd,1.0),1.0/d)*d;
    float g=mod(vg.y+mod(time/d*spd,1.0),1.0/d)*d;
    float b=mod(vb.x-mod(time/d*spd,1.0),1.0/d)*d;
    fragColor=TDOutputSwizzle(vec4(r,g,b,1.0));
}}"""

def cat9(vi):  # Tunnel
    fov=0.3+(vi%7)*0.1; sc=0.05+(vi%6)*0.04; spd=0.2+(vi%8)*0.15; grid=0.05+(vi%5)*0.03; cmode=vi%6
    clrs=["vec3(col)","vec3(col,col*0.5,col*2.0)","vec3(col*2.0,col,col*0.5)","vec3(abs(sin(col*3.14)),abs(cos(col*3.14)),col)","vec3(col*0.3,col*1.5,col*0.8)","vec3(1.0-col,col*0.8,col*col)"]
    return f"""{HEADER}void main(){{
    vec2 pos=(gl_FragCoord.xy/resolution.xy)-0.5;
    vec3 p=vec3(pos.x,{ff(fov)},pos.y);
    vec2 s=vec2(p.x/p.z,p.y/p.z)*{ff(sc)}+time*{ff(spd)};
    float col=sign((mod(s.x,{ff(grid)})-{ff(grid*0.5)})*(mod(s.y,{ff(grid)})-{ff(grid*0.5)}));
    col*=p.z*p.z*{ff(15.0+vi*0.5)}; col=clamp(col,0.0,1.0);
    vec3 rgb={clrs[cmode]};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat10(vi):  # Voronoi
    scale=2.5+(vi%7)*0.8; speed=4.0+vi*0.7; edge=0.02+(vi%6)*0.02; cmode=vi%5
    if cmode==0: clr="vec3(m_dist)"
    elif cmode==1: clr=f"vec3(m_dist)+(1.0-step({ff(edge)},m_dist))*vec3(0.0,1.0,4.0)*0.5"
    elif cmode==2: clr="vec3(m_dist,m_dist*0.5,1.0-m_dist)"
    elif cmode==3: clr=f"vec3(abs(sin(m_dist*{ff(8+vi%4)}))*2.0,abs(cos(m_dist*{ff(6+vi%3)}))*1.5,m_dist)"
    else: clr=f"vec3(1.0-m_dist)*(1.0-step({ff(edge)},m_dist))"
    return f"""{HEADER}{RANDOM2_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y; st*={ff(scale)};
    vec2 is=floor(st), fs=fract(st); float m_dist=1.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){{
        vec2 nb=vec2(x,y), pt=random2(is+nb);
        pt=0.5+0.5*sin(time*{ff(speed*0.1)}+6.28318*pt);
        m_dist=min(m_dist,length(nb+pt-fs));
    }}
    vec3 rgb=clamp({clr},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat11(vi):  # Animated Rectangles
    num=1+(vi%5); speed=2.0+vi*0.7; scale=0.5+(vi%6)*0.15; cmode=vi%10
    rc="\n".join(f"    sz={ff(scale-i*0.08)}+sin(time*{ff(speed+i*0.3)}+{ff(i*0.5)})*{ff(0.1+i*0.04)}; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);" for i in range(num))
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0, sz;
{rc}
    v=mod(v,2.0)<1.0?v:2.0-v;
    vec3 rgb={col(cmode,"mod(v*0.4,1.0)")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat12(vi):  # Noise Grid
    cell=4.0+(vi%8)*4.0; speed=0.5+vi*0.4; cmode=vi%10; threshold=0.3+(vi%7)*0.1
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 cell=floor(st*{ff(cell)})/{ff(cell)};
    float v=random(cell+floor(time*{ff(speed)})/{ff(speed)});
    v=smoothstep({ff(threshold-0.1)},{ff(threshold+0.1)},v);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat13(vi):  # High-Freq Sine
    fx=10.0+vi*1.5; fy=10.0+(19-vi)*1.2; sx=20.0+(vi%8)*12.0; sy=15.0+(vi%6)*9.0; sz=12.0+(vi%5)*8.0; mult=1.0+(vi%4)*0.5
    return f"""{HEADER}void main(){{
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*{ff(fx)}+time*{ff(sx)}+cos(uv.y*{ff(fy*0.7)}+time*{ff(sy*0.4)})*0.5);
    col.g=sin(uv.x*{ff(fx*0.9)}-time*{ff(sx*0.8)}+cos(uv.y*{ff(fy*0.9)}+time*{ff(sy*0.5)})*0.75);
    col.b=sin(uv.x*{ff(fx*0.8)}+time*{ff(sz)}+cos(uv.y*{ff(fy*1.1)}+time*{ff(sy*0.6)}));
    fragColor=TDOutputSwizzle(vec4(col*{ff(mult)},1.0));
}}"""

def cat14(vi):  # Plasma
    f1=2.0+(vi%6)*0.8; f2=3.0+(vi%5)*0.7; f3=1.5+(vi%4)*0.9; spd=1.0+(vi%7)*0.3; pal=vi%5
    if pal==0: ce="vec3(abs(sin(v*3.14159)),abs(sin(v*3.14159+2.094)),abs(sin(v*3.14159+4.189)))"
    elif pal==1: ce="vec3(v*1.5,v*0.5,1.0-v*0.8)"
    elif pal==2: ce="hsb2rgb(vec3(v,0.9,1.0))"
    elif pal==3: ce="vec3(sin(v*6.28)*0.5+0.5,cos(v*6.28*1.3)*0.5+0.5,sin(v*6.28*0.7+2.0)*0.5+0.5)"
    else: ce="vec3(v*v*2.0,v*1.2,(1.0-v)*1.5)"
    inc=HSB_FUNC if pal==2 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; float t=time*{ff(spd)};
    float v=sin(st.x*{ff(f1*10)}+t)+sin(st.y*{ff(f2*10)}+t*1.3)+sin((st.x+st.y)*{ff(f3*7)}+t*0.7)+sin(length(st-0.5)*{ff(f1*15)}-t*2.0);
    v=v*0.25+0.5;
    vec3 rgb=clamp({ce},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat15(vi):  # Lissajous
    fx=1.0+(vi%8); fy=1.0+((vi+2)%8); phase=(vi%6)*0.523; thick=0.003+(vi%5)*0.003; num=1+(vi%4); cmode=vi%10
    cc="\n".join(f"    cx=sin(time*{ff(0.5+i*0.2)}*{ff(fx)}+{ff(phase+i*0.785)}); cy=cos(time*{ff(0.5+i*0.2)}*{ff(fy)}); d=min(d,length(uv-vec2(cx,cy)*{ff(0.7-i*0.1)}));" for i in range(num))
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float cx,cy,d=10.0;
{cc}
    float v=smoothstep({ff(thick)},0.0,d);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat16(vi):  # Julia Set
    cr=0.3+(vi%5)*0.1; crs=0.2+(vi%6)*0.05; cis=0.15+(vi%4)*0.05; zoom=1.5+(vi%6)*0.3; iters=20+(vi%5)*4; cmode=vi%6
    if cmode==0: ce="vec3(float(iter)/float(MAX_ITER))"
    elif cmode==1: ce="vec3(sin(float(iter)*0.2)*0.5+0.5,cos(float(iter)*0.15)*0.5+0.5,sin(float(iter)*0.1+1.0)*0.5+0.5)"
    elif cmode==2: ce="hsb2rgb(vec3(float(iter)/float(MAX_ITER),0.8,float(iter)/float(MAX_ITER)))"
    elif cmode==3: ce="vec3(float(iter)/float(MAX_ITER),0.0,1.0-float(iter)/float(MAX_ITER))"
    elif cmode==4: ce="vec3(pow(float(iter)/float(MAX_ITER),0.5))"
    else: ce="vec3(float(iter)/float(MAX_ITER)*2.0,float(iter)/float(MAX_ITER)*0.5,float(iter)/float(MAX_ITER)*3.0)"
    inc=HSB_FUNC if cmode==2 else ""
    return f"""{HEADER}{inc}#define MAX_ITER {iters}
void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y; uv*={ff(zoom)};
    float crv={ff(cr)}*cos(time*{ff(crs)}), civ={ff(cr)}*sin(time*{ff(cis)});
    vec2 z=uv; int iter=0;
    for(int i=0;i<MAX_ITER;i++){{if(dot(z,z)>4.0)break; z=vec2(z.x*z.x-z.y*z.y+crv,2.0*z.x*z.y+civ); iter++;}}
    vec3 rgb={ce};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat17(vi):  # Kaleidoscope
    segs=3+(vi%8); speed=0.3+vi*0.06; base=vi%4; cmode=vi%10
    fold=f"""    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), radius=length(uv);
    float seg=6.28318/{ff(float(segs))};
    angle=mod(angle+time*{ff(speed)},seg);
    if(angle>seg*0.5) angle=seg-angle;
    uv=vec2(cos(angle),sin(angle))*radius;"""
    if base==0: pat=f"float v=fbm(uv*2.5+vec2(time*0.1),4);"; funcs=FBM_FUNC
    elif base==1: pat=f"float v=sin(uv.x*8.0+time)*sin(uv.y*8.0+time)*0.5+0.5;"; funcs=""
    elif base==2: pat=f"float v=sin(length(uv)*{ff(6+vi%5)}-time*2.0)*0.5+0.5;"; funcs=""
    else: pat=f"float v=noise(uv*{ff(3+vi%4)}+time*0.2);"; funcs=NOISE_FUNC
    return f"""{HEADER}{funcs}void main(){{
{fold}
{pat}
    vec3 rgb=clamp({col(cmode,"v")},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat18(vi):  # Starfield
    layers=2+(vi%4); speed=0.3+(vi%6)*0.15; ssize=0.002+(vi%5)*0.002; cmode=vi%6
    lc="\n".join(f"    {{vec2 lv=fract(uv*{ff(20+l*15+vi*0.3)}+vec2(0.0,time*{ff(speed*(l+1)*0.5)}))-0.5; stars+={ff(ssize*(l+1))}/length(lv);}}" for l in range(layers))
    clrs=["vec3(stars)","vec3(stars,stars*0.7,stars*0.3)","vec3(stars*0.3,stars*0.7,stars)","vec3(stars*1.5,stars*0.5,stars*2.0)","hsb2rgb(vec3(stars*0.3,0.7,stars))","vec3(stars*0.4,stars*1.2,stars*0.6)"]
    inc=HSB_FUNC if cmode==4 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
{lc}
    stars=clamp(stars,0.0,1.0);
    vec3 rgb=clamp({clrs[cmode]},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat19(vi):  # Interference
    num=2+(vi%5); freq=8.0+vi*0.7; speed=1.0+(vi%7)*0.4; cmode=vi%10
    sc="\n".join(f"    v+=sin(length(st-vec2({ff(0.5+0.3*math.cos(2*math.pi*i/num+vi*0.1))},{ff(0.5+0.3*math.sin(2*math.pi*i/num+vi*0.1))}))*{ff(freq+i)}-time*{ff(speed+i*0.2)});" for i in range(num))
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
{sc}
    float n=v/{ff(float(num))}*0.5+0.5;
    vec3 rgb={col(cmode,"n")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat20(vi):  # Spiral
    arms=1+(vi%7); tight=3.0+vi*0.5; speed=0.3+(vi%6)*0.2; width=0.05+(vi%5)*0.04; cmode=vi%10
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float radius=length(uv), angle=atan(uv.y,uv.x)+time*{ff(speed)};
    float spiral=mod(angle*{ff(float(arms))}/6.28318+radius*{ff(tight)},1.0);
    float v=smoothstep({ff(width)},0.0,abs(spiral-0.5)-{ff(width*0.3)})*smoothstep(1.0,0.5,radius);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat21(vi):  # Moire
    f1=10.0+vi*0.7; f2=10.5+vi*0.7; angle=vi*0.1; speed=0.5+(vi%6)*0.2; cmode=vi%10
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float a={ff(angle)};
    vec2 s1=st*{ff(f1)};
    vec2 s2=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a))*{ff(f2)};
    float g1=sin(s1.x+time*{ff(speed)})*sin(s1.y+time*{ff(speed*0.7)});
    float g2=sin(s2.x-time*{ff(speed*0.9)})*sin(s2.y-time*{ff(speed*0.8)});
    float v=(g1+g2)*0.5+0.5;
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat22(vi):  # Mandala
    sym=3+(vi%8); layers=1+(vi%4); speed=0.2+(vi%6)*0.1; cmode=vi%10; pat=vi%5
    pats=["sin(length(p)*8.0)*0.5+0.5","mod(length(p)*6.0,1.0)","step(0.5,sin(p.x*8.0)*sin(p.y*8.0)*0.5+0.5)","noise(p*4.0)","abs(sin(p.x*10.0+p.y*8.0))"]
    lc="\n".join(f"""    {{float seg{l}=6.28318/{ff(float(sym*(l+1)))}; float a{l}=mod(atan(uv.y,uv.x)+time*{ff(speed*(l+1))},seg{l}); if(a{l}>seg{l}*0.5) a{l}=seg{l}-a{l}; vec2 p=vec2(cos(a{l}),sin(a{l}))*length(uv); v+={pats[pat]};}}""" for l in range(layers))
    inc=NOISE_FUNC if pat==3 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0;
{lc}
    vec3 rgb=clamp({col(cmode,f"clamp(v/{ff(float(layers))},0.0,1.0)")},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat23(vi):  # Glitch Art
    gfreq=5.0+vi*1.0; bsz=8.0+(vi%6)*8.0; speed=2.0+(vi%7)*1.0; cmode=vi%6
    clrs=["vec3(v,v*0.8,v*1.2)","vec3(v*1.5,v*0.3,v)","vec3(v,v*1.5,v*0.3)","vec3(fract(v*3.0),fract(v*5.0+0.3),fract(v*7.0+0.6))","vec3(step(0.5,v)*1.5,step(0.4,v*1.1),step(0.6,v)*2.0)","hsb2rgb(vec3(v,1.0,1.0))"]
    inc=HSB_FUNC if cmode==5 else ""
    return f"""{HEADER}{inc}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float t=floor(time*{ff(speed)})/{ff(speed)};
    vec2 block=floor(st*{ff(bsz)})/{ff(bsz)};
    float offset=random(block+t)*0.3;
    float v=random(vec2(st.x+offset,block.y+t));
    v=v*0.8+sin(st.x*{ff(gfreq)}+t*10.0)*0.1+0.1;
    vec3 rgb=clamp({clrs[cmode]},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat24(vi):  # Hybrid
    combo=vi%10; speed=0.5+(vi%6)*0.3; cmode=vi%10
    if combo==0:
        freq=6.0+vi*0.7
        return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float n=fbm(st*2.5+vec2(time*0.1),4);
    float d=length(st+n*0.3-0.5);
    float v=sin(d*{ff(freq)}-time*{ff(speed*4)})*0.5+0.5; v=mix(v,n,0.4);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==1:
        scale=3.0+vi*0.3; freq2=5.0+vi*0.4
        return f"""{HEADER}{RANDOM2_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    vec2 is=floor(st*{ff(scale)}), fs=fract(st*{ff(scale)}); float m=1.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){{vec2 nb=vec2(x,y),pt=random2(is+nb); pt=0.5+0.5*sin(time*{ff(speed)}+6.28318*pt); m=min(m,length(nb+pt-fs));}}
    float d=length(st-0.5);
    float v=m*0.6+sin(d*{ff(freq2)}-time*3.0)*0.2+0.2;
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""
    elif combo==2:
        cr=0.25+(vi%5)*0.08
        return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float plasma=sin(uv.x*8.0+time)*cos(uv.y*6.0+time*0.7)*0.5+0.5;
    vec2 z=uv*1.5; float crv={ff(cr)}*cos(time*0.2), civ={ff(cr)}*sin(time*0.15);
    int iter=0;
    for(int i=0;i<25;i++){{if(dot(z,z)>4.0)break; z=vec2(z.x*z.x-z.y*z.y+crv,2.0*z.x*z.y+civ); iter++;}}
    float v=mix(plasma,float(iter)/25.0,0.5);
    vec3 rgb=vec3(abs(sin(v*3.14)),abs(sin(v*3.14+2.094)),abs(sin(v*3.14+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==3:
        segs=4+(vi%6)
        return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float ang=atan(uv.y,uv.x), r=length(uv);
    float seg=6.28318/{ff(float(segs))}; ang=mod(ang+time*{ff(speed)},seg); if(ang>seg*0.5) ang=seg-ang;
    vec2 p=vec2(cos(ang),sin(ang))*r;
    float v=noise(p*{ff(3+vi%4)}+time*0.15);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==4:
        arms=2+(vi%5)
        return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), ang=atan(uv.y,uv.x)+time*{ff(speed)};
    float spiral=mod(ang*{ff(float(arms))}/6.28318+r*{ff(3+vi%4)},1.0);
    float n=fbm(uv*2.0+time*0.1,4);
    float v=mix(spiral,n,0.35)*smoothstep(1.2,0.2,r);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==5:
        fx=12.0+vi*1.0
        return f"""{HEADER}vec2 rot2d(vec2 v,float a){{return vec2(v.x*cos(a)-v.y*sin(a),v.x*sin(a)+v.y*cos(a));}}
void main(){{
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 r2=rot2d(uv*2.0-1.0,time*{ff(speed)});
    float g=mod(r2.x*6.0+time,1.0)*mod(r2.y*6.0-time,1.0);
    float s=sin(uv.x*{ff(fx)}+time*20.0)*sin(uv.y*{ff(fx*0.9)}+time*15.0)*0.5+0.5;
    float v=g*0.4+s*0.6;
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==6:
        ns=3+(vi%4); freq=10.0+vi*0.5
        return f"""{HEADER}{HSB_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; float v=0.0;
    for(int i=0;i<{ns};i++){{float a=6.28318*float(i)/{ff(float(ns))}; vec2 src=vec2(0.5+cos(a)*0.3,0.5+sin(a)*0.3); v+=sin(length(st-src)*{ff(freq)}-time*{ff(speed*3)});}}
    vec3 rgb=hsb2rgb(vec3(v/{ff(float(ns))}*0.5+0.5+time*0.1,0.85,0.9));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==7:
        return f"""{HEADER}void main(){{
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    for(int l=0;l<3;l++){{float fl=float(l); vec2 lv=fract(uv*({ff(15.0+vi*0.4)}+fl*10.0)+vec2(0.0,time*{ff(0.2+vi%5*0.1)}*(fl+1.0)))-0.5; stars+=0.003/(length(lv)+0.001);}}
    float plasma=sin(uv.x*8.0+time*{ff(speed)})*sin(uv.y*6.0+time*{ff(speed*1.2)})*0.25+0.25;
    float v=clamp(stars,0.0,1.0)+plasma;
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""
    elif combo==8:
        np=4+(vi%6)
        return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    uv.x+=sin(uv.y*{ff(3+vi%5)}+time*{ff(speed*2)})*0.15;
    uv.y+=cos(uv.x*{ff(2+vi%4)}+time*{ff(speed*1.5)})*0.12;
    vec2 pos; float t=0.0;
    for(int i=0;i<{np};i++){{float fi=float(i); pos=vec2(sin(time*{ff(0.7+vi%4*0.1)}*(fi+1.0))*1.5,cos(time*{ff(0.6+vi%3*0.15)}+fi)*1.8); t+=0.025/length(pos-uv);}}
    vec3 rgb=1.0-mod(vec3(t)*0.15,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    else:
        f1=12.0+vi*0.5; f2=12.5+vi*0.5
        return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float g1=sin(st.x*{ff(f1)}+time*{ff(speed)})*sin(st.y*{ff(f1*0.8)}+time*{ff(speed*0.7)});
    float a={ff(vi*0.12)}; vec2 s2=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a));
    float g2=sin(s2.x*{ff(f2)}-time*{ff(speed*0.9)})*sin(s2.y*{ff(f2*0.9)});
    float scan=abs(sin(st.y*{ff(4+vi%5)}+time*{ff(speed*2)}))*0.3;
    float v=(g1+g2)*0.25+0.5+scan;
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

# ── NEW CATEGORIES 25-50 ──────────────────────────────────────────────

def cat25(vi):  # Domain Warping (FBM of FBM)
    scale=2.0+(vi%5)*0.6; spd=0.05+(vi%7)*0.02; cmode=vi%10
    q_off = [ff(v) for v in [0.0,0.0,5.2,1.3]]
    r_off = [ff(1.7+vi*0.1), ff(9.2+vi*0.05), ff(8.3+vi*0.08), ff(2.8+vi*0.04)]
    return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    vec2 p=st*{ff(scale)};
    vec2 q=vec2(fbm(p+vec2({q_off[0]},{q_off[1]}),5),fbm(p+vec2({q_off[2]},{q_off[3]}),5));
    vec2 r=vec2(fbm(p+4.0*q+vec2(time*{ff(spd)}+{r_off[0]},time*{ff(spd*0.5)}+{r_off[1]}),5),
                fbm(p+4.0*q+vec2(time*{ff(spd*0.7)}+{r_off[2]},time*{ff(spd*0.3)}+{r_off[3]}),5));
    float f=fbm(p+4.0*r,5);
    vec3 rgb={col(cmode,"clamp(f,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat26(vi):  # Sphere Raytracing
    spd=0.3+(vi%6)*0.15; lspd=0.4+(vi%5)*0.2; cmode=vi%8; fov=1.2+(vi%4)*0.2
    if cmode==0: surface="vec3(diff*0.8+spec*0.4+0.05)"
    elif cmode==1: surface="vec3(diff+0.05,diff*0.4,spec)"
    elif cmode==2: surface="vec3(diff*0.3,diff*0.9+spec,diff*0.5)"
    elif cmode==3: surface="hsb2rgb(vec3(normal.x*0.5+0.5+time*0.05,0.8,diff+0.1))"
    elif cmode==4: surface="vec3(diff*2.0,diff*0.5,spec*2.0)"
    elif cmode==5: surface="vec3(spec,diff,diff*0.3+spec*0.5)"
    elif cmode==6: surface="vec3(normal.x*0.5+0.5,normal.y*0.5+0.5,diff)"
    else: surface="vec3(diff+spec)*vec3(0.9,0.8,1.2)"
    inc=HSB_FUNC if cmode==3 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec3 ro=vec3(0.0,0.0,-3.0), rd=normalize(vec3(uv,{ff(fov)}));
    vec3 sc=vec3(sin(time*{ff(spd)})*0.5,cos(time*{ff(spd*0.7)})*0.3,0.0);
    vec3 oc=ro-sc;
    float b=dot(oc,rd), c=dot(oc,oc)-1.0, disc=b*b-c;
    vec3 rgb=vec3(0.0);
    if(disc>0.0){{
        float t=-b-sqrt(disc);
        vec3 hit=ro+rd*t, normal=normalize(hit-sc);
        vec3 light=normalize(vec3(cos(time*{ff(lspd)}),sin(time*{ff(lspd*0.8)}),{ff(-1.5-vi%4*0.3)}));
        float diff=max(dot(normal,light),0.0);
        float spec=pow(max(dot(reflect(-light,normal),-rd),0.0),{ff(16.0+vi%5*8.0)});
        rgb=clamp({surface},0.0,1.0);
    }}
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat27(vi):  # Alternative Fractals (Burning Ship / Tricorn)
    ftype=vi%3; zoom=1.2+(vi%5)*0.3; cx=ff(-0.5+(vi%4-2)*0.1); cy=ff((vi%4-2)*0.05)
    iters=25+(vi%4)*5; cmode=vi%6
    if ftype==0:  # Burning Ship
        iter_body="z=vec2(abs(z.x),abs(z.y)); z=vec2(z.x*z.x-z.y*z.y+c.x,2.0*z.x*z.y+c.y);"
    elif ftype==1:  # Tricorn (conjugate)
        iter_body="z=vec2(z.x*z.x-z.y*z.y+c.x,-2.0*z.x*z.y+c.y);"
    else:  # Mandelbar variation
        iter_body="z=vec2(z.x*z.x-z.y*z.y+c.x,2.0*abs(z.x*z.y)+c.y);"
    if cmode==0: ce="vec3(float(i)/float(MAX_ITER))"
    elif cmode==1: ce="vec3(sin(float(i)*0.3)*0.5+0.5,cos(float(i)*0.2)*0.5+0.5,sin(float(i)*0.15+1.5)*0.5+0.5)"
    elif cmode==2: ce="hsb2rgb(vec3(float(i)/float(MAX_ITER)+time*0.05,0.9,float(i)/float(MAX_ITER)))"
    elif cmode==3: ce="vec3(pow(float(i)/float(MAX_ITER),0.5),0.0,1.0-float(i)/float(MAX_ITER))"
    elif cmode==4: ce="vec3(float(i)/float(MAX_ITER)*2.5,float(i)/float(MAX_ITER)*0.4,float(i)/float(MAX_ITER)*3.0)"
    else: ce="vec3(1.0-pow(float(i)/float(MAX_ITER),2.0))"
    inc=HSB_FUNC if cmode==2 else ""
    return f"""{HEADER}{inc}#define MAX_ITER {iters}
void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 c=uv*{ff(zoom)}+vec2({cx}+sin(time*0.1)*0.05,{cy}+cos(time*0.08)*0.05);
    vec2 z=vec2(0.0); vec3 rgb=vec3(0.0);
    for(int i=0;i<MAX_ITER;i++){{
        {iter_body}
        if(dot(z,z)>4.0){{rgb={ce}; break;}}
    }}
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat28(vi):  # Chromatic Aberration
    strength=0.02+(vi%6)*0.015; spd=0.5+(vi%5)*0.3; cmode=vi%5; base=vi%4
    if base==0: pat="sin(uv.x*8.0+time*spd)*sin(uv.y*6.0+time*spd)*0.5+0.5"
    elif base==1: pat="length(fract(uv*5.0+time*0.1)-0.5)"
    elif base==2: pat="fbm(uv*3.0+time*0.1,4)"
    else: pat="sin(length(uv-0.5)*20.0-time*3.0)*0.5+0.5"
    inc=FBM_FUNC if base==2 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 center=uv-0.5; float d=length(center);
    vec2 dir=center*{ff(strength)}*(1.0+d*d*3.0);
    float spd={ff(spd)};
    float r={pat.replace("uv","(uv+dir*1.0)")};
    float g={pat.replace("uv","uv")};
    float b={pat.replace("uv","(uv-dir*1.0)")};
    float vign=1.0-d*1.5;
    vec3 rgb=vec3(r,g,b)*vign;
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat29(vi):  # Flow Field
    freq=2.0+(vi%5)*0.8; spd=0.3+(vi%6)*0.15; samples=4+(vi%5); cmode=vi%10; step_sz=0.04+(vi%4)*0.02
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float v=0.0;
    vec2 p=st;
    for(int i=0;i<{samples};i++){{
        float angle=noise(p*{ff(freq)}+time*{ff(spd)})*6.28318;
        p+=vec2(cos(angle),sin(angle))*{ff(step_sz)};
        v+=noise(p*{ff(freq*1.5)});
    }}
    v/={ff(float(samples))};
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat30(vi):  # Neon Polar Curves
    petals=2+(vi%7); spd=0.3+(vi%5)*0.15; thick=0.005+(vi%6)*0.005; cmode=vi%10
    curve_type=vi%4
    if curve_type==0: r_expr=f"abs(cos(angle*{ff(float(petals)/2)}+time*{ff(spd)}))"  # Rose
    elif curve_type==1: r_expr=f"0.5*(1.0+cos(angle+time*{ff(spd)}))"  # Cardioid
    elif curve_type==2: r_expr=f"0.5+0.4*sin(angle*{ff(float(petals))}+time*{ff(spd)})"  # Rhodonea
    else: r_expr=f"abs(sin(angle*{ff(float(petals))}+time*{ff(spd)})*cos(angle*{ff(float(petals+1))}+time*{ff(spd*1.3)}))"
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), r=length(uv);
    float curve={r_expr};
    float d=abs(r-curve);
    float glow=smoothstep({ff(thick*3)},0.0,d)+smoothstep({ff(thick*8)},{ff(thick*3)},d)*0.3;
    vec3 rgb={col(cmode,"glow")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat31(vi):  # Electric Arc / Lightning
    num_bolts=1+(vi%4); spd=3.0+(vi%6)*1.5; noise_freq=8.0+(vi%5)*4.0; glow=0.003+(vi%6)*0.002; cmode=vi%8
    bolts="\n".join(f"    bx={ff(-0.3+i*0.3+vi%3*0.1)}+noise(vec2(st.y*{ff(noise_freq)},time*{ff(spd)}+{ff(i*5.0)}))*{ff(0.15+i*0.05)}-0.075; v+=clamp({ff(glow)}/abs(st.x-bx),0.0,1.5);" for i in range(num_bolts))
    clrs=["vec3(v,v*0.6,v*2.0)","vec3(v*2.0,v*0.8,v*0.2)","vec3(v*1.5,v*2.0,v)","vec3(v*2.5,v*0.3,v*2.5)","vec3(v,v*1.5,v*0.3)","vec3(v*0.5,v*1.8,v*2.5)","vec3(v*2.0,v*2.0,v*0.3)","vec3(v*1.5,v*0.5,v*3.0)"]
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0, bx;
{bolts}
    vec3 rgb=clamp({clrs[cmode%len(clrs)]},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat32(vi):  # Waveform / Oscilloscope
    num_waves=2+(vi%5); spd=1.0+(vi%6)*0.8; bg=vi%3; thick=0.003+(vi%5)*0.002
    wave_lines="\n".join(f"    y{i}=sin(st.x*{ff(6.28*(2+i*2+vi%3))}+time*{ff(spd*(1+i*0.3))})*{ff(0.12+i*0.04)}+{ff(0.5+i*0.15-num_waves*0.07)}; v+=smoothstep({ff(thick)},0.0,abs(st.y-y{i}));" for i in range(num_waves))
    decls=", ".join(f"y{i}" for i in range(num_waves))
    clrs=["vec3(v,v*0.5,0.0)","vec3(0.0,v,v*0.5)","vec3(v*0.5,0.0,v)"]
    bg_clrs=["vec3(0.0)","vec3(0.05,0.08,0.05)","vec3(0.05,0.05,0.1)"]
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float {decls}, v=0.0;
{wave_lines}
    vec3 rgb={bg_clrs[bg]}+{clrs[vi%3]}*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat33(vi):  # Hypnotic Zoom Loop
    import re as _re
    spd=0.3+(vi%6)*0.15; base_type=vi%4; cmode=vi%10; tile=2.0+(vi%5)*1.5
    tile_s=ff(tile)  # pre-compute to avoid nested {expr} inside f-string
    if base_type==0: pat="sin(p.x*6.28318)*sin(p.y*6.28318)"
    elif base_type==1: pat="step(0.5,fract(p.x*3.0))*step(0.5,fract(p.y*3.0))"
    elif base_type==2: pat="length(fract(p*3.0)-0.5)*2.0"
    else: pat="noise(p*4.0)"
    inc=NOISE_FUNC if base_type==3 else ""
    replace_str=f"fract(uv*scale/{tile_s}*0.5+0.5)"
    # Use word-boundary regex to avoid replacing 'p' inside words like 'step'
    pat2=_re.sub(r'\bp\b', replace_str, pat)
    return f"""{HEADER}{inc}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float zoom=mod(time*{ff(spd)},1.0);
    float scale=pow({tile_s},zoom);
    vec2 p=fract(uv*scale*0.5+0.5);
    float v={pat};
    float fade=sin(zoom*3.14159);
    v=v*fade+{pat2}*(1.0-fade);
    vec3 rgb={col(cmode,"v*0.5+0.5")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat34(vi):  # Solar Rays / Crepuscular
    num_rays=4+(vi%8)*2; spd=0.5+(vi%5)*0.3; sharpness=2.0+(vi%6)*1.5; cmode=vi%8
    clrs=["vec3(v,v*0.6,0.0)","vec3(v,v*0.8,v*0.3)","vec3(v*0.5,v*0.3,v)","vec3(v*1.5,v*0.3,0.0)","vec3(0.0,v*0.5,v)","vec3(v,0.0,v*0.5)","vec3(v*0.3,v,v*0.5)","vec3(v,v*0.5,v*1.5)"]
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x)+time*{ff(spd)};
    float r=length(uv);
    float rays=pow(abs(sin(angle*{ff(float(num_rays)/2.0)})),{ff(sharpness)});
    float radial=smoothstep(1.4,0.0,r);
    float noise_mod=noise(vec2(angle*3.0+time,r*2.0))*0.3+0.7;
    float v=rays*radial*noise_mod;
    vec3 rgb={clrs[cmode]};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat35(vi):  # Terrain Contours
    scale=2.0+(vi%5)*0.8; spd=0.04+(vi%6)*0.02; contours=8.0+(vi%7)*4.0; cmode=vi%8
    clrs=["vec3(v*0.2,v*0.6,v*0.3)","vec3(v*0.8,v*0.6,v*0.3)","vec3(v*0.3,v*0.5,v*0.8)","vec3(v*1.5,v*0.4,v*0.1)","vec3(v,v,v)","vec3(0.1,v*0.8,v*0.5)","vec3(v*0.5,v*0.1,v*0.8)","vec3(v*1.2,v*0.8,v*0.4)"]
    return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float h=fbm(st*{ff(scale)}+vec2(time*{ff(spd)},time*{ff(spd*0.7)}),6);
    float contour=abs(sin(h*{ff(contours)}*3.14159));
    contour=smoothstep(0.05,0.0,contour)*1.5+h*0.4;
    float v=clamp(contour,0.0,1.0);
    vec3 rgb={clrs[cmode]};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat36(vi):  # Magnetic Field Lines
    spd=0.3+(vi%5)*0.15; cmode=vi%8
    p1x=ff(0.3); p1y=ff(0.5); p2x=ff(0.7); p2y=ff(0.5)
    clrs=["vec3(abs(sin(fieldAngle+time)),abs(cos(fieldAngle)),mag*0.5)","vec3(mag,mag*0.3,1.0-mag)","vec3(0.0,mag*1.5,mag)","vec3(mag*2.0,mag*0.5,0.0)","vec3(abs(cos(fieldAngle*2.0)),mag,abs(sin(fieldAngle*3.0)))","vec3(mag,0.0,1.0-mag*0.5)","vec3(abs(sin(mag*6.28)),abs(sin(mag*6.28+2.09)),abs(sin(mag*6.28+4.19)))","vec3(mag*1.5,mag*1.5,mag*0.3)"]
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 p1=vec2({p1x}+sin(time*{ff(spd)})*0.12,{p1y}+cos(time*{ff(spd*0.8)})*0.1);
    vec2 p2=vec2({p2x}+sin(time*{ff(spd*1.2)}+1.57)*0.12,{p2y}+cos(time*{ff(spd)}+1.57)*0.1);
    vec2 d1=(st-p1), d2=(st-p2);
    float r1sq=dot(d1,d1)+0.001, r2sq=dot(d2,d2)+0.001;
    vec2 B=(d1/r1sq)-(d2/r2sq);
    float mag=clamp(length(B)*0.08,0.0,1.0);
    float fieldAngle=atan(B.y,B.x);
    vec3 rgb={clrs[cmode]};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat37(vi):  # Posterized / Quantized Noise
    levels=2+(vi%7); scale=2.0+(vi%5)*0.8; spd=0.05+(vi%6)*0.03; cmode=vi%10; steps=2+(vi%4)
    return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float n=fbm(st*{ff(scale)}+time*{ff(spd)},{steps+2});
    float q=floor(n*{ff(float(levels))})/{ff(float(levels))};
    float edge=abs(n-q-{ff(0.5/levels)})<{ff(0.02)}?1.0:0.0;
    float v=q+edge*0.3;
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat38(vi):  # Shape Morphing SDF
    spd=0.4+(vi%5)*0.2; glow=0.01+(vi%6)*0.008; shapes=vi%5; cmode=vi%10
    if shapes==0: sdf="mix(length(uv)-0.5, max(abs(uv.x),abs(uv.y))-0.5, t)"
    elif shapes==1: sdf="mix(length(uv)-0.5, length(uv-vec2(0.5,0.5)*0.5)-0.3, t)"
    elif shapes==2: sdf="mix(max(abs(uv.x),abs(uv.y))-0.5, dot(uv,normalize(vec2(0,1)))+0.5, t)"
    elif shapes==3: sdf="mix(length(uv)-0.5, abs(uv.x)+abs(uv.y)-0.6, t)"
    else: sdf=f"mix(length(uv)-0.5, abs(sin(atan(uv.y,uv.x)*{2+vi%4})*0.4+length(uv))-0.5, t)"
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float t=sin(time*{ff(spd)})*0.5+0.5;
    float d={sdf};
    float outline=smoothstep({ff(glow*2)},0.0,abs(d));
    float fill=smoothstep(0.0,-0.02,d)*0.3;
    float v=outline+fill;
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat39(vi):  # Iridescent / Thin Film
    spd=0.08+(vi%6)*0.04; thick_scale=2.0+(vi%5)*0.6; base_thick=1.0+(vi%4)*0.5; cmode=vi%4
    if cmode==0: mix_expr="color"
    elif cmode==1: mix_expr="color*vec3(1.5,0.8,1.2)"
    elif cmode==2: mix_expr="vec3(color.b,color.r,color.g)"
    else: mix_expr="mix(color,vec3(1.0)-color,0.3)"
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float thickness={ff(base_thick)}+noise(st*{ff(thick_scale)}+time*{ff(spd)})*2.0;
    vec3 wl=vec3(0.65,0.55,0.45);
    vec3 phase=2.0*3.14159*thickness/wl;
    vec3 color=cos(phase)*0.5+0.5;
    float fresnel=pow(1.0-abs(st.y-0.5)*2.0,2.0)*0.5+0.3;
    color*=fresnel;
    color={mix_expr};
    fragColor=TDOutputSwizzle(vec4(clamp(color,0.0,1.0),1.0));
}}"""

def cat40(vi):  # Ring Cascade / Oscillating Rings
    num=3+(vi%7); base_freq=8.0+(vi%5)*4.0; spd=2.0+(vi%6)*1.5; cmode=vi%10
    ring_code="\n".join(f"    v+=sin(r*{ff(base_freq+i*3.0)}-time*{ff(spd+i*0.4)}+{ff(i*0.785)})*{ff(1.0/(i+1))};" for i in range(num))
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), v=0.0;
{ring_code}
    float n=v/{ff(sum(1.0/(i+1) for i in range(num)))};
    n=n*0.5+0.5;
    vec3 rgb={col(cmode,"n")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat41(vi):  # Halftone / Dot Screen
    density=20.0+(vi%7)*8.0; spd=0.05+(vi%5)*0.04; cmode=vi%6; angle=(vi%5)*0.15
    clrs=["vec3(dot)","vec3(dot,dot*0.5,0.0)","vec3(0.0,dot,dot*0.5)","vec3(dot*0.5,0.0,dot)","vec3(dot,dot*0.8,dot*0.3)","vec3(dot,dot*0.3,dot*0.8)"]
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float a={ff(angle)};
    vec2 rot=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a));
    vec2 cell=floor(rot*{ff(density)}), frac=fract(rot*{ff(density)})-0.5;
    float base=random(cell*0.1+floor(time*{ff(spd)})/{ff(max(spd,0.01))}+cell*0.01);
    float dot=step(length(frac),base*0.48);
    vec3 rgb={clrs[cmode]};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat42(vi):  # Smoke / Turbulence
    upspd=0.15+(vi%6)*0.06; turb=2.0+(vi%5)*0.8; spd=0.15+(vi%4)*0.05; cmode=vi%5
    if cmode==0: clr="vec3(density)"
    elif cmode==1: clr="vec3(density*0.7,density*0.75,density*0.8)"
    elif cmode==2: clr="vec3(density*2.0,density*0.8,density*0.3)"
    elif cmode==3: clr="vec3(density*0.2,density*0.6,density)"
    else: clr="vec3(density*0.5,density,density*0.5)"
    return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    vec2 flow_uv=st+vec2(0.0,-time*{ff(upspd)});
    flow_uv.x+=fbm(st*2.0+vec2(time*{ff(spd)},0.0),3)*{ff(0.2+vi%4*0.05)};
    float density=fbm(flow_uv*{ff(turb)},5);
    density=smoothstep(0.25,0.75,density);
    vec3 rgb={clr};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat43(vi):  # Crystallographic / Hex Tiling
    scale=2.0+(vi%5)*0.8; spd=0.1+(vi%6)*0.05; sym=vi%4; cmode=vi%10
    if sym==0:  # Hexagonal p6m
        grid_code="""    const float sqrt3=1.7320508;
    vec2 r=vec2(1.0,sqrt3)*scale; vec2 h=r*0.5;
    vec2 a=mod(p,r)-h, b=mod(p-h,r)-h;
    vec2 gv=dot(a,a)<dot(b,b)?a:b;"""
        pat="sin(length(gv)*20.0-time*spd)*0.5+0.5"
    elif sym==1:  # Square p4m
        grid_code="    vec2 gv=abs(fract(p*scale)-0.5);"
        pat="abs(sin(gv.x*6.28318)*sin(gv.y*6.28318))"
    elif sym==2:  # Triangle-ish
        grid_code="""    vec2 gv=fract(p*scale)-0.5;
    gv=abs(gv);"""
        pat="step(gv.x+gv.y,0.5)*sin(time*spd)"
    else:  # Pinwheel hex
        grid_code="""    const float sqrt3=1.7320508;
    vec2 r=vec2(1.0,sqrt3)*scale; vec2 h=r*0.5;
    vec2 a=mod(p,r)-h, b=mod(p-h,r)-h;
    vec2 gv=dot(a,a)<dot(b,b)?a:b;"""
        pat=f"mod(atan(gv.y,gv.x)/{ff(2.0*math.pi/6)}+time*spd,1.0)"
    return f"""{HEADER}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float scale={ff(scale)}, spd={ff(spd)};
    vec2 p=st;
{grid_code}
    float v={pat};
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat44(vi):  # Gravitational Lensing
    strength=0.04+(vi%6)*0.02; spd=0.3+(vi%5)*0.15; cmode=vi%5; base=vi%4
    if base==0: pat_expr="sin(distorted.x*12.0+time)*sin(distorted.y*10.0+time)*0.5+0.5"
    elif base==1: pat_expr="fbm(distorted*3.0+time*0.1,4)"
    elif base==2: pat_expr="length(fract(distorted*5.0)-0.5)*2.0"
    else: pat_expr="abs(sin(length(distorted-0.5)*15.0-time*2.0))"
    inc=FBM_FUNC if base==1 else ""
    return f"""{HEADER}{inc}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 mass=vec2(0.5+sin(time*{ff(spd)})*0.15,0.5+cos(time*{ff(spd*0.8)})*0.12);
    vec2 dir=st-mass; float d=length(dir)+0.001;
    vec2 distorted=st+normalize(dir)*{ff(strength)}/d;
    float v={pat_expr};
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat45(vi):  # Fractal Folding (IFS-like Sierpinski)
    folds=8+(vi%8); scale=1.8+(vi%5)*0.15; offset=1.0+(vi%4)*0.3; cmode=vi%10; spd=0.1+(vi%6)*0.05
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 z=uv; float col_acc=0.0;
    for(int i=0;i<{folds};i++){{
        z=abs(z);
        if(z.x<z.y) z=z.yx;
        z=z*{ff(scale)}-{ff(offset)}+sin(time*{ff(spd)})*0.1;
        col_acc+=exp(-length(z)*{ff(0.5+vi%5*0.1)});
    }}
    float v=clamp(col_acc/{ff(float(folds))},0.0,1.0);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat46(vi):  # Digital Rain / Matrix
    cols=20.0+(vi%7)*10.0; spd=0.8+(vi%6)*0.4; trail=5.0+(vi%5)*3.0; cmode=vi%5
    if cmode==0: clr="vec3(0.0,brightness*1.5,brightness*0.3)"
    elif cmode==1: clr="vec3(brightness*1.5,brightness*0.3,0.0)"
    elif cmode==2: clr="vec3(brightness*0.3,brightness*0.5,brightness*1.5)"
    elif cmode==3: clr="vec3(brightness,brightness*0.8,0.0)"
    else: clr="vec3(brightness*1.2,brightness*0.3,brightness)"
    return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float col_id=floor(st.x*{ff(cols)});
    float col_spd={ff(spd)}*(0.5+random(vec2(col_id,0.0)));
    float drop=fract(st.y+time*col_spd);
    float brightness=exp(-drop*{ff(trail)});
    float char_rand=random(vec2(col_id,floor(time*col_spd*4.0)));
    brightness*=(0.7+char_rand*0.3);
    vec3 rgb={clr};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat47(vi):  # Pinwheel / Sector Rotation
    sectors=3+(vi%8); spd=0.5+(vi%6)*0.25; inner=0.1+(vi%4)*0.08; cmode=vi%10
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), angle=atan(uv.y,uv.x)+time*{ff(spd)};
    float sector=floor(mod(angle/{ff(2.0*math.pi/sectors)},1.0)*2.0);
    float ring=mod(r*{ff(3.0+vi%5)},1.0);
    float v=mod(sector+floor(ring+time*{ff(spd)}),2.0);
    float edge=smoothstep(0.0,{ff(0.05+vi%4*0.02)},min(fract(angle/{ff(2.0*math.pi/sectors)}),1.0-fract(angle/{ff(2.0*math.pi/sectors)})));
    v=v*edge*smoothstep(1.2,{ff(inner)},r);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat48(vi):  # Retro CRT / Phosphor
    scanlines=resolution_lines=200.0+(vi%7)*50.0; spd=0.5+(vi%5)*0.4; glow_amt=0.3+(vi%4)*0.2; cmode=vi%6
    signal_types=["sin(st.x*6.28318*3.0+time*spd)*0.5+0.5","noise(vec2(st.x*5.0,time*spd*0.2))","abs(sin(st.x*20.0+time*spd))*0.7","sin(st.x*4.0+time*spd)*cos(st.x*7.0-time*spd*0.7)*0.5+0.5","fbm(vec2(st.x*3.0,time*0.1),4)","step(0.5,fract(st.x*6.0+time*spd*0.5))"]
    sig=signal_types[vi%len(signal_types)]
    needs_noise=("noise(" in sig or "fbm(" in sig)
    inc=FBM_FUNC if "fbm(" in sig else (NOISE_FUNC if needs_noise else "")
    clrs=["vec3(signal,signal*1.1,signal*0.8)","vec3(signal*0.3,signal,signal*0.4)","vec3(signal,signal*0.4,signal*0.2)","vec3(signal*0.4,signal*0.7,signal)","vec3(signal,signal*0.8,signal*0.2)","vec3(signal*0.8,signal*0.4,signal)"]
    return f"""{HEADER}{inc}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float spd={ff(spd)};
    float signal={sig};
    float scanline=sin(st.y*{ff(scanlines)}*3.14159)*0.5+0.5;
    scanline=pow(scanline,{ff(1.5+vi%4*0.3)});
    signal*=scanline*{ff(0.8+glow_amt)};
    float vignette=(1.0-pow(abs(st.x-0.5)*2.0,3.0))*(1.0-pow(abs(st.y-0.5)*2.0,3.0));
    signal*=vignette;
    vec3 rgb={clrs[cmode]};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

def cat49(vi):  # Bokeh / Light Orbs
    num=3+(vi%7); spd=0.3+(vi%5)*0.2; bsize=0.06+(vi%5)*0.03; cmode=vi%8
    orb_code="\n".join(f"    lp=vec2(sin(time*{ff(spd*(0.7+i*0.3))}+{ff(i*2.094)})*{ff(0.5+vi%4*0.05)},cos(time*{ff(spd*(0.6+i*0.25))}+{ff(i*1.047)})*{ff(0.4+vi%3*0.06)}); acc+={ff(0.001+vi%5*0.0005)}/max(length(uv-lp)-{ff(bsize)},0.001)*vec3(abs(sin({ff(i*2.094)})),abs(sin({ff(i*2.094+2.094)})),abs(sin({ff(i*2.094+4.189)})));" for i in range(num))
    clrs=["acc","acc*vec3(1.5,0.8,0.5)","acc*vec3(0.5,0.8,1.5)","acc.bgr","acc*vec3(2.0,0.5,1.5)","acc*vec3(0.5,2.0,1.0)","vec3(acc.r+acc.g,acc.g,acc.b+acc.r)*0.7","acc*vec3(1.2,1.0,0.8)"]
    return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
{orb_code}
    vec3 rgb=clamp({clrs[cmode]},0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}}"""

def cat50(vi):  # Grand Synthesis
    combo=vi%10; spd=0.4+(vi%6)*0.2; cmode=vi%10
    if combo==0:
        return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    vec2 p=st*3.0;
    vec2 q=vec2(fbm(p+time*0.05,5),fbm(p+vec2(5.2,1.3)+time*0.04,5));
    float f=fbm(p+4.0*q,5);
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), ang=atan(uv.y,uv.x)+time*{ff(spd)};
    float spiral=mod(ang*3.0/6.28318+r*5.0,1.0);
    float v=mix(f,spiral,0.4)*smoothstep(1.3,0.1,r);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==1:
        return f"""{HEADER}{RANDOM2_FUNC}{HSB_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    st*={ff(3.0+vi%4*0.5)};
    vec2 is=floor(st), fs=fract(st); float m=1.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){{vec2 nb=vec2(x,y),pt=random2(is+nb); pt=0.5+0.5*sin(time*{ff(spd)}+6.28318*pt); m=min(m,length(nb+pt-fs));}}
    float ang=atan(st.y-float(int(st.y))-0.5,st.x-float(int(st.x))-0.5);
    vec3 rgb=hsb2rgb(vec3(m*0.5+ang/6.28318+time*0.05,0.85,m));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==2:
        segs=4+(vi%5)
        return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float ang=atan(uv.y,uv.x), r=length(uv);
    float seg=6.28318/{ff(float(segs))}; float fold=mod(ang+time*{ff(spd)},seg); if(fold>seg*0.5) fold=seg-fold;
    vec2 p=vec2(cos(fold),sin(fold))*r;
    vec2 q=vec2(fbm(p*2.0+time*0.1,4),fbm(p*2.0+vec2(3.1,2.7)+time*0.08,4));
    float f=fbm(p+4.0*q,4);
    vec3 rgb={col(cmode,"f")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==3:
        return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    vec2 mass=vec2(0.5+sin(time*{ff(spd)})*0.15,0.5+cos(time*{ff(spd*0.8)})*0.12);
    vec2 dir=st-mass; float d=length(dir)+0.001;
    vec2 distorted=st+normalize(dir)*0.05/d;
    float thickness=1.5+noise(distorted*2.0+time*0.1)*2.0;
    vec3 wl=vec3(0.65,0.55,0.45);
    vec3 phase=2.0*3.14159*thickness/wl;
    vec3 color=cos(phase)*0.5+0.5;
    fragColor=TDOutputSwizzle(vec4(clamp(color,0.0,1.0),1.0));
}}"""
    elif combo==4:
        return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec3 ro=vec3(0.0,0.0,-3.0), rd=normalize(vec3(uv,1.4));
    vec3 sc=vec3(sin(time*{ff(spd)})*0.4,cos(time*{ff(spd*0.7)})*0.3,0.0);
    vec3 oc=ro-sc; float b=dot(oc,rd), c=dot(oc,oc)-1.0, disc=b*b-c;
    vec3 rgb=vec3(0.0);
    if(disc>0.0){{
        float t=-b-sqrt(disc); vec3 hit=ro+rd*t, n=normalize(hit-sc);
        vec3 li=normalize(vec3(cos(time*{ff(spd*0.6)}),sin(time*{ff(spd*0.5)}),{ff(-1.5+vi%3*0.3)}));
        float diff=max(dot(n,li),0.0), spec=pow(max(dot(reflect(-li,n),-rd),0.0),32.0);
        float u=atan(n.y,n.x)/(2.0*3.14159)+0.5, v_=n.z*0.5+0.5;
        rgb=vec3(abs(sin(u*{ff(4+vi%5)}+time*{ff(spd)})),abs(cos(v_*{ff(3+vi%4)}+time*{ff(spd*0.7)})),abs(sin((u+v_)*{ff(6+vi%3)})))*diff+spec;
    }}
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==5:
        num_b=3+(vi%5)
        return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float col_id=floor(st.x*{ff(25.0+vi%5*10.0)});
    float col_spd={ff(spd)}*(0.5+random(vec2(col_id)));
    float drop=fract(st.y+time*col_spd);
    float brightness=exp(-drop*8.0);
    float gfreq={ff(8.0+vi%6*2.0)};
    float arc=noise(vec2(st.y*gfreq,time*{ff(spd*2)}+col_id*0.5))*0.2-0.1;
    float d=abs(st.x-col_id/{ff(25.0+vi%5*10.0)}-arc);
    vec3 rgb=vec3(0.05,brightness*1.5+{ff(0.001)}/max(d,0.002),brightness*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==6:
        return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float h=fbm(st*2.5+time*0.04,6);
    float contour=abs(sin(h*24.0*3.14159));
    contour=smoothstep(0.05,0.0,contour)*1.5+h*0.4;
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv); float v=contour*smoothstep(1.3,0.0,r);
    vec3 rgb=mix(vec3(0.05,0.2,0.1),vec3(0.9,0.7,0.3),v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==7:
        return f"""{HEADER}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 z=uv*1.8; float crv=0.28*cos(time*0.2), civ=0.28*sin(time*0.15);
    int iter=0;
    for(int i=0;i<32;i++){{if(dot(z,z)>4.0)break; z=vec2(z.x*z.x-z.y*z.y+crv,2.0*z.x*z.y+civ); iter++;}}
    float t=float(iter)/32.0;
    float ang=atan(uv.y,uv.x)+time*{ff(spd)};
    float seg=6.28318/{ff(float(3+vi%5))}; ang=mod(ang,seg); if(ang>seg*0.5) ang=seg-ang;
    float sym=abs(cos(ang*{ff(float(3+vi%5))}));
    float v=mix(t,sym,0.3);
    vec3 rgb=vec3(abs(sin(v*3.14)),abs(sin(v*3.14+2.094)),abs(sin(v*3.14+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    elif combo==8:
        return f"""{HEADER}{NOISE_FUNC}void main(){{
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float thickness=1.5+noise(st*2.5+time*0.08)*2.0;
    vec3 wl=vec3(0.65,0.55,0.45);
    vec3 ph=2.0*3.14159*thickness/wl;
    vec3 iridescent=cos(ph)*0.5+0.5;
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), ang=atan(uv.y,uv.x)+time*{ff(spd)};
    float spiral=mod(ang*{ff(float(2+vi%5))}/6.28318+r*{ff(4+vi%4)},1.0);
    float v=smoothstep(0.06,0.0,abs(spiral-0.5)-0.02)*smoothstep(1.2,0.3,r);
    vec3 rgb=mix(iridescent*0.4,iridescent*1.5+vec3(v),v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""
    else:
        return f"""{HEADER}{FBM_FUNC}void main(){{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 z=uv; float col_acc=0.0;
    for(int i=0;i<12;i++){{z=abs(z); if(z.x<z.y) z=z.yx; z=z*1.9-1.1+sin(time*{ff(spd)})*0.15; col_acc+=exp(-length(z)*0.6);}}
    float domain=fbm(uv*2.0+time*0.05,4);
    float v=mix(clamp(col_acc/12.0,0.0,1.0),domain,0.35);
    vec3 rgb={col(cmode,"v")};
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

# ── MAIN ──────────────────────────────────────────────────────────────

GENERATORS = [
    (cat0,20),(cat1,20),(cat2,20),(cat3,20),(cat4,20),(cat5,20),
    (cat6,20),(cat7,20),(cat8,20),(cat9,20),(cat10,20),(cat11,20),
    (cat12,20),(cat13,20),(cat14,20),(cat15,20),(cat16,20),(cat17,20),
    (cat18,20),(cat19,20),(cat20,20),(cat21,20),(cat22,20),(cat23,20),
    (cat24,20),(cat25,20),(cat26,20),(cat27,20),(cat28,20),(cat29,20),
    (cat30,20),  # <- 31 cats x 20 = 620
    (cat31,19),(cat32,19),(cat33,19),(cat34,19),(cat35,19),(cat36,19),
    (cat37,19),(cat38,19),(cat39,19),(cat40,19),(cat41,19),(cat42,19),
    (cat43,19),(cat44,19),(cat45,19),(cat46,19),(cat47,19),(cat48,19),
    (cat49,19),(cat50,19),  # <- 20 cats x 19 = 380
]
# Total: 31*20 + 20*19 = 620 + 380 = 1000

shader_idx = 0
for gen_fn, vi_count in GENERATORS:
    for vi in range(vi_count):
        try:
            code = gen_fn(vi)
            write_shader(shader_idx, code)
        except Exception as e:
            print(f"ERROR: shader {shader_idx:04d} (cat {gen_fn.__name__}, vi={vi}): {e}")
            write_shader(shader_idx, f"{HEADER}void main(){{\n    fragColor=TDOutputSwizzle(vec4(0.0,0.0,0.0,1.0));\n}}")
        shader_idx += 1

print(f"Generated {shader_idx} shaders in {OUTPUT_DIR}")
files = sorted(f for f in os.listdir(OUTPUT_DIR) if f.endswith(".frag"))
print(f"Total files: {len(files)}, First: {files[0]}, Last: {files[-1]}")
