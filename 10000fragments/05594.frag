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
    vec2 dp = fract(p * 4.49) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.32 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.27 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.83); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.77 * p.y + time * 1.43); p.y += 0.35 / wf * cos(wf * 2.90 * p.x + time * 1.46); }
	p = rot2(p.y * -2.22 + time * 0.52) * p;
	p = rot2(length(p) * -3.18 + time * 1.15) * p;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.93 + time * 0.19, vec3(0.55, 0.51, 0.49), vec3(0.48, 0.34, 0.41), vec3(1.23, 1.28, 0.99), vec3(0.41, 0.25, 0.84));
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
