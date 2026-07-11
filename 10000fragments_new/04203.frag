uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.37 + ph), sin(lt * 3.0 + t * 0.42)) * 0.80;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.46) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.03 * p.y + time * 1.20); p.y += 0.24 / wf * cos(wf * 2.24 * p.x + time * 1.93); }
	p = abs(p) - 0.33;
	p = (floor(p * 25.6) + 0.5) / 25.6;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.47, lr * 1.89 + time * 0.99); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.29 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
