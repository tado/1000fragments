uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.31 + ph), sin(lt * 1.0 + t * 1.00)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.44) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.46) * p;
	{ float fr = length(p); p *= 1.0 + 0.41 * fr * fr; }
	p = (floor(p * 13.1) + 0.5) / 13.1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.98 * p.y + time * 2.15); p.y += 0.26 / wf * cos(wf * 3.84 * p.x + time * 2.10); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.56, 0.83, 0.75) * (0.06 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
