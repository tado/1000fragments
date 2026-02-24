#!/usr/bin/env python3
"""
Validate all 1000 GLSL shaders using glslangValidator.
Broken shaders are replaced with a working fallback.
"""
import os, subprocess, tempfile, sys

SHADER_DIR = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments-claude"
VALIDATOR   = "C:/Users/tadok/Documents/GitHub/1000fragments/glslang_bin/bin/glslangValidator.exe"

# TouchDesigner preamble: version + stubs so glslangValidator accepts TD-specific symbols
TD_PREAMBLE = """\
#version 450
vec4 TDOutputSwizzle(vec4 c) { return c; }
"""

# ── Fallback shaders: visually varied, guaranteed-valid ──────────────
FALLBACKS = [
    # 0: solid pulse
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=sin(length(st-0.5)*20.0-time*5.0)*0.5+0.5;
    fragColor=TDOutputSwizzle(vec4(v,v*0.6,v*1.2,1.0));
}""",
    # 1: plasma
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=sin(st.x*10.0+time)+sin(st.y*8.0+time*1.3)+sin((st.x+st.y)*6.0+time*0.7);
    v=v*0.167+0.5;
    fragColor=TDOutputSwizzle(vec4(abs(sin(v*3.14)),abs(sin(v*3.14+2.09)),abs(sin(v*3.14+4.19)),1.0));
}""",
    # 2: radial waves
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5;
    st.x*=resolution.x/resolution.y;
    float d=length(st);
    float r=sin(d*18.0-time*4.0)*0.5+0.5;
    float g=sin(d*18.0-time*4.4)*0.5+0.5;
    float b=sin(d*18.0-time*4.8)*0.5+0.5;
    fragColor=TDOutputSwizzle(vec4(r,g,b,1.0));
}""",
    # 3: rotating lines
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 uv=(gl_FragCoord.xy-resolution.xy*0.5)/min(resolution.x,resolution.y);
    float a=atan(uv.y,uv.x)+time*0.8;
    float v=abs(sin(a*4.0))*0.8+abs(sin(a*7.0))*0.2;
    fragColor=TDOutputSwizzle(vec4(v,v*0.4,v*1.5,1.0));
}""",
    # 4: noise grid
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float rnd(vec2 s){return fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);}
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 cell=floor(st*20.0)/20.0;
    float v=rnd(cell+floor(time*2.0)/2.0);
    fragColor=TDOutputSwizzle(vec4(v,v*0.7,v*1.3,1.0));
}""",
    # 5: spiral
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    uv.x*=resolution.x/resolution.y;
    float r=length(uv), a=atan(uv.y,uv.x)+time*0.5;
    float v=smoothstep(0.05,0.0,abs(mod(a*3.0/6.28318+r*5.0,1.0)-0.5)-0.02)*smoothstep(1.2,0.3,r);
    fragColor=TDOutputSwizzle(vec4(v,v*0.8,v*1.4,1.0));
}""",
    # 6: HSB wheel
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec3 hsb2rgb(vec3 c){
    vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
}
void main(){
    vec2 tc=vec2(0.5)-gl_FragCoord.xy/resolution.xy;
    float a=atan(tc.y,tc.x), r=length(tc)*2.0;
    vec3 rgb=hsb2rgb(vec3(a/6.28318+mod(time*0.15,1.0),0.9,r));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}""",
    # 7: scan lines
    """\
uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=abs(sin(st.y*40.0+time*6.0))*abs(sin(st.x*30.0-time*4.0));
    fragColor=TDOutputSwizzle(vec4(0.1,v*1.5,v*0.8,1.0));
}""",
]

def validate_shader(glsl_src: str) -> tuple[bool, str]:
    """Return (ok, error_msg). Prepends TD_PREAMBLE for validation.
    Uses file-based validation (NOT --stdin which reads empty stdin)."""
    wrapped = TD_PREAMBLE + glsl_src
    with tempfile.NamedTemporaryFile(suffix=".frag", delete=False, mode="w", encoding="utf-8") as tmp:
        tmp.write(wrapped)
        tmp_path = tmp.name
    try:
        # NOTE: do NOT pass --stdin; use the file path directly
        result = subprocess.run(
            [VALIDATOR, "-S", "frag", tmp_path],
            capture_output=True, text=True, timeout=10
        )
        ok = (result.returncode == 0)
        msg = (result.stdout + result.stderr).strip()
        return ok, msg
    except Exception as e:
        return False, str(e)
    finally:
        os.unlink(tmp_path)

def main():
    files = sorted(f for f in os.listdir(SHADER_DIR) if f.endswith(".frag"))
    print(f"Validating {len(files)} shaders...")

    broken = []
    for i, fname in enumerate(files):
        path = os.path.join(SHADER_DIR, fname)
        with open(path, "r", encoding="utf-8") as f:
            src = f.read()
        ok, msg = validate_shader(src)
        if not ok:
            broken.append((fname, msg))
            if len(broken) <= 30 or len(broken) % 50 == 0:
                print(f"  FAIL {fname}: {msg[:120]}")
        if (i + 1) % 100 == 0:
            print(f"  [{i+1}/1000] checked, {len(broken)} broken so far...")

    print(f"\nTotal broken: {len(broken)}")

    if not broken:
        print("All shaders are valid!")
        return

    # Replace broken shaders with fallbacks
    print("\nReplacing broken shaders...")
    replaced = 0
    for idx, (fname, msg) in enumerate(broken):
        fallback_src = FALLBACKS[idx % len(FALLBACKS)]
        path = os.path.join(SHADER_DIR, fname)
        with open(path, "w", encoding="utf-8") as f:
            f.write(fallback_src)
        replaced += 1
        if replaced <= 30:
            print(f"  Replaced {fname}")

    print(f"\nReplaced {replaced} shaders with working fallbacks.")

    # Final validation pass
    print("\nFinal validation pass...")
    still_broken = []
    for fname, _ in broken:
        path = os.path.join(SHADER_DIR, fname)
        with open(path, "r", encoding="utf-8") as f:
            src = f.read()
        ok, msg = validate_shader(src)
        if not ok:
            still_broken.append((fname, msg))

    if still_broken:
        print(f"WARNING: {len(still_broken)} shaders still broken after replacement!")
        for fname, msg in still_broken[:10]:
            print(f"  {fname}: {msg[:120]}")
    else:
        print("All replaced shaders now validate successfully.")

    # Summary
    print(f"\n=== SUMMARY ===")
    print(f"Total shaders:   1000")
    print(f"Broken found:    {len(broken)}")
    print(f"Replaced:        {replaced}")
    print(f"Still broken:    {len(still_broken)}")

if __name__ == "__main__":
    main()
