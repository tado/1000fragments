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
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.29 + sr * 13.04 - t * 0.98 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.07 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.69); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	p = rot2(length(p) * 3.03 + time * 1.15) * p;
	p = rot2(3.06) * p;
	{ float fr = length(p); p *= 1.0 + 0.77 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.32, lr * 1.44 + time * -0.44); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.71);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.01, vec3(0.56, 0.40, 0.59), vec3(0.48, 0.48, 0.39), vec3(1.04, 0.74, 0.91), vec3(0.54, 0.04, 0.04));
	col = mod(col * 2.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
