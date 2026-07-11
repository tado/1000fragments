uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.63 + ph), sin(lt * 3.0 + t * 0.82)) * 0.53;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.58) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p.x += sin(p.y * 5.93 + time * 1.32) * 0.31;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 1.61 + time * 0.50); }
	p = rot2(p.y * 2.04 + time * 0.21) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.90 * p.y + time * 0.74); p.y += 0.42 / wf * cos(wf * 3.44 * p.x + time * 1.44); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.47, 0.60, 0.98) + vec3(0.23, 0.05, 0.15);
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
