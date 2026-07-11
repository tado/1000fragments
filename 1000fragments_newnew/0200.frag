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
    float wr = length(p) + 0.28 * vnoise2(p * 3.07 + t * 0.56);
    v = sin(wr * 16.93 - t * 3.23 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.42 + t * 1.26 + ph) * 0.7;
    float wb = sin(p.y * 8.77 - t * 1.54 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	p = rot2(p.y * 1.80 + (time * 0.54) * 1.09) * p;
	p = fract(p * 2.59) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.15; p = rot2(2.52) * p; }
	float d1 = field(p, (time * 0.54), 0.0);
	float d2 = field2(p, (time * 0.54), 0.13);
	float d = d1 + d2;
	vec3 col = palette(d * 0.90 + (time * 0.54) * 0.04, vec3(0.43, 0.33, 0.35), vec3(0.17, 0.16, 0.22), vec3(0.42, 0.52, 0.61), vec3(0.28, 0.54, 0.03));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 0.990, 0.990) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
