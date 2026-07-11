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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.11 * vnoise2(p * 5.37 + t * 1.07);
    v = sin(wr * 29.63 - t * 1.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.35; p = rot2(0.35) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 2.81 + (time * 0.51) * -1.00); }
	p = sin(p * 2.17 + (time * 0.51) * 2.01) * 1.40;
	p *= 1.0 + 0.22 * sin((time * 0.51) * 1.36);
	float d = field(p, (time * 0.51), 0.0);
	vec3 col = palette(d * 1.19 + (time * 0.51) * 0.09, vec3(0.43, 0.43, 0.42), vec3(0.21, 0.18, 0.21), vec3(0.77, 0.90, 0.62), vec3(0.82, 0.40, 0.63));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.954, 1.001) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
