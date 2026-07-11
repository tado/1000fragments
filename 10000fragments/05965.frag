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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.92 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.72); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.64 + sin(p.y * 5.63 + t * 1.27) * 1.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.45, lr * 2.64 + time * 0.44); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(2.60) * p; }
	p = rot2(length(p) * 1.34 + time * 1.04) * p;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.50 + time * 0.11, vec3(0.45, 0.56, 0.40), vec3(0.39, 0.30, 0.48), vec3(1.05, 1.01, 0.96), vec3(0.29, 0.77, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
