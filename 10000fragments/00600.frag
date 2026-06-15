uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.62 - t * 1.30 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.92 + sr * 10.60 - t * 2.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 1.64 + time * 0.64); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.97 * p.y + time * 1.20); p.y += 0.24 / wf * cos(wf * 2.90 * p.x + time * 0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = d1 * d2;
	vec3 col = palette(d * 1.74 + time * 0.18, vec3(0.55, 0.58, 0.54), vec3(0.45, 0.30, 0.33), vec3(1.17, 1.05, 0.77), vec3(0.20, 0.75, 0.55));
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
