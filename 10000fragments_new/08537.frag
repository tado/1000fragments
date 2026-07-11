uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.40 + ph), sin(lt * 1.0 + t * 1.43)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	p = abs(p) - 0.25;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.46 * p.y + time * 0.62); p.y += 0.47 / wf * cos(wf * 2.93 * p.x + time * 1.88); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.48));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
