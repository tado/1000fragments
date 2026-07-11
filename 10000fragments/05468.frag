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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.57 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.36); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.44 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.22); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	p = rot2(2.10) * p;
	{ float fr = length(p); p *= 1.0 + -0.66 * fr * fr; }
	p *= 3.43;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(2.33) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = d1 * d2;
	vec3 col = palette(d * 1.43 + time * 0.15, vec3(0.48, 0.52, 0.49), vec3(0.31, 0.32, 0.44), vec3(1.10, 0.98, 0.72), vec3(0.08, 0.57, 0.76));
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
