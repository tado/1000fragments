uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.30 * cos(sa * 9.0 + t * 2.91 + ph);
    v = sin((sr - petal) * 14.70);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.73 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.46); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	p = abs(p) - 0.23;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.14; p = rot2(1.82) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 1.22 + (time * 0.59) * 0.56); }
	float d1 = field(p, (time * 0.59), 0.0);
	float d2 = field2(p, (time * 0.59), 0.25);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.88 + (time * 0.59) * 0.19, vec3(0.74, 0.61, 0.65), vec3(0.26, 0.25, 0.22), vec3(0.96, 0.98, 0.96), vec3(0.91, 0.05, 0.11));
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.013, 0.997, 0.958);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
