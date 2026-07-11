uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.62 + t * 1.45 + ph) + sin(p.y * 2.95 - t * 1.45 + ph)
        + sin((p.x + p.y) * 8.16 + t * 1.45 + ph) + sin(length(p) * 13.94 - t * 1.45 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.74 * p.y + time * 1.33); p.y += 0.36 / wf * cos(wf * 3.04 * p.x + time * 1.26); }
	p = (floor(p * 22.0) + 0.5) / 22.0;
	{ float fr = length(p); p *= 1.0 + 0.78 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.73, 0.77, 0.96) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
