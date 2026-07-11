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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.16 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.06); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.35, t * 1.11 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 5.30 - time * 0.51); }
	p = rot2(length(p) * 3.74 + time * 0.90) * p;
	p = rot2(time * 0.51) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.41, lr * 2.92 + time * 0.60); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.85);
	float d = d1 * d2;
	vec3 col = palette(d * 1.41 + time * 0.28, vec3(0.59, 0.41, 0.54), vec3(0.37, 0.48, 0.46), vec3(0.98, 0.74, 0.85), vec3(0.24, 0.32, 0.19));
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
