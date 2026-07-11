uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.62 + vec2(t * 0.37, -t * 0.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.70 * p.y + time * 1.93); p.y += 0.47 / wf * cos(wf * 1.85 * p.x + time * 1.07); }
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 5.88 - time * 0.63); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 2.57 + time * -0.58); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.08, vec3(0.56, 0.54, 0.46), vec3(0.38, 0.44, 0.35), vec3(1.07, 0.95, 0.71), vec3(0.04, 0.39, 0.91));
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
