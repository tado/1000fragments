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
    v = 0.5 * (sin(p.x * 16.95 + t * 3.61 + ph) + sin(p.y * 16.63 - t * 2.42 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.08 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.10); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	{ float fr = length(p); p *= 1.0 + -0.80 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.94 * p.y + time * 0.85); p.y += 0.41 / wf * cos(wf * 3.15 * p.x + time * 1.20); }
	p *= 1.59;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.37; p = rot2(0.38) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = d1 + d2;
	vec3 col = palette(d * 0.93 + time * 0.21, vec3(0.54, 0.58, 0.49), vec3(0.36, 0.46, 0.41), vec3(0.83, 0.80, 0.78), vec3(0.46, 0.10, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
