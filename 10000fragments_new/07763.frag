uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.69 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.78) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.49 * p.y + time * 0.97); p.y += 0.41 / wf * cos(wf * 3.40 * p.x + time * 1.94); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(1.27) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 4.96 - time * 0.75); }
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.37, 0.52, 0.64) * (0.05 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
