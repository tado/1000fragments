uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.96 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.48); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 2.63 + time * 0.13); }
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 3.69 - time * 0.23); }
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.21, vec3(0.42, 0.56, 0.52), vec3(0.33, 0.39, 0.44), vec3(1.01, 1.04, 0.86), vec3(0.31, 0.34, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
