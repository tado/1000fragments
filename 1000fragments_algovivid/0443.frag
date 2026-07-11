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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.17 * vnoise2(p * 3.16 + t * 1.01);
    v = sin(wr * 20.58 - t * 2.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	float d = 0.5 + 0.5 * field(p, (time * 0.68), 0.0);
	vec2 hq = rot2(0.79) * p * 14.88;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.55 + (time * 0.68) * 0.20, vec3(0.32, 0.24, 0.30), vec3(0.20, 0.21, 0.20), vec3(0.64, 0.63, 0.66), vec3(0.34, 0.59, 0.79)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.946, 0.983, 1.050) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
