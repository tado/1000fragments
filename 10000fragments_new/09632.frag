uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.98 + ph), sin(lt * 2.0 + t * 0.40)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.82) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.70 + time * 1.32) * p;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 2.54 + time * 0.71); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.58 * p.y + time * 0.68); p.y += 0.45 / wf * cos(wf * 1.86 * p.x + time * 1.32); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.30 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
