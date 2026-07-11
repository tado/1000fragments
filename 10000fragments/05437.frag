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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.78 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.66); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.12 + sin(p.y * 2.79 + t * 2.51) * 4.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.86;
	p = rot2(2.19) * p;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	p += vec2(0.42, 0.59) * sin(length(p) * 4.94 - time * 0.98) * 0.39;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.62 + time * 0.17, vec3(0.48, 0.58, 0.45), vec3(0.39, 0.50, 0.33), vec3(0.73, 1.07, 1.04), vec3(0.77, 0.18, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
