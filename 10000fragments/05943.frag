uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.83 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.36); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.10 * p.y + time * 0.86); p.y += 0.21 / wf * cos(wf * 3.81 * p.x + time * 1.05); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.40, lr * 2.71 + time * 0.52); }
	p = rot2(length(p) * 1.51 + time * 0.81) * p;
	p = rot2(p.y * -2.78 + time * 0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.23, vec3(0.56, 0.57, 0.52), vec3(0.33, 0.31, 0.33), vec3(1.29, 0.85, 0.71), vec3(0.55, 0.52, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
