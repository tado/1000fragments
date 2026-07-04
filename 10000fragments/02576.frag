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
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.13 * vnoise2(p * 2.12 + t * 0.38);
    v = sin(wr * 24.84 - t * 0.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.08) * p * 14.42;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.63 + time * 0.29, vec3(0.47, 0.49, 0.41), vec3(0.44, 0.33, 0.38), vec3(1.15, 1.26, 0.71), vec3(0.71, 0.02, 0.29)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
