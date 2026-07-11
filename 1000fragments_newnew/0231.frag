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
    vec2 wq = vec2(vnoise2(p * 2.62 + ph), vnoise2(p * 2.62 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.62 + 3.68 * wq + vec2(1.7, 9.2) + t * 1.09),
                   vnoise2(p * 2.62 + 3.31 * wq + vec2(8.3, 2.8) - t * 0.34));
    v = vnoise2(p * 2.62 + 3.22 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	float d = 0.5 + 0.5 * field(p, (time * 0.79), 0.0);
	vec2 hq = rot2(0.87) * p * 19.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.22 + (time * 0.79) * 0.30, vec3(0.43, 0.41, 0.41), vec3(0.19, 0.18, 0.20), vec3(0.70, 0.40, 0.87), vec3(0.85, 0.66, 0.29)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.930, 0.963, 1.031) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
