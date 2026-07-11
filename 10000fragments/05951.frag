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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.66 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.64); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.28 * cos(sa * 5 + t * 1.67 + ph);
    v = sin((sr - petal) * 12.92);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	p += vec2(0.77, -0.53) * sin(length(p) * 3.74 - time * 1.54) * 0.20;
	p = rot2(2.07) * p;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 5.64 - time * 0.66); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.72 + time * 0.09, vec3(0.50, 0.59, 0.43), vec3(0.40, 0.42, 0.48), vec3(0.82, 0.74, 1.35), vec3(0.36, 0.45, 0.82));
	col = mod(col * 1.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
