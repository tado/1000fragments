uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.02 + ph), sin(lt * 2.0 + t * 0.38)) * 0.85;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.01) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.60 * p.y + time * 2.08); p.y += 0.38 / wf * cos(wf * 2.03 * p.x + time * 1.11); }
	p = (floor(p * 22.5) + 0.5) / 22.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.50; p = rot2(1.53) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.03, lr * 2.36 + time * 0.73); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.40, 0.06), vec3(0.71, 0.97, 0.68), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
